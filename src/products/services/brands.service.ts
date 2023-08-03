import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { ValidateIfExist } from '../../common/services/validate-if-exist';

@Injectable()
export class BrandsService extends ValidateIfExist<Brand> {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {
    super('Brand', brandRepository);
  }

  findAll() {
    return this.brandRepository.find({});
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['products'],
      select: {
        id: true,
        name: true,
        image: true,
        createAt: true,
        products: {
          id: true,
          name: true,
          image: true,
        },
      },
    });
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.existEntry(id);

    this.brandRepository.merge(brand, changes);

    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    await this.existEntry(id);

    return this.brandRepository.delete(id);
  }
}
