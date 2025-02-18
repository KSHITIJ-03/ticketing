import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
    console.log(err);

    if(err instanceof CustomError) {
        //console.log('validation error');

        //console.log(formattedErrors);
        
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
    
    return res.status(500).send({
        errors : [{
            message : 'something went wrong!!'
        }]
    })
}