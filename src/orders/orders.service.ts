import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders')
    private orderModel: Model<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const {
      u_id,
      p_id,
      prodName,
      noOfDays,
      startDate,
      endDate,
      pickUpLocation,
      dropLocation,
      totalAmount,
    } = createOrderDto;

    try {
      await this.orderModel.create({
        u_id,
        p_id,
        prodName,
        noOfDays,
        startDate,
        endDate,
        pickUpLocation,
        dropLocation,
        totalAmount,
      });
      return { message: 'order created successfully' };
    } catch (error) {
      throw new HttpException(
        'Error creating order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkOrderExistence(
    u_id: string,
    p_id: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const orderExists = await this.orderModel.findOne({
        u_id,
        p_id,
        startDate,
        endDate,
      });

      if (orderExists) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException(
        'Error checking order existence',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id: string) {
    try {
      const aggregateOrders = await this.orderModel.aggregate([
        {
          $match: {
            u_id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'u_id',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $unwind: '$users',
        },
        {
          $project: {
            'users.password': 0, // Exclude sensitive fields like 'password'
            'users.createdAt': 0,
            'users.updatedAt': 0,
            'users.__v': 0,
            'users.isVerified': 0,
            'users.role': 0,
            'users.contact': 0,
          },
        },
        {
          $lookup: {
            from: 'vehicles',
            localField: 'p_id',
            foreignField: '_id',
            as: 'vehicles',
          },
        },
        {
          $unwind: '$vehicles',
        },
        {
          $project: {
            'vehicles.__v': 0, // Exclude any unnecessary fields
            'vehicles.updatedAt': 0,
          },
        },
      ]);

      if (aggregateOrders.length == 0) {
        return [];
      }
      return aggregateOrders;
    } catch (error) {
      throw new HttpException(
        'Error checking order existence',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
