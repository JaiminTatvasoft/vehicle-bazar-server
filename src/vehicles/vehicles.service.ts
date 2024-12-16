import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schema/vehicle.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel('vehicles')
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async getAvailableVehicles(
    city: string,
    pickUpDate?: string,
    returnDate?: string,
    filters?: {
      segment?: string[];
      brandname?: string[];
      fuelType?: string[];
      transmission?: string[];
      seater?: string[];
    },
    sort?: string,
  ): Promise<Vehicle[]> {
    try {
      const query: any = {
        availableLocation: city,
        isVacant: true,
        $or: [
          { bookings: { $size: 0 } }, // No bookings
          {
            bookings: {
              $not: {
                $elemMatch: {
                  $or: [
                    {
                      startDate: { $lte: returnDate },
                      endDate: { $gte: pickUpDate },
                    },
                  ],
                },
              },
            },
          },
        ],
      };

      if (filters) {
        if (filters.segment?.length) {
          query.segment = { $in: filters.segment };
        }
        if (filters.brandname?.length)
          query.brandname = { $in: filters.brandname };
        if (filters.fuelType?.length)
          query.fuelType = { $in: filters.fuelType };
        if (filters.transmission?.length)
          query.transmission = { $in: filters.transmission };
        if (filters.seater?.length) {
          query.seater = { $in: filters.seater };
        }
      }

      // Set sort option
      // let sortOption = {};
      // if (sort === 'priceAsc') {
      //   sortOption = { rentalChargesPerDay: 1 }; // Ascending
      // } else if (sort === 'priceDesc') {
      //   sortOption = { rentalChargesPerDay: -1 }; // Descending
      // }

      const vehicles = await this.vehicleModel.find(query);

      return vehicles;
    } catch (error) {
      throw new HttpException(
        'Error fetching vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getManagedVehicles(
    city: string,
    pickUpDate?: string,
    returnDate?: string,
    filters?: {
      segment?: string[];
      brandname?: string[];
      fuelType?: string[];
      transmission?: string[];
      seater?: string[];
    },
  ) {
    try {
      const matchQuery: any = {
        availableLocation: city,
        $expr: {
          $not: {
            $anyElementTrue: {
              $map: {
                input: '$orders',
                as: 'order',
                in: {
                  $and: [
                    { $lte: ['$$order.startDate', returnDate] }, // Order starts before or on return date
                    { $gte: ['$$order.endDate', pickUpDate] }, // Order ends after or on pick-up date
                  ],
                },
              },
            },
          },
        },
      };

      // Dynamically add filters if they exist
      if (filters) {
        if (filters.segment?.length) {
          matchQuery.segment = { $in: filters.segment };
        }
        if (filters.brandname?.length) {
          matchQuery.brandname = { $in: filters.brandname };
        }
        if (filters.fuelType?.length) {
          matchQuery.fuelType = { $in: filters.fuelType };
        }
        if (filters.transmission?.length) {
          matchQuery.transmission = { $in: filters.transmission };
        }
        if (filters.seater?.length) {
          matchQuery.seater = { $in: filters.seater.map(Number) }; // Convert to number if stored as numeric
        }
      }

      // MongoDB Aggregation Pipeline
      const vehicles = await this.vehicleModel.aggregate([
        {
          $lookup: {
            from: 'orders', // Name of the orders collection
            localField: '_id',
            foreignField: 'p_id',
            as: 'orders',
          },
        },
        {
          $match: matchQuery, // Apply the match query with filters and date logic
        },
        {
          $project: {
            orders: 0, // Optionally exclude orders from the result
          },
        },
      ]);

      return vehicles;
    } catch (error) {
      throw new HttpException(
        'Error fetching vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle';
  }

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
