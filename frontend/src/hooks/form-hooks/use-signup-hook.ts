import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createUserSchema } from '@shared/validation/createUserDTO.ts'
import type { SignUpFormData } from '@shared/validation/createUserDTO.ts'
import { useState } from "react";
export default function useSignup(){

    const { signUp } = APICalls();
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<SignUpFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            confirmPassword: '',
            email: '',
            firstname: '',
            lastname: '',
            password: ''

        }
    })

    async function onSignUp(value:SignUpFormData) {
        setIsLoading(true)

        const response = await signUp(value)
        if(response.success){
            toast.success(response.message)

            if(response.data.user?.role == "vendor"){
                navigate('/login/vendor');

            }else{
                navigate('/login');
            }
        }else {
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    
    return { onSignUp, form, isLoading }
    
}
