import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(dto: CreateBrandDto): Brand {
    const brand: Brand = {
      id: randomUUID(),
      name: dto.name,
      industry: dto.industry,
      createdAt: new Date(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand dengan id ${id} tidak ditemukan`);
    }
    return brand;
  }
}
