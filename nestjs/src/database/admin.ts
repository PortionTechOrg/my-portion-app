import { UserAttributes } from '@shared/types/user';
import * as bcrypt from 'bcryptjs';

export const adminSeed: () => Promise<UserAttributes[]> = ( async () => {
    return [
  {
    id: "19b47b8a-fc9a-4374-bc8e-0db7b6e87302",
    firstname: 'Super',
    lastname: 'Admin',
    username: 'admin',
    email: 'admin@portion.ng',
    password: await bcrypt.hash('@@mailpass##', 10),
    role: 'admin',
    kyc_status: "verified",
    phone_number: "08038752403",
    email_verified: true,
    kyc_verified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]});
