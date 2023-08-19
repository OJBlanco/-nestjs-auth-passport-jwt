import { NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

export abstract class ValidateIfExist<T> {
  protected name: string;
  private repository: Repository<T>;

  constructor(name: string, repository: Repository<T>) {
    this.name = name;
    this.repository = repository;
  }

  protected async existEntry(id: number): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: ({
        id: id,
      } as unknown) as FindOptionsWhere<T>,
    };
    const entry = await this.repository.findOne(findOptions);

    if (!entry) {
      throw new NotFoundException(`${this.name} #${id} not found`);
    }

    return entry;
  }
}
