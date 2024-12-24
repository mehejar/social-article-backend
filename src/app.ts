import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { userRoutes } from "./app/modules/user/user.routes";
import { blogRoutes } from "./app/modules/blog/blog.routes";
import { authRoutes } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:3000'] }))

app.use('/api', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/auth', authRoutes)
app.use(cookieParser())

export const getAController = (req: Request, res: Response) => {
    res.send('Here is your blog')
}

app.get('/', getAController)

app.use(globalErrorHandler);


export default app