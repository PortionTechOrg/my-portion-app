import { z } from "zod";

export const createUserSchema = z.object({
  firstname: z.string().min(3, 'Firstname too short!'),
  lastname: z.string().min(3, 'Lastname too short!'),
  // phone_number: z.string().optional(),
  email: z.string().email('Enter valid email'),
  role: z.enum(['vendor', 'user', 'admin', 'subadmin']),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
}).required();

export type createUserDto = z.infer<typeof createUserSchema>;
export type SignUpFormData = z.infer<typeof createUserSchema>;