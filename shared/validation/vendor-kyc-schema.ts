import { z } from "zod"

export const vendorKycSchema = z.object( {
    firstname: z.string(),
    lastname: z.string(),
    date_of_birth: z.string(),
    phone_number: z.string(),
    email: z.string(),
    bvn: z.string().length(11, "must be 11 numbers"),
    address: z.string(),
    town: z.string(),
    city: z.string(),
    state: z.file(),


    business_name: z.string(),
    business_email:z.email(),
    business_phone_number:z.string(),
    cac_number:z.string(),
    tax_id:z.string(),
    business_address:z.string(),


    id_type:  z.string(),
    id_number: z.string(),
    id_front:  z.file(),
    id_back:  z.file(),
    passport:  z.file(),
    

    utility_bill:   z.file(),
    cac_certificate:  z.file(),
    tax_certificate:  z.file(),
})

export const vendorKycSchemaWithoutFiles = vendorKycSchema.omit({
  id_front: true,
  id_back: true,
  passport: true,
  utility_bill: true,
  cac_certificate: true,
  tax_certificate: true,
});


export type VendorKycSchema = z.infer<typeof vendorKycSchema>
export type VendorKycDTO = z.infer<typeof vendorKycSchema>