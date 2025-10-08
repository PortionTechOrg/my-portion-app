import { Injectable } from '@nestjs/common';
import { KycBusiness } from 'src/database/models/KycBusiness';
import { KycBusinessDocs } from 'src/database/models/KycBusinessDocs';
import { KycIdVerification } from 'src/database/models/KycIdVerification';
import { KycPersonal } from 'src/database/models/KycPersonal';
import { User } from 'src/database/models/User';

import { kycAttribute } from '@shared/types/kyc';
import { VendorKycDTO } from '@shared/validation/vendor-kyc-schema';

import fs  from 'fs';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class VendorService {

    constructor(private readonly cloudinary: CloudinaryService) {} 

    async submitKyc(user_id: string, files: any, KycDTO: VendorKycDTO) {
        
        const { cloudinary, cloudinaryUploadFolder } = this.cloudinary.getCloudinary()

        let result;
     
        const id_front_url_path = files.id_front[0].path
        
        const id_back_url_path = files.id_back ? files.id_back[0].path : null
        
        const passport_url_path = files.passport ? files.passport[0].path : null
        
        const utility_bill_url_path = files.utility_bill ? files.utility_bill[0].path : null
        
        const cac_certificate_url_path = files.cac_certificate ? files.cac_certificate[0].path : null
        
        const tax_certificate_url_path = files.tax_certificate ? files.tax_certificate[0].path : null
        

        if( !id_front_url_path || !id_back_url_path || !passport_url_path || !utility_bill_url_path || !cac_certificate_url_path || !tax_certificate_url_path) {
            throw new Error('Missing file upload');
        }

        result = await cloudinary.uploader.upload(id_front_url_path, { folder: cloudinaryUploadFolder })
        const id_front = cloudinary.url(result.secure_url)
        result = await cloudinary.uploader.upload(id_back_url_path, { folder: cloudinaryUploadFolder })
        const id_back = cloudinary.url(result.secure_url)
        result = await cloudinary.uploader.upload(passport_url_path, { folder: cloudinaryUploadFolder })
        const passport = cloudinary.url(result.secure_url)
        result = await cloudinary.uploader.upload(utility_bill_url_path, { folder: cloudinaryUploadFolder })
        const utility_bill = cloudinary.url(result.secure_url)
        result = await cloudinary.uploader.upload(cac_certificate_url_path, { folder: cloudinaryUploadFolder })
        const cac_certificate = cloudinary.url(result.secure_url)
        result = await cloudinary.uploader.upload(tax_certificate_url_path, { folder: cloudinaryUploadFolder })
        const tax_certificate = cloudinary.url(result.secure_url)


        await KycPersonal.create( {
            user_id,
            address: KycDTO.address,
            bvn: KycDTO.bvn,
            city: KycDTO.city,
            // @ts-expect-error
            date_of_birth: KycDTO.date_of_birth,
            email: KycDTO.email,
            firstname: KycDTO.firstname,
            lastname: KycDTO.lastname,
            phone_number: KycDTO.phone_number,
            state: KycDTO.state,
            town: KycDTO. town,
            
        })

        await KycBusiness.create( {
            business_address: KycDTO.business_address,
            business_email: KycDTO.business_email,
            business_name: KycDTO.business_name,
            business_phone_number: KycDTO.business_phone_number,
            cac_number: KycDTO.cac_number,
            tax_id: KycDTO.tax_id,
            user_id
        })

        await KycIdVerification.create( {
            id_back,
            id_front,
            id_number: KycDTO.id_number,
            passport,
            id_type: KycDTO.id_type,
            user_id
        })

        await KycBusinessDocs.create( {
            cac_certificate,
            tax_certificate,
            user_id,
            utility_bill
        })

        await User.update( {
            kyc_verified: true,
        },
        {
            where: {
                id: user_id
            }
        }
    )

        if (fs.existsSync(id_front_url_path)) {
            fs.unlinkSync(id_front_url_path);
        }

        if (fs.existsSync(id_back_url_path)) {
            fs.unlinkSync(id_back_url_path);
        }

        if (fs.existsSync(tax_certificate_url_path)) {
            fs.unlinkSync(tax_certificate_url_path);
        }

        if (fs.existsSync(cac_certificate_url_path)) {
            fs.unlinkSync(cac_certificate_url_path);
        }

        if (fs.existsSync(utility_bill_url_path)) {
            fs.unlinkSync(utility_bill_url_path);
        }

        if (fs.existsSync(passport_url_path)) {
            fs.unlinkSync(passport_url_path);
        }

        return {
            success: true,
            message: "KYC submitted successfully"
        };
    }

    async getkycAttribute(user_id: string) {

        const personal = await KycPersonal.findOne({
          where: {
               user_id
          }
     })

     const business = await KycBusiness.findOne( {
          where: {
               user_id
          }
     })

     const id = await KycIdVerification.findOne( {
          where: {
               user_id
          }
     })

     const docs = await KycBusinessDocs.findOne( {
          where: {
               user_id
          }
     })

     const kyc: Partial<kycAttribute> = {}
     kyc.kyc_personal = personal
     kyc.kyc_business = business
     kyc.kyc_business_docs = docs
     kyc.kyc_id_verification = id
    }

}
