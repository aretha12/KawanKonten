import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  projectId: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
