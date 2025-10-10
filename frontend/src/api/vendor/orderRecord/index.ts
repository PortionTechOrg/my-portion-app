import { apiPrivate } from "@/api/temp-config";

export default function OrderRecordApi (){

    
    const getOrderRecord= async ( page: number=1, limit: number = 10 ) =>{
        try {
            const res = await apiPrivate.get( `/vendor/order-record`, { params: { page, limit }});
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: null };
            } else {
                return {success: false, message: err.message, data: null }
            }
        }
    }

    
    return  { getOrderRecord }

}

