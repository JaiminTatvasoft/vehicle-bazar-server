import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ComponentsModule } from './components/components.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';
import { ComparisiontableModule } from './comparisiontable/comparisiontable.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    VehiclesModule,
    ComponentsModule,
    UsersModule,
    AuthModule,
    StripeModule.forRootAsync(),
    ComparisiontableModule,
    MongooseModule.forRoot('mongodb://localhost:27017/vehiclebazar'),
    OrdersModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
