import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { RatingFromRole } from '../entities/rating.entity';

export class CreateRatingDto {
  @IsString()
  projectId: string;

  @IsIn(['brand', 'creator'])
  fromRole: RatingFromRole;

  @IsString()
  toCreatorId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
