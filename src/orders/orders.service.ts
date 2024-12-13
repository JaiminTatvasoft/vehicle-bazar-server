import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders')
    private orderModel: Model<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { u_id, p_id, prodName, noOfDays, startDate, endDate, totalAmount } =
      createOrderDto;

    try {
      await this.orderModel.create({
        u_id,
        p_id,
        prodName,
        noOfDays,
        startDate,
        endDate,
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

  findAll() {
    return `This action returns all orders`;
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
