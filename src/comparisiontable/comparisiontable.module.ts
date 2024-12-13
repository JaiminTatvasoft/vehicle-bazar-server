import { Module } from '@nestjs/common';
import { ComparisiontableService } from './comparisiontable.service';
import { ComparisiontableController } from './comparisiontable.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComparisionSchema } from './schema/comparisiontable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'comparisions', schema: ComparisionSchema },
    ]),
  ],
  controllers: [ComparisiontableController],
  providers: [ComparisiontableService],
})
export class ComparisiontableModule {}
