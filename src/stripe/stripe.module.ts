import { Module, DynamicModule } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot()],
      providers: [
        StripeService,
        {
          provide:
            'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
          useFactory: async (configService: ConfigService) =>
            configService.get(
              'sk_test_51QCaJxGHm1Xk7UGKeBWrGqqcLuT89DKNFFR8oSQGPGP4O9GAUUdIGLcQkacyc0FOyurIEGzXKfDttgYLN2XGodaq003783cq8O',
            ),
          inject: [ConfigService],
        },
      ],
    };
  }
}
