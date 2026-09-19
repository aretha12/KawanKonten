export type PaymentStatus = 'held' | 'released' | 'refunded';

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  platformFee: number;
  commissionFee: number;
  netAmountToCreator: number;
  status: PaymentStatus;
  createdAt: Date;
  releasedAt?: Date;
}
