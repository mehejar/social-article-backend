import catchAsync from "../../utils/catchAsynce";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const loginInfo = req.body
    const result = await authService.loginUser(loginInfo)
    const { refreshToken, accessToken } = result
    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    })
    res.status(201).json({
        success: true,
        message: "You Loged In Successfully",
        date: {
            accessToken
        }
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies
    const result = await authService.refreshToken(refreshToken)
    res.status(201).json({
        success: true,
        message: "You Loged In Successfully",
        date: result
    })
})

export const authController = {
    loginUser,
    refreshToken
}