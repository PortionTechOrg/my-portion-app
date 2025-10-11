import { Injectable } from '@nestjs/common';
import { Status } from '@shared/enums';
import { Order } from 'src/database/models/Order';
import { OrderRecord } from 'src/database/models/order-record';
import { Product } from 'src/database/models/Product';
import { User } from 'src/database/models/User';

@Injectable()
export class OrderRecordService {

    async getProductOrderRecordById(user_id:string, product_order_id: string, page: string, limit: string) {
    
            const whereClause: Partial<Product> = { id: product_order_id }
    
            const start = ( Number(page) -1 ) * Number(limit);

            const order_record = await OrderRecord.findOne( {
                where: {
                    id: product_order_id,
                },
                include: [{ model: Order, include: [User] }, { model: Product }],
                order: [ ["createdAt", "DESC"]],
                offset: Number(start), limit: Number(limit)

            })
    
            const data = { 
                order_record
            }
    
            return { message: 'Order records retrieved', data };
            
    
        }
}
