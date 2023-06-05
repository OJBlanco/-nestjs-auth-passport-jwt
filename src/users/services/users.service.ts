import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ValidateIfExist } from '../../common/services/validate-if-exist';

@Injectable()
export class UsersService extends ValidateIfExist<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super('User', userRepository);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['customer'],
      select: {
        id: true,
        email: true,
        role: true,
        customer: {
          name: true,
          lastName: true,
          phone: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.existEntry(id);

    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);

    return this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.existEntry(id);

    this.userRepository.merge(user, changes);

    this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.existEntry(id);

    this.userRepository.delete(id);
  }
}
