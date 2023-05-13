import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { ValidateIfExist } from '../../common/services/validate-if-exist';

@Injectable()
export class ProductsService extends ValidateIfExist<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super('Product', productRepository);
  }

  findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: number) {
    const product = await this.existEntry(id);
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.existEntry(id);

    return this.productRepository.delete(id);
  }
}
