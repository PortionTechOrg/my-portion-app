import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUserSchema } from '@shared/validation/loginUserDTO.ts'
import type { LoginSchema } from '@shared/validation/loginUserDTO'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore, useUserStore } from "@/zustand/store";

export default function useLogin() {

    const { login } = APICalls();
    const { loginAuth } = useAuthStore()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const navigate = useNavigate();
    
    
    const form  = useForm<LoginSchema>({ 
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onLogin(value:LoginSchema){
        setIsLoading(true)
        const response = await login(value)
        if(response.success){
            toast.success(response.message)

            loginAuth(response.data);
            useUserStore.setState({ user: response.data.user })

            // @ts-expect-error
            if(response.data.user.role == 'vendor'){                
                if(response.data.user?.kyc_status == "not_submitted" || response.data.user?.kyc_status == "rejected"){
                    navigate('/dashboard/kyc')
                }else {
                    console.log(response.data.user?.kyc_verified)
                    navigate('/dashboard')
                }
            }else{
                navigate('/')
            }

        }else{
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    return { form, onLogin, isLoading }
}