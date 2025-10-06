import { Injectable } from '@nestjs/common';
import { Status } from '@shared/enums';
import { Order } from 'src/database/models/Order';
import { OrderRecord } from 'src/database/models/order-record';
import { Product } from 'src/database/models/Product';
import { User } from 'src/database/models/User';

@Injectable()
export class OrderService {
    async getAllOrders( page: string, limit: string ) {

        const orderCount = await Order.count()
        const start = ( Number(page) -1 ) * Number(limit);

        const orders = await Order.findAll( {
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit),
            include: [Product, User]
        })

        const totalPages = Math.ceil(orderCount/Number(limit));

        return {
            success: true,
            data: { totalPages, orderCount, orders },
            message: "Orders found!"
        }

    }

    async getAllUserOrders( user_id: string, page: string, limit: string ) {

        const orderCount = await Order.count()
        const start = ( Number(page) -1 ) * Number(limit);

        const orders = await Order.findAll( {

            where: {
                user_id
            },
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        })

        const totalPages = Math.ceil(orderCount/Number(limit));

        return {
            success: true,
            data: { totalPages, orderCount, orders },
            message: "User orders found!"
        }
    }

    async addNewOrder( user_id: string, productId: string, quantity: string ) {
        
        return {
            success: true,
            message: "New order added successfully",
            data: { user_id, productId, quantity }
        };
    }

    async markAsPaid(orderRecordId: string) {

        const updatedOrderRecord = await OrderRecord.update(
            { status: 'pending' },
            { where: { id: orderRecordId } }
        );

        const orderRecord = await OrderRecord.findAll({
            where: {
                id: orderRecordId,
            }
        });


        for( const orderRecordProductId of orderRecord || [] ){
            
            await Order.update({ 
                status: "pending"
            }, {
                where: {
                    id: orderRecordProductId.id
                }
            })

        }

        return {
            success: true,
            data: {
                orderRecordId,
                updatedOrderRecord
            },
            message: "Order updated"
        }

    }

    async getOrderRecord(seller_id: string, page: string, limit: string) {

        const start = ( Number(page) -1 ) * Number(limit);
        
        const products = await Product.findAll({
            where: {
                seller_id
            },
            include: [{ model: Order, include: [User] }],
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        });

        return { message: 'Order records retrieved', data: products };
        

    }

    async getProductOrderRecord(seller_id: string, page: string, limit: string, status: string) {

        const whereClause: Partial<Product> = { seller_id }

        if (status && status != "all") {
            whereClause.status = status as Status
        }

        const start = ( Number(page) -1 ) * Number(limit);
        
        const product_orders = await Product.findAll({
            where: whereClause,
            include: [{ model: Order, include: [User] }],
            order: [ ["createdAt", "DESC"]],
            offset: Number(start), limit: Number(limit)
        });

        const all_products_count = await Product.count(
            {
                where: { seller_id }
            }
        )
        const pending_products_count = await Product.count( {where: { 
            status: "pending",
            seller_id
        }})
        const delivered_products_count = await Product.count( {
            where: { 
                status: "delivered",
                seller_id
            }
        })

        const data = { 
            product_orders,
            all_products_count,
            pending_products_count,
            delivered_products_count
        }

        return { message: 'Order records retrieved', data };
        

    }


}
