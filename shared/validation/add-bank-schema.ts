import { z } from 'zod'

export const addBankSchema = z.object({
    bank_name: z.string(),
    bank_account_number: z.string(),
    bank_account_name: z.string(),
})

export type AddBankSchema = z.infer<typeof addBankSchema>;
