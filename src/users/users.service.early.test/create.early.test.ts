// Unit tests for: create

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { Gender, Role } from '../schema/user.schema';

// Mock interfaces and types
interface MockModel {
  findOne: jest.Mock;
  save: jest.Mock;
}

type MockUserDocument = {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  isVerified: boolean;
};

// Mock implementation of the Model
class MockUserModel implements MockModel {
  findOne = jest.fn();
  save = jest.fn();
}

describe('UsersService.create() create method', () => {
  let usersService: UsersService;
  let mockUserModel: MockUserModel;

  beforeEach(() => {
    mockUserModel = new MockUserModel();
    usersService = new UsersService(mockUserModel as any);
  });

  describe('Happy paths', () => {
    it('should create a user successfully when email does not exist', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        age: 30,
        dob: '1993-01-01',
        contact: '1234567890',
        address: '123 Main St',
        country: 'USA',
        city: 'New York',
        state: 'NY',
        zipCode: 10001,
        gender: Gender.male,
        email: 'john.doe@example.com',
        password: 'StrongP@ssw0rd!',
        role: Role.user,
        isVerified: false,
      };

      mockUserModel.findOne.mockResolvedValue(null as any as never);
      mockUserModel.save.mockResolvedValue({} as any as never);
      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword' as any as never);

      // Act
      const result = await usersService.create(createUserDto);

      // Assert
      expect(result).toEqual({ message: 'User created succesfully' });
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUserModel.save).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should throw an error when email already exists', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        age: 25,
        dob: '1998-01-01',
        contact: '0987654321',
        address: '456 Elm St',
        country: 'USA',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: 90001,
        gender: Gender.male,
        email: 'jane.doe@example.com',
        password: 'AnotherStr0ngP@ss!',
        role: Role.user,
        isVerified: true,
      };

      const existingUser: MockUserDocument = {
        _id: '123',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'admin',
        password: 'hashedPassword',
        isVerified: true,
      };

      mockUserModel.findOne.mockResolvedValue(existingUser as any as never);

      // Act & Assert
      await expect(usersService.create(createUserDto)).rejects.toThrow(
        'Check your email: Email already exists',
      );
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
    });

    it('should handle bcrypt hash failure gracefully', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'Alice Smith',
        age: 28,
        dob: '1995-01-01',
        contact: '1122334455',
        address: '789 Pine St',
        country: 'USA',
        city: 'Chicago',
        state: 'IL',
        zipCode: 60601,
        gender: Gender.male,
        email: 'alice.smith@example.com',
        password: 'YetAn0therStr0ngP@ss!',
        role: Role.user,
        isVerified: false,
      };

      mockUserModel.findOne.mockResolvedValue(null as any as never);
      jest
        .spyOn(bcrypt, 'hash')
        .mockRejectedValue(new Error('Hashing failed') as never);

      // Act & Assert
      await expect(usersService.create(createUserDto)).rejects.toThrow(
        'Hashing failed',
      );
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
    });
  });
});

// End of unit tests for: create
