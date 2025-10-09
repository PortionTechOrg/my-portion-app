import { Kyc_Status, Roles } from "@shared/enums";

export interface UserAttributes {
    id?: string;
    username?: string;
    firstname: string;
    lastname: string;
    email: string;
    date_of_birth?: string,
    phone_number: string,
    password: string;
    role: Roles;
    kyc_status: Kyc_Status;
    email_verified: Boolean;
    kyc_verified: Boolean;

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}