import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Creator } from './entities/creator.entity';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorsService {
  // Penyimpanan in-memory untuk contoh ini.
  // Di produksi, ganti dengan repository TypeORM/Prisma ke database sesungguhnya.
  private creators: Creator[] = [];

  /**
   * Menghitung rekomendasi rate card berdasarkan jumlah followers
   * dan engagement rate. Formula sederhana:
   * - Rp 35 per follower sebagai basis harga
   * - dikalikan (1 + engagement rate / 100) sebagai bobot kualitas audiens
   * - rentang harga diambil dari -20% s.d. +20% dari nilai basis
   */
  private computeRateCard(followers: number, engagementRate: number) {
    const base = followers * 35;
    const qualityMultiplier = 1 + engagementRate / 100;
    const center = base * qualityMultiplier;

    return {
      min: Math.round((center * 0.8) / 1000) * 1000,
      max: Math.round((center * 1.2) / 1000) * 1000,
    };
  }

  create(dto: CreateCreatorDto): Creator {
    const rate = this.computeRateCard(dto.followers, dto.engagementRate);

    const creator: Creator = {
      id: randomUUID(),
      name: dto.name,
      handle: dto.handle,
      category: dto.category,
      followers: dto.followers,
      engagementRate: dto.engagementRate,
      rating: 0,
      ratingCount: 0,
      suggestedRateMin: rate.min,
      suggestedRateMax: rate.max,
      createdAt: new Date(),
    };

    this.creators.push(creator);
    return creator;
  }

  findAll(category?: string): Creator[] {
    if (!category) return this.creators;
    return this.creators.filter((c) =>
      c.category.some((cat) => cat.toLowerCase() === category.toLowerCase()),
    );
  }

  findOne(id: string): Creator {
    const creator = this.creators.find((c) => c.id === id);
    if (!creator) {
      throw new NotFoundException(`Creator dengan id ${id} tidak ditemukan`);
    }
    return creator;
  }

  update(id: string, dto: UpdateCreatorDto): Creator {
    const creator = this.findOne(id);
    Object.assign(creator, dto);

    // rate card dihitung ulang jika followers/engagement berubah
    if (dto.followers !== undefined || dto.engagementRate !== undefined) {
      const rate = this.computeRateCard(creator.followers, creator.engagementRate);
      creator.suggestedRateMin = rate.min;
      creator.suggestedRateMax = rate.max;
    }

    return creator;
  }

  remove(id: string): void {
    const index = this.creators.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Creator dengan id ${id} tidak ditemukan`);
    }
    this.creators.splice(index, 1);
  }

  /**
   * Dipanggil oleh RatingsService untuk memperbarui rata-rata rating
   * setiap kali ada ulasan baru masuk untuk creator ini.
   */
  applyNewRating(id: string, score: number): Creator {
    const creator = this.findOne(id);
    const totalScore = creator.rating * creator.ratingCount + score;
    creator.ratingCount += 1;
    creator.rating = Number((totalScore / creator.ratingCount).toFixed(2));
    return creator;
  }
}
