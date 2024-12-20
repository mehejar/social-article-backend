import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { userRoutes } from "./app/modules/user/user.routes";

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)

export const getAController = (req: Request, res: Response) => {
    res.send('Here is your blog')
}

app.get('/', getAController)

export default app