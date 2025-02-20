import express, {Request, Response, NextFunction} from 'express';
import { body, validationResult } from 'express-validator';
import { DataBaseConnectionError } from '../errors/database-connection-errors';
import { RequestValidationError } from '../errors/request-validation-errors';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
const router = express.Router();



router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('email is invalid'),
        body('password').trim().isLength({min: 8, max: 20})
            .withMessage('password should be between 8 and 20 characters')      
    ],
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            //console.log(errors.array());
            throw new RequestValidationError(errors.array());
        }

        //throw new DataBaseConnectionError();
        const {email, password} = req.body

        if(await User.findOne({email})) {
            throw new BadRequestError('email is already in use')
        }

        const user = User.build({email, password})
        await user.save()

        res.status(201).send({user})

})

export {router as signupRouter};