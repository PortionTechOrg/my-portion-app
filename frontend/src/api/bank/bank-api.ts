import { apiPrivate } from "../temp-config";
import type { AddBankSchema } from "@shared/validation/add-bank-schema";

export default function BankApi (){


    const addNewBank = async (data: AddBankSchema) =>{
        try {
            const res = await apiPrivate.post( `/bank`, { ...data } );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null }
            }
        }
    }
    
    return  { addNewBank }

}

