import type { KycBusinessDocsAttribute } from "./kyc-business-docs"
import type { KycIdVerificationAttribute } from "./kyc-id-verification"
import type { KycBusinessAttribute } from "./KycBusiness"
import type { KycPersonalAttribute } from "./KycPersonal"

export interface kycAttribute {
    kyc_personal: KycPersonalAttribute | null,
    kyc_business: KycBusinessAttribute | null
    kyc_business_docs: KycBusinessDocsAttribute | null
    kyc_id_verification: KycIdVerificationAttribute | null
}