import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrderRecordService } from './order_record.service';
import { ParsedToken } from 'decorators';

@Controller('v1/order-record')
export class OrderRecordController {

    constructor(private readonly orderRecordService: OrderRecordService) {}
    
    @Get(':id')
    getOrderRecordById(
        @ParsedToken() user: { id: string }, 
        @Query('limit') limit: string,  
        @Query('page') page: string,
        @Param("id") order_record_id:string,
    ) {
        return this.orderRecordService.getProductOrderRecordById(user.id, order_record_id, page, limit);
    }
    

}
