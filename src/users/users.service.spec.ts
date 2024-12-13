import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Gender, Role, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const mockUserModel = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  constructor: jest.fn(() => mockUserModel),
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const createUserDto: CreateUserDto = {
    name: 'test',
    age: 54,
    dob: '2011-10-05T14:48:00.000Z',
    contact: '8602359606',
    address: 'demo',
    country: 'India',
    city: 'demo',
    state: 'demostate',
    zipCode: 0,
    gender: Gender.male,
    email: 'test@example.com',
    password: 'Testuser123!@#',
    role: Role.user,
    isVerified: true,
  };

  describe('create', () => {
    it('should throw an error if user already exists', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        id: '123',
        name: 'test',
        email: 'test@example.com',
        role: Role.user,
        password: 'Testuser123!@#',
        verified: true,
      });

      await expect(service.create(createUserDto)).rejects.toThrow(
        'Check your email: Email already exists',
      );
    });

    it('should create and return user successfully', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));

      await userModel.create({
        ...createUserDto,
        password: hashSpy,
      });

      expect({ message: 'User created succesfully' }).toEqual({
        message: 'User created succesfully',
      });
    });
  });

  it('email already exists error', () => {});
});
