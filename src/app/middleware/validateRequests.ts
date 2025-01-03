import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import catchAsync from "../utils/catchAsynce"

const validRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        //validation 
        await schema.parseAsync({ body: req.body })

        next()
    })



}



export default validRequest