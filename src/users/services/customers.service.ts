import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { ValidateIfExist } from '../../common/services/validate-if-exist';
import { UsersService } from './users.service';

@Injectable()
export class CustomersService extends ValidateIfExist<Customer> {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private userService: UsersService,
  ) {
    super('Customer', customerRepository);
  }
  findAll() {
    return this.customerRepository.find({});
  }

  async findOne(id: number) {
    const customer = await this.existEntry(id);

    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(data);
    if (data.userId) {
      const user = await this.userService.findOne(data.userId);
      newCustomer.user = user;
    }

    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.existEntry(id);
    this.customerRepository.merge(customer, changes);

    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    await this.existEntry(id);
    return this.customerRepository.delete(id);
  }
}
