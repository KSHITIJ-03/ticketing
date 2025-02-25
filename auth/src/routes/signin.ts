import express, {Request, Response, NextFunction} from 'express';
import { body, validationResult } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-validation-errors';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email').isEmail().withMessage('email is invalid'),
        body('password').trim().notEmpty().withMessage('password is required')      
    ], validateRequest,
    async(req: Request, res: Response): Promise<any> => {

        const {email, password} = req.body;

        // check if user is valid
        const user = await User.findOne({email})
        if(!user) {
            throw new BadRequestError('invalid credentials');
        }
        //const user = await User.findOne({email}).select('password email'); // it will not log or res.send() password at any cost because of toJSON in schema
        const storedPassword = user.password;
        console.log(user);
        
        // check password
        if(!await Password.comparePassword(storedPassword, password)) {
            throw new BadRequestError('invalid credentials');
        }

        // send a jwt with a cookie
        const userJwt = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }

        res.status(200).send({user});

})

export {router as signinRouter};