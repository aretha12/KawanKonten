import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { CreatorsService } from '../creators/creators.service';

@Injectable()
export class RatingsService {
  private ratings: Rating[] = [];

  constructor(private readonly creatorsService: CreatorsService) {}

  create(dto: CreateRatingDto): Rating {
    const rating: Rating = {
      id: randomUUID(),
      projectId: dto.projectId,
      fromRole: dto.fromRole,
      toCreatorId: dto.toCreatorId,
      score: dto.score,
      comment: dto.comment,
      createdAt: new Date(),
    };

    this.ratings.push(rating);

    // Rekam jejak dua arah: rating brand terhadap creator langsung
    // memperbarui rata-rata rating di profil/media kit creator tersebut.
    if (dto.fromRole === 'brand') {
      this.creatorsService.applyNewRating(dto.toCreatorId, dto.score);
    }

    return rating;
  }

  findByCreator(creatorId: string): Rating[] {
    return this.ratings.filter((r) => r.toCreatorId === creatorId);
  }
}
