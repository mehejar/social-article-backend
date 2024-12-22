import config from "../../config"
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"

import jwt from 'jsonwebtoken'

const loginUser = async (payload: TLoginUser) => {
    console.log(payload)
    //  chcecking if the user exist
    const isUserExist = await User.findOne({
        email: payload?.email
    })

    if (!isUserExist) {
        throw new Error('This User not found!')
    }

    // check is the user blocked?
    const isUserBlocked = isUserExist?.isBlocked
    if (isUserBlocked === true) {
        throw new Error('This User is blocked!')
    }

    // if the password is correct
    // const isPasswordCorrect = isUserExist?.password
    // if (payload.password !== isPasswordCorrect) {
    //     throw new Error('Password is incorrect')
    // }

    const jwtPayload = {
        userEmail: isUserExist?.email,
        role: isUserExist?.role,

    }

    //create token and sent to the clients JWT
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_secret as string,
        {
            expiresIn: '10d'
        }
    )


    return { accessToken }
}

export const authService = {
    loginUser
}