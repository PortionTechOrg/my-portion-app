import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ParsedToken } from 'decorators';
import { VendorKycDTO, vendorKycSchemaWithoutFiles } from '@shared/validation/vendor-kyc-schema';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('v1/vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService ) {}

    @Post('kyc')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'tax_certificate', maxCount: 1 }, 
        { name: 'cac_certificate', maxCount: 1 }, 
        { name: 'utility_bill', maxCount: 1 },
        { name: 'passport', maxCount: 1 },
        { name: 'id_back', maxCount: 1 },
        { name: 'id_front', maxCount: 1 }
    ]))
    
    submitKyc(
        @UploadedFiles() files: { 
            tax_certificate?: Express.Multer.File[], 
            cac_certificate?: Express.Multer.File[], 
            utility_bill?: Express.Multer.File[],
            passport?: Express.Multer.File[],
            id_back?: Express.Multer.File[],
            id_front?: Express.Multer.File[] 
        },
        @ParsedToken() user: { id: string },  
        @Body(new ZodValidationPipe(vendorKycSchemaWithoutFiles)) KycDTO: VendorKycDTO,
    ) {      
        return this.vendorService.submitKyc(user.id, files, KycDTO);
    }


    @Get('kyc')
    getKycDetails(
        @ParsedToken() user: { id: string },

    ) {
        return this.vendorService.getkycAttribute(user.id);
    }

}
