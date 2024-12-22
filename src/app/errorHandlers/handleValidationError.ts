import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResposne } from "./zodHandler";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResposne => {

    const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })




    const statusCode = 400
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSources,

    }
}

export default handleValidationError