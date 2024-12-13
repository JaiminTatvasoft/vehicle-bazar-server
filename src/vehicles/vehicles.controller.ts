import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/available')
  async getAvailableVehicles(
    @Query('city') city: string,
    @Query('pickUpDate') pickUpDate: string,
    @Query('returnDate') returnDate: string,
    @Query('segment') segment?: string,
    @Query('brandname') brandname?: string,
    @Query('fuelType') fuelType?: string,
    @Query('transmission') transmission?: string,
    @Query('seater') seater?: string,
    @Query('sort') sort?: string,
  ) {
    if (!city || !pickUpDate || !returnDate) {
      throw new HttpException(
        'city, pickUpDate, and returnDate are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const pickUp = new Date(pickUpDate);
    const returnD = new Date(returnDate);

    if (
      isNaN(pickUp.getTime()) ||
      isNaN(returnD.getTime()) ||
      pickUp >= returnD
    ) {
      throw new HttpException(
        'Invalid pickUpDate or returnDate',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filterCriteria = {
      segment: segment ? segment.split(',') : undefined,
      brandname: brandname ? brandname.split(',') : undefined,
      fuelType: fuelType ? fuelType.split(',') : undefined,
      transmission: transmission ? transmission.split(',') : undefined,
      seater: seater ? seater.split(',') : undefined,
    };

    try {
      const vehicles = await this.vehiclesService.getAvailableVehicles(
        city,
        pickUpDate,
        returnDate,
        filterCriteria,
        sort,
      );
      if (!vehicles.length) {
        throw new HttpException(
          'No vehicles available for the specified dates and location',
          HttpStatus.NOT_FOUND,
        );
      }
      return { success: true, vehicles };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/available-vehicle')
  async getManagedVehicles(
    @Query('city') city: string,
    @Query('pickUpDate') pickUpDate: string,
    @Query('returnDate') returnDate: string,
    @Query('segment') segment?: string,
    @Query('brandname') brandname?: string,
    @Query('fuelType') fuelType?: string,
    @Query('transmission') transmission?: string,
    @Query('seater') seater?: string,
  ) {
    if (!city || !pickUpDate || !returnDate) {
      throw new HttpException(
        'city, pickUpDate, and returnDate are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const pickUp = new Date(pickUpDate);
    const returnD = new Date(returnDate);

    if (
      isNaN(pickUp.getTime()) ||
      isNaN(returnD.getTime()) ||
      pickUp >= returnD
    ) {
      throw new HttpException(
        'Invalid pickUpDate or returnDate',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filterCriteria = {
      segment: segment ? segment.split(',') : undefined,
      brandname: brandname ? brandname.split(',') : undefined,
      fuelType: fuelType ? fuelType.split(',') : undefined,
      transmission: transmission ? transmission.split(',') : undefined,
      seater: seater ? seater.split(',') : undefined,
    };

    try {
      const vehicles = await this.vehiclesService.getManagedVehicles(
        city,
        pickUpDate,
        returnDate,
        filterCriteria,
      );
      if (!vehicles.length) {
        throw new HttpException(
          'No vehicles available for the specified dates and location',
          HttpStatus.NOT_FOUND,
        );
      }
      return { success: true, vehicles };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
