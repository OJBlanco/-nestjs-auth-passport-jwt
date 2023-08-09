import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { ValidateIfExist } from '../../common/services/validate-if-exist';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService extends ValidateIfExist<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandsService,
  ) {
    super('Product', productRepository);
  }

  findAll() {
    return this.productRepository.find({
      relations: ['brand'],
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        image: true,
        createAt: true,
        brand: {
          id: true,
          name: true,
          image: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const product = await this.existEntry(id);
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }

    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.existEntry(id);

    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }

    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.existEntry(id);

    return this.productRepository.delete(id);
  }
}
