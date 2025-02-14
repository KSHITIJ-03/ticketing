import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();



router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('email is invalid'),
        body('password').trim().isLength({min: 8, max: 20})
            .withMessage('password should be between 8 and 20 characters')      
    ],
    (req: Request, res: Response): Response | any => {
    
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            //console.log(errors);
            return res.status(400).json({
                errors: errors.array()
            })
        }

        
        const {email, password} = req.body

        res.status(201).json({
            message : 'user created'
        });

})

export {router as signupRouter};