import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComparisiontableDto } from './dto/create-comparisiontable.dto';
import { UpdateComparisiontableDto } from './dto/update-comparisiontable.dto';
import { Model } from 'mongoose';
import { ComparisionDocument } from './schema/comparisiontable.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ComparisiontableService {
  constructor(
    @InjectModel('comparisions')
    private readonly comparisionModel: Model<ComparisionDocument>,
  ) {}

  async create(createComparisiontableDto: CreateComparisiontableDto) {
    const { title, rentalCarSubscription, buyingUsedCar, buyingNewCar } =
      createComparisiontableDto;
    try {
      const response = new this.comparisionModel({
        title,
        rentalCarSubscription,
        buyingUsedCar,
        buyingNewCar,
      });
      await response.save();
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'Error creating comparision',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const components = await this.comparisionModel.find();
      return components;
    } catch (error) {
      throw new HttpException(
        'Error fetching comparision',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comparisiontable`;
  }

  update(id: number, updateComparisiontableDto: UpdateComparisiontableDto) {
    return `This action updates a #${id} comparisiontable`;
  }

  remove(id: number) {
    return `This action removes a #${id} comparisiontable`;
  }
}
