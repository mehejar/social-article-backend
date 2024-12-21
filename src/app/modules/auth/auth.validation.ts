import { z } from 'zod'

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required to login' }),
        password: z.string({ required_error: 'password is required to login' })

    })
})

export const AuthValidation = {
    loginValidationSchema
}