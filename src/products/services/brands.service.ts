import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find({});
  }

  async findOne(id: number) {
    const brand = await this.existBrand(id);
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.existBrand(id);

    this.brandRepository.merge(brand, changes);

    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    await this.existBrand(id);

    return this.brandRepository.delete(id);
  }

  protected async existBrand(id): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return brand;
  }
}
