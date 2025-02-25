import { Request, Response, NextFunction } from "express";
import { NotAuthourizedError } from "../errors/not-authorized-error";
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        throw new NotAuthourizedError();
    }
    next();
}