import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './schema/location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'locations', schema: LocationSchema }]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
