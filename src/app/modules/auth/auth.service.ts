import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"

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
    const isUserBlocked = payload?.isBlocked
    if (isUserBlocked === true) {
        throw new Error('This User is blocked!')
    }

    const result = await User.findOne({
        payload
    })
    return result
}

export const authService = {
    loginUser
}