import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentSchema } from './schema/component.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'components', schema: ComponentSchema },
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
