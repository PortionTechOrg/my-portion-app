import { apiPrivate } from "@/api/temp-config";
import type { VendorKycSchema } from '@shared/validation/vendor-kyc-schema'

export default function KycApi (){

    
    const getKycDetails= async ( ) =>{
        try {
            const res = await apiPrivate.get( `/vendor/kyc/`);
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null }
            }
        }
    }

    const submitKyc= async (product: VendorKycSchema ) =>{
        try {
            const res = await apiPrivate.postForm( `/vendor/kyc/`, {
                ...product

            } );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null}
            }
        }
    }
    
    return  { submitKyc, getKycDetails }

}

