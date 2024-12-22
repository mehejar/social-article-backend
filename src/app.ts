import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { userRoutes } from "./app/modules/user/user.routes";
import { blogRoutes } from "./app/modules/blog/blog.routes";
import { authRoutes } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/auth', authRoutes)

export const getAController = (req: Request, res: Response) => {
    res.send('Here is your blog')
}

app.get('/', getAController)

app.use(globalErrorHandler);


export default app