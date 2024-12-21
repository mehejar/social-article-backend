import catchAsync from "../../utils/catchAsynce";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const loginInfo = req.body
    const result = await authService.loginUser(loginInfo)
    res.status(201).json({
        success: true,
        message: "You Loged In Successfully",
        date: result
    })
})

export const authController = {
    loginUser
}