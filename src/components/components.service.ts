import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import mongoose, { Model } from 'mongoose';
import { ComponentDocument } from './schema/component.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectModel('components')
    private readonly componentModel: Model<ComponentDocument>,
  ) {}

  async create(createComponentDto: CreateComponentDto) {
    const { clientType, name, clientComponentName } = createComponentDto;
    const response = new this.componentModel({
      clientType,
      name,
      clientComponentName,
    });
    await response.save();
    return { success: true };
  }

  async findAll() {
    try {
      const components = await this.componentModel.find();
      return components;
    } catch (error) {
      throw new HttpException(
        'Error fetching vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async toggle(id: string) {
    const componentId = new mongoose.Types.ObjectId(id);

    const component = await this.componentModel.findById(componentId);
    if (!component) {
      throw new NotFoundException('No component is present with this id');
    }

    const res = await this.componentModel.findOneAndUpdate(
      { _id: componentId },
      { $set: { enable: !component.enable } }, // Toggle the value
      { new: true },
    );

    if (!res) {
      return { enable: false };
    }
    return { enable: res.enable };
  }

  async findOne(id: number) {
    return `This action returns a #${id} component`;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
