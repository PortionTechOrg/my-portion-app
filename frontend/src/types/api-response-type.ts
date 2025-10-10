import type { UserWithKycAttributes } from '@shared/types/product'

export type loginProps = {
    token: string,
    refreshToken: string,
    user: UserWithKycAttributes | null
}

export type AuthResponse = {
    success: boolean,
    message: string,
    data: { 
        token: string,
        refreshToken: string, 
        user: UserWithKycAttributes | null
    }
}

export type LoginResponse = AuthResponse
export type RefreshTokenResponse = AuthResponse
export type SignupResponse = AuthResponse