import {
  IsArray,
  IsNumber,
  IsString,
  Max,
  Min,
  ArrayNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateCreatorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  handle: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  category: string[];

  @IsNumber()
  @Min(0)
  followers: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  engagementRate: number;
}
