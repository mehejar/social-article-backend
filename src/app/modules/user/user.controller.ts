import catchAsync from "../../utils/catchAsynce";
import { userServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await userServices.createUserIntoDB(userData)
    res.status(201).json({
        success: true,
        message: "Created Your Account Successfully",
        date: result
    })
})

const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params
    const result = await userServices.blockUser(userId)
    res.status(200).json({
        success: true,
        message: "User blocked successfully",
    })
})
export const userController = {
    createUser,
    blockUser
}