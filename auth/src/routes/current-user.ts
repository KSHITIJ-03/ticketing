import express, {Request, Response, NextFunction} from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response): any => {
    
    if(!req.session?.jwt) {
        //throw new BadRequestError('user is logged out');
        return res.send({currentUser: null})
    }
    try {
        const payLoad = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as {
            id: string; 
            email: string; 
            iat: number; 
        }
        let dateOfIssue = new Date(payLoad.iat * 1000)
        console.log('cookie issued at: ' + dateOfIssue.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        res.send({currentUser: payLoad})
    } catch(err) {
        res.send({currentUser: null})
    }
    //res.status(200).send('current user');
})

export {router as currentUserRouter}; 