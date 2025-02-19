import express, {Request, Response, NextFunction} from 'express';
import { body, validationResult } from 'express-validator';
import { DataBaseConnectionError } from '../errors/database-connection-errors';
import { RequestValidationError } from '../errors/request-validation-errors';
const router = express.Router();



router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('email is invalid'),
        body('password').trim().isLength({min: 8, max: 20})
            .withMessage('password should be between 8 and 20 characters')      
    ],
    async (req: Request, res: Response, next: NextFunction) => {
    
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            //console.log(errors.array());
            throw new RequestValidationError(errors.array());
        }

        //throw new DataBaseConnectionError();
        const {email, password} = req.body

        res.status(201).json({
            message : 'user created'
        });

})

export {router as signupRouter};