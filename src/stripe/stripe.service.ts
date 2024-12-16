import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);
  constructor(
    private readonly ordersService: OrdersService,
    @InjectConnection() private readonly connection: mongoose.Connection,

    @Inject(
      'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
    )
    private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(
      'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
      {
        apiVersion: '2024-11-20.acacia',
      },
    );
    this.logger.log(
      'StripeService initialized with API version 2024-09-30.acacia',
    );
  }

  async createCheckoutSession(createStripeDto: CreateStripeDto) {
    const YOUR_DOMAIN = 'http://localhost:3000';

    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      customer_email: createStripeDto.shippingDetail.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: createStripeDto.orderItems.prodName,
              metadata: {
                userId: createStripeDto.orderItems.u_id,
                productId: createStripeDto.orderItems.p_id,
                noOfDays: createStripeDto.orderItems.noOfDays,
                startDate: createStripeDto.orderItems.startDate,
                endDate: createStripeDto.orderItems.endDate,
                pickUpLocation: createStripeDto.orderItems.pickUpLocation,
                dropLocation: createStripeDto.orderItems.dropLocation,
              },
            },
            unit_amount: createStripeDto.orderItems.totalPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  }
  async afterCheckoutSession(session_id: string) {
    const mongoSession = await this.connection.startSession(); // Start a new session for MongoDB transaction
    mongoSession.startTransaction();

    try {
      const session = await this.stripe.checkout.sessions.retrieve(session_id);

      if (session.status === 'complete') {
        const { totalAmount, product } =
          await this.findAllSessionLineItems(session_id);

        if (totalAmount && product) {
          const createOrder = {
            u_id: product.metadata.userId,
            p_id: product.metadata.productId,
            prodName: product.name,
            noOfDays: product.metadata.noOfDays,
            startDate: product.metadata.startDate,
            endDate: product.metadata.endDate,
            pickUpLocation: product.metadata.pickUpLocation,
            dropLocation: product.metadata.dropLocation,
            totalAmount,
          };

          await this.ordersService.create(createOrder);
        }
      }

      await mongoSession.commitTransaction();
      return {
        status: session.status,
        customer_email: session.customer_details.email,
      };
    } catch (error) {
      await mongoSession.abortTransaction();
      throw error;
    } finally {
      // End the session to free up resources
      mongoSession.endSession();
    }
  }

  async findAllSessionLineItems(session_id: string) {
    const lineItems =
      await this.stripe.checkout.sessions.listLineItems(session_id);
    let main = lineItems.data[0].price.product;
    const product = await this.stripe.products.retrieve(String(main));

    return { totalAmount: lineItems.data[0].amount_total, product };
  }

  async findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
