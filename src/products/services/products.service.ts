import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { ValidateIfExist } from '../../common/services/validate-if-exist';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService extends ValidateIfExist<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {
    super('Product', productRepository);
  }

  findAll(params?: FilterProductDto) {
    const pagination: FindManyOptions<Product> = {};
    const where: FindOptionsWhere<Product> = {};

    if (params) {
      const { limit, offset, minPrice, maxPrice } = params;
      pagination.take = limit;
      pagination.skip = offset;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
    }
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
      ...pagination,
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['brand', 'categories'],
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
        categories: {
          id: true,
          name: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandRepository.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(data.categoriesIds),
      });

      newProduct.categories = categories;
    }

    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.existEntry(id);

    if (changes.brandId) {
      const brand = await this.brandRepository.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(changes.categoriesIds),
      });

      product.categories = categories;
    }

    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: ['categories'],
      select: {
        id: true,
        categories: {
          id: true,
        },
      },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepository.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: ['categories'],
      select: {
        id: true,
        categories: {
          id: true,
        },
      },
    });
    product.categories = product.categories.filter((item) => {
      return item.id !== categoryId;
    });

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.existEntry(id);

    return this.productRepository.delete(id);
  }
}
