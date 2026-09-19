import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createEscrow(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createEscrow(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id/release')
  release(@Param('id') id: string) {
    return this.paymentsService.release(id);
  }

  @Patch(':id/refund')
  refund(@Param('id') id: string) {
    return this.paymentsService.refund(id);
  }
}
