import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AddBankSchema } from '@shared/validation/add-bank-schema'
import  { addBankSchema } from '@shared/validation/add-bank-schema'
import toast from "react-hot-toast";
import BankApi from "@/api/bank/bank-api";

export default function useAddBank() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const { addNewBank } = BankApi()

    const form = useForm<AddBankSchema>({
        resolver: zodResolver(addBankSchema),
        defaultValues: {
            bank_account_name: "",
            bank_account_number: "",
            bank_name: ""
        }
    })

    async function onAddBank(data: AddBankSchema){
        setIsLoading(true)
        const response = await addNewBank(data)
        if(response.success){
            toast.success(response.message)
        }else{
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    return { onAddBank, form, isLoading }
}