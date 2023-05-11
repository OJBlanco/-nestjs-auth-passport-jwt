import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { UsersService } from './users.service';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class OrderService {
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
  ) {}
  async getOrderByUser(id: number) {
    const user = this.userService.findOne(id);
    return {
      id,
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  }
}
