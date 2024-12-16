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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGaurd } from 'src/auth/auth.gaurd';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(AuthGaurd)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    try {
      return this.reviewsService.create(createReviewDto, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGaurd)
  @Get('/ordered-product-review/:id')
  async orderProductReview(@Param() id: string, @Req() req) {
    try {
      const reviews = await this.reviewsService.orderProductReview(
        id,
        req.user.id,
      );
      if (!reviews.length) {
        return [];
      }
      return { reviews, success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/review-by-productid/:id')
  async reviewByProductId(@Param() id: string) {
    try {
      const reviews = await this.reviewsService.reviewByProductId(id);
      if (!reviews.length) {
        return [];
      }
      return reviews;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const reviews = await this.reviewsService.findAll();
      return { success: true, reviews };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
