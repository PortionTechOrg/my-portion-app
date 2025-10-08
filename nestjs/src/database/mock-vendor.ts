import { UserAttributes } from '@shared/types/user';
import { KycPersonalAttribute } from '@shared/types/KycPersonal';
import * as bcrypt from 'bcryptjs';
import { KycIdVerificationAttribute } from '@shared/types/kyc-id-verification';
import { KycBusinessAttribute } from '@shared/types/KycBusiness';
import { KycBusinessDocsAttribute } from '@shared/types/kyc-business-docs';


export const mockVendorSeed: ()=> Promise<UserAttributes[]> = ( async () => {
    return[
          {
            id: "fada-466b-80cc-d85bf1d79bed-a089a4a4",
            firstname: 'Amina',
            lastname: 'Yusuf',
            username: 'aminayusuf',
            email: 'vendor1@test.com',
            password: await bcrypt.hash('password123', 10),
            role: 'vendor',
            email_verified: false,
            kyc_verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "b7a58ae1-546e-4c97-b86e-820369cbd035",
            firstname: 'Chinedu',
            lastname: 'Okafor',
            username: 'chineduokafor',
            email: 'vendor2@test.com',
            password: await bcrypt.hash('password123', 10),
            role: 'vendor',
            email_verified: true,
            kyc_verified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: "3f7034ff-bc0e-4f43-81a0-f0c16a48eb69",
            firstname: 'Super',
            lastname: 'Admin',
            username: 'admin',
            email: 'admin@test.com',
            password: await bcrypt.hash('password123', 10),
            role: 'admin',
            email_verified: true,
            kyc_verified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]});

export const mockVendorKycPersonal: ()=> Promise<KycPersonalAttribute[]> = ( async () => {
    return[
          {
                "id": "e98d4ee2-448d-49cd-a51e-d86c22ca702e",
                "user_id": "b7a58ae1-546e-4c97-b86e-820369cbd035",
                "firstname": "Chinedu",
                "lastname": "Okafor",
                "date_of_birth": new Date(),
                "phone_number": "08105910313",
                "email": "vendor2@test.comd",
                "bvn": "12345678901",
                "address": "Ekeki Housing Estate, Yenagoa Bayelsa state",
                "town": "Yenagoa",
                "city": "Lagos",
                "state": "Bayelsa",
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
        ]});

export const mockVendorKycIdVerification: ()=> Promise<KycIdVerificationAttribute[]> = ( async () => {
    return[
          {
                "id": "4ef1a8aa-c35e-4a82-b546-9d905c0676aa",
                "user_id": "b7a58ae1-546e-4c97-b86e-820369cbd035",
                "id_type": "International Passport",
                "id_number": "1234565",
                "id_front": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875340/prod/tofkejvfcltvpxtsiv3h.png",
                "id_back": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875342/prod/y0q4i7l8byb9gfzueqlz.png",
                "passport": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875344/prod/xiwl683swjdz8nax7fz5.png",
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
        ]});

export const mockVendorKycBusiness: ()=> Promise<KycBusinessAttribute[]> = ( async () => {
    return[
            {
                "id": "7ae28c2e-739a-4c4b-af96-70f6a92ef79c",
                "user_id": "b7a58ae1-546e-4c97-b86e-820369cbd035",
                "business_name": "Chinedu Ventures Nig.",
                "business_phone_number": "08098765432",
                "business_email": "chineduventure@gmail.com",
                "cac_number": "1234543",
                "tax_id": "RRR1234",
                "business_address": "Ekeki Housing Estate, Yenagoa Bayelsa state",
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
        ]});

export const mockVendorKycBusinessDocs: ()=> Promise<KycBusinessDocsAttribute[]> = ( async () => {
    return[
          
            {
                "id": "44be9ce6-e796-4318-8c8a-63fc2ad3ae47",
                "user_id": "b7a58ae1-546e-4c97-b86e-820369cbd035",
                "utility_bill": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875346/prod/vxdhqdpx69x6n0kca7zq.png",
                "cac_certificate": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875348/prod/qcczjivhkqdotswirjta.png",
                "tax_certificate": "https://res.cloudinary.com/di1vgb850/image/upload/v1759875350/prod/jyob8bmt0cfxfrcz8isa.png",
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
        ]});