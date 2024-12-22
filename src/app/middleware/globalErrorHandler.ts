/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import handleZodError, { TErrorSource } from '../errorHandlers/zodHandler';
import handleValidationError from '../errorHandlers/handleValidationError';
import handleCastError from '../errorHandlers/handleCastError';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';



    let errorSources: TErrorSource = [{
        path: '',
        message: '',
    }]

    // handler create


    if (err instanceof ZodError) {

        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources

    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    // else if (err?.code === 11000) {
    //     const simplifiedError = handleDuplicateError(err)
    //     statusCode = simplifiedError?.statusCode;
    //     message = simplifiedError?.message
    //     errorSources = simplifiedError?.errorSources
    // }

    res.status(statusCode).json({

        success: false,
        message,
        errorSources,
        // error: err,

    });
};

export default globalErrorHandler;