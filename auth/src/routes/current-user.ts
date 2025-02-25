import express, {Request, Response, NextFunction} from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { currentUser } from '../middlewares/current-user';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response): any => {
    
    // let dateOfIssue = new Date(req.currentUser!.iat * 1000)
    // console.log('cookie issued at: ' + dateOfIssue.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    res.send({currentUser: req.currentUser || null})

    //res.status(200).send('current user');
})

export {router as currentUserRouter}; 