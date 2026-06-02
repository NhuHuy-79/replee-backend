import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth.request';
import { failure, success } from '../utils/response';

export const deviceTokenMiddleware = async (
    authReq: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const req = authReq as AuthenticatedRequest;
        const deviceToken = req.headers["device-token"] as string
        if (!deviceToken) {
            return res.status(400).json(failure("Device token is required", 400));
        }
        req.body.deviceToken = deviceToken
        console.log("Device token:", deviceToken)

        next()

    } catch (error) {
       return res.status(400).json(failure("Invalid device token", 400))
    } 
}