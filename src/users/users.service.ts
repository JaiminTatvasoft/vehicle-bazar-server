import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserDocument>,
  ) {}
  saltOrRounds = 10;

  async findOne(email: string) {
    const rep = await this.userModel.findOne({ email }).exec();

    if (!rep) {
      return null;
    }
    return {
      id: rep._id,
      name: rep.name,
      email: rep.email,
      role: rep.role,
      password: rep.password,
      verified: rep.isVerified,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isUserExist = await this.findOne(email);

    if (isUserExist) {
      throw new Error('Check your email: Email already exists');
    }

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );

    await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    return {
      message: `User created succesfully`,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
