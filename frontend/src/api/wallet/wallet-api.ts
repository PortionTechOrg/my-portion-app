import { apiPrivate } from "../temp-config";

export default function WalletApi (){


    const getWalletBalance = async () =>{
        try {
            const res = await apiPrivate.get( `/wallet`, {} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null }
            }
        }
    }
    

    
    return  { getWalletBalance }

}

