import config from "../../config"
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"

import jwt, { JwtPayload } from 'jsonwebtoken'
import { createToken } from "./auth.utils"
import { AppError } from "../../errorHandlers/AppError"

const loginUser = async (payload: TLoginUser) => {
    console.log(payload)
    //  chcecking if the user exist
    const isUserExist = await User.findOne({
        email: payload?.email,
    })

    if (!isUserExist) {
        throw new AppError(404, 'This User not found!')
    }

    // if the password is correct
    const isPasswordCorrect = isUserExist?.password

    const isPassswordCorrect = await User.findOne({
        email: payload?.email,
        password: payload?.password,
    })

    if (!isPassswordCorrect) {
        throw new AppError(404, 'Password is incorrect')
    }

    // check is the user blocked?
    const isUserBlocked = isUserExist?.isBlocked
    if (isUserBlocked === true) {
        throw new AppError(404, 'This User is blocked!')
    }



    const jwtPayload = {
        userEmail: isUserExist?.email,
        role: isUserExist?.role,

    }

    //create token and sent to the clients JWT
    const accessToken = createToken(jwtPayload, config.jwt_secret as string, '10d')

    const refreshToken = createToken(jwtPayload, config.jwt_secret as string, '365d')


    return {
        accessToken,
        refreshToken
    }
}

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
    ) as JwtPayload;

    const { userEmail, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ userEmail });

    if (!user) {
        throw new AppError(404, 'This user is not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus === true) {
        throw new AppError(404, 'This user is blocked ! !');
    }



    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string, '10d',
    );

    return {
        accessToken,
    };
};

export const authService = {
    loginUser,
    refreshToken
}