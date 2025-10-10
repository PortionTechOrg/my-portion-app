import { UserAttributes } from '@shared/types/user';
import * as bcrypt from 'bcryptjs';

export const mockUserSeed: () => Promise<UserAttributes[]> = ( async () => {
    return [
  {
    id: "19b47b8a-fc9a-4374-bc8e-0db7b6e87302",
    firstname: 'Emeka',
    lastname: 'Johnson',
    username: 'emekajohnson',
    email: 'user1@test.com',
    password: await bcrypt.hash('password123', 10),
    role: 'user',
    kyc_status: "not_submitted",
    phone_number: "1234568901",
    email_verified: true,
    kyc_verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "e0a8f73f-5428-4e3d-a59d-b1a9671f3b9c",
    firstname: 'Ngozi',
    lastname: 'Adeleke',
    username: 'ngozadeleke',
    email: 'user2@test.com',
    password: await bcrypt.hash('password123', 10),
    role: 'user',
    kyc_status: "not_submitted",
    phone_number: "1234568901",
    email_verified: false,
    kyc_verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "81a62358-19d7-4d61-9d75-b38dc4d69e91",
    firstname: 'Ibrahim',
    lastname: 'Musa',
    username: 'ibrahimmusa',
    email: 'user3@test.com',
    password: await bcrypt.hash('password123', 10),
    role: 'user',
    kyc_status: "not_submitted",
    phone_number: "1234568901",
    email_verified: true,
    kyc_verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "29e239f9-c7c2-4a4d-88ae-30c9e2cb4e6e",
    firstname: 'Ruth',
    lastname: 'Okon',
    username: 'ruthokon',
    email: 'user4@test.com',
    password: await bcrypt.hash('password123', 10),
    role: 'user',
    kyc_status: "not_submitted",
    phone_number: "1234568901",
    email_verified: false,
    kyc_verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "c816d9cf-72d4-48e3-b774-848f51b7b828",
    firstname: 'Tunde',
    lastname: 'Afolabi',
    username: 'tundeafolabi',
    email: 'user5@test.com',
    password: await bcrypt.hash('password123', 10),
    role: 'user',
    kyc_status: "not_submitted",
    phone_number: "1234568901",
    email_verified: true,
    kyc_verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]});
