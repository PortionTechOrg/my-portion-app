import { z } from "zod"

export const loginSchema = z.object( {
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be atleast 6 characters')
})

export type LoginSchema = z.infer<typeof loginSchema>