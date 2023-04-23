import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id/orders')
  getOrderByUser(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderByUser(id);
  }
}
