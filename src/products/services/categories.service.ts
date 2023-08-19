import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { ValidateIfExist } from '../../common/services/validate-if-exist';

@Injectable()
export class CategoriesService extends ValidateIfExist<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super('Category', categoryRepository);
  }

  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(id: number) {
    const category = this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: ['products'],
      select: {
        id: true,
        name: true,
        products: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.existEntry(id);

    this.categoryRepository.merge(category, changes);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    this.existEntry(id);

    return this.categoryRepository.delete(id);
  }
}
