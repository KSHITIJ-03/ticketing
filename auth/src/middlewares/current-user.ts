import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


interface UserPayload {
    id: string,
    email: string,
    iat: number
}

// augmenting ype definitions to add optional currentUser field on req object;
declare global {
    namespace Express {
        interface Request { // augmenting existing interface
            currentUser?: UserPayload
        }
    }
}

export const currentUser = async(req: Request, res: Response, next: NextFunction) => {

    try{
        if(!req.session?.jwt) {
            return next()
        }
        const payLoad = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payLoad
    } catch(err) {

    }

    next();
}
