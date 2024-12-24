import { z } from 'zod'

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required to login' }),
        password: z.string({ required_error: 'password is required to login' })

    })
})
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'Refresh is Required' })
    })
})

export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema
}