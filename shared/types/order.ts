import { Status } from "../enums";
import { type OrderRecordAttribute } from "./order-record";
import { type ProductAttribute } from "./product";
import { type UserAttributes } from "./user";

export interface OrderAttribute {
    id?: string;
    user_id: string;
    portion: number,
    amount: string,
    product_id: string;
    order_record_id: string;
    status: Status;
    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}

export type OrderwithProduct = OrderAttribute & {
    product: ProductAttribute
}

export type OrderWithProductAndUser = OrderwithProduct & {
    user: UserAttributes
}

export type OrderWithUser = OrderAttribute & {
    user: UserAttributes;
};

export type OrderWithUserAndOrderRecordAndProduct = OrderWithUser & {
    order_record: OrderRecordAttribute,
    product: ProductAttribute
}