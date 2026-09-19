import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProjectsService } from '../projects/projects.service';

// Struktur biaya KawanKonten, sesuai model bisnis: platform fee + commission fee
const PLATFORM_FEE_FLAT = 5000; // Rp, dikenakan tetap per transaksi
const COMMISSION_FEE_RATE = 0.1; // 10% dari nilai project

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [];

  constructor(private readonly projectsService: ProjectsService) {}

  /** Brand membuat pembayaran; dana "ditahan" (escrow) sampai project selesai */
  createEscrow(dto: CreatePaymentDto): Payment {
    // pastikan project ada
    this.projectsService.findOne(dto.projectId);

    const commissionFee = Math.round(dto.amount * COMMISSION_FEE_RATE);
    const platformFee = PLATFORM_FEE_FLAT;
    const netAmountToCreator = dto.amount - commissionFee - platformFee;

    const payment: Payment = {
      id: randomUUID(),
      projectId: dto.projectId,
      amount: dto.amount,
      platformFee,
      commissionFee,
      netAmountToCreator,
      status: 'held',
      createdAt: new Date(),
    };

    this.payments.push(payment);
    this.projectsService.updateStatus(dto.projectId, 'in_progress');
    return payment;
  }

  findOne(id: string): Payment {
    const payment = this.payments.find((p) => p.id === id);
    if (!payment) {
      throw new NotFoundException(`Payment dengan id ${id} tidak ditemukan`);
    }
    return payment;
  }

  /** Brand menyetujui hasil konten -> dana dicairkan ke creator */
  release(id: string): Payment {
    const payment = this.findOne(id);
    if (payment.status !== 'held') {
      throw new BadRequestException(
        `Payment berstatus '${payment.status}', tidak bisa dicairkan lagi`,
      );
    }
    payment.status = 'released';
    payment.releasedAt = new Date();
    this.projectsService.updateStatus(payment.projectId, 'completed');
    return payment;
  }

  /** Jika project batal / bermasalah -> dana dikembalikan ke brand */
  refund(id: string): Payment {
    const payment = this.findOne(id);
    if (payment.status !== 'held') {
      throw new BadRequestException(
        `Payment berstatus '${payment.status}', tidak bisa direfund`,
      );
    }
    payment.status = 'refunded';
    return payment;
  }
}
