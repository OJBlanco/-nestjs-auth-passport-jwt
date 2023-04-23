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
  getOrderByUser(id: number): Order {
    const user = this.userService.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    };
  }
}
