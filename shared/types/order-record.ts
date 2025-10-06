import { Status } from "../enums";

export interface OrderRecordAttribute {
    id?: string;
    user_id: string;
    total_amount: number,
    status: Status;
    reference: string | null,
    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}