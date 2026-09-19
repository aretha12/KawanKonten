import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() dto: CreateRatingDto) {
    return this.ratingsService.create(dto);
  }

  @Get('creator/:creatorId')
  findByCreator(@Param('creatorId') creatorId: string) {
    return this.ratingsService.findByCreator(creatorId);
  }
}
