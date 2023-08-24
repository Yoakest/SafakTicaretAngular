import { Token } from "@angular/compiler"

export class LoginUser {
    isSuccess: boolean
    message: string
    token: {
        token: string
        expiration: Date
        refreshToken: string
    }
}