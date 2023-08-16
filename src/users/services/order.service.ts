import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepository.find({
      select: {
        id: true,
        createAt: true,
        items: {
          id: true,
          product: {
            id: true,
            name: true,
            price: true,
          },
        },
        customer: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      select: {
        id: true,
        createAt: true,
        items: {
          id: true,
          product: {
            id: true,
            name: true,
            price: true,
          },
        },
        customer: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Not found');
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();

    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Not found');
    }

    if (changes.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      select: { id: true },
    });

    if (!order) {
      throw new NotFoundException('Not found');
    }

    return this.orderRepository.delete(id);
  }
}
