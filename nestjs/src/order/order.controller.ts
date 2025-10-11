import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ParsedToken } from 'decorators';

@Controller('/v1/order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    

    @Get()
    getUserOrders(@ParsedToken() user: { id: string }, @Query('page') page: string, @Query('limit') limit: string) {
        return this.orderService.getUserOrders(user.id, page, limit);
    }

    @Post()
    addNewOrder(@ParsedToken() user: { id: string }, @Query('productId') productId: string, @Query('quantity') quantity: string) {
        return this.orderService.addNewOrder(user.id, productId, quantity);
    }

    @Patch('complete-check-out/:id')
    markAsPaid(@Param('id') id: string) {
        return this.orderService.markAsPaid(id);
    }
    
    @Get(':id')
    getOrderById(
        @Param('id') order_id: string,
        @ParsedToken() user: { id: string }) {
        return this.orderService.getUserOrderById(user.id, order_id); // Assuming '1' is the default page and limit
    }
}

@Controller('/v1/admin/order')
export class AdminOrderController {

    constructor(private readonly orderService: OrderService ) {}

    @Get('/all')
    getAllOrders(@Query('page') page:string, @Query('limit') limit: string ){

      return  this.orderService.getAllOrders(page, limit)
    }
}
