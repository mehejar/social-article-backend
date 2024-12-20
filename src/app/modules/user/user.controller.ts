import catchAsync from "../../utils/catchAsynce";
import { userServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
    const userData = req.body
    const result = await userServices.createUserIntoDB(userData)
    res.status(201).json({
        success: true,
        message: "Faculties is Retrieve Successfully",
        date: result
    })
})
export const userController = {
    createUser
}