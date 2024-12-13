import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ComparisiontableService } from './comparisiontable.service';
import { CreateComparisiontableDto } from './dto/create-comparisiontable.dto';
import { UpdateComparisiontableDto } from './dto/update-comparisiontable.dto';

@Controller('comparisiontable')
export class ComparisiontableController {
  constructor(
    private readonly comparisiontableService: ComparisiontableService,
  ) {}

  @Post()
  async create(@Body() createComparisiontableDto: CreateComparisiontableDto) {
    try {
      return this.comparisiontableService.create(createComparisiontableDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const comparisions = await this.comparisiontableService.findAll();
      if (!comparisions.length) {
        throw new HttpException(
          'No comparisions available for the time',
          HttpStatus.NOT_FOUND,
        );
      }
      return { success: true, comparisions };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comparisiontableService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComparisiontableDto: UpdateComparisiontableDto,
  ) {
    return this.comparisiontableService.update(+id, updateComparisiontableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comparisiontableService.remove(+id);
  }
}
