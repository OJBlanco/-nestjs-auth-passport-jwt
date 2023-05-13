import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(id: number) {
    const category = this.existCategory(id);
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.existCategory(id);

    this.categoryRepository.merge(category, changes);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    this.existCategory(id);

    return this.categoryRepository.delete(id);
  }

  protected async existCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }
}
