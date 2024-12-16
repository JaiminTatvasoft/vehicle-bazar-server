import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationDocument } from './schema/location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('locations')
    private readonly locationModel: Model<LocationDocument>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const { city } = createLocationDto;
    try {
      await this.locationModel.create({
        city,
      });
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'Error adding location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const locations = await this.locationModel.find();
      return locations;
    } catch (error) {
      throw new HttpException(
        'Error fetching locations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
