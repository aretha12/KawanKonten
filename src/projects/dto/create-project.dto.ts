import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  brandId: string;

  @IsString()
  @MinLength(3)
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  category: string[];

  @IsNumber()
  @Min(0)
  budgetMin: number;

  @IsNumber()
  @Min(0)
  budgetMax: number;

  @IsString()
  @MinLength(10)
  brief: string;
}
