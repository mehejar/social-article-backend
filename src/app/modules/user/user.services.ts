import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    payload.role = 'user'
    const result = await User.create(payload)
    return result
}

const blockUser = async (id: string) => {
    const isUserExist = await User.findById(id)
    if (!isUserExist) {
        throw new Error('User is not found')
    }
    if (isUserExist?.role === 'admin') {
        throw new Error('You cannot block an admin')
    }
    if (isUserExist?.isBlocked === true) {
        throw new Error('The user is already blocked')
    }
    const result = await User.findByIdAndUpdate({ _id: id }, { isBlocked: true })
    return result
}

export const userServices = {
    createUserIntoDB,
    blockUser
}