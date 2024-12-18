import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Review } from './schema/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('reviews')
    private reviewModel: Model<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto, userId: string) {
    const { p_id, username, useremail, review, rating } = createReviewDto;
    try {
      await this.reviewModel.create({
        u_id: userId,
        p_id,
        username,
        useremail,
        review,
        rating,
      });
      return { message: 'review created successfully' };
    } catch (error) {
      throw new HttpException(
        'Error creating review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async orderProductReview(p_id: string, u_id: string) {
    try {
      const reviews = await this.reviewModel.find({
        u_id: new mongoose.Types.ObjectId(u_id),
        p_id: new mongoose.Types.ObjectId(p_id),
      });
      return reviews;
    } catch (error) {
      throw new HttpException(
        'Error checking review existence',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reviewByProductId(id: string) {
    try {
      const reviews = await this.reviewModel.find({
        p_id: new mongoose.Types.ObjectId(id),
      });
      return reviews;
    } catch (error) {
      throw new HttpException(
        'Error checking review existence',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const reviews = await this.reviewModel.find();
      return reviews;
    } catch (error) {
      throw new HttpException(
        'Error checking review existence',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
