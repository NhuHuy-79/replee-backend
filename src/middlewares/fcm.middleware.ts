import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth.request';
import { failure, success } from '../utils/response';

export const deviceTokenMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const deviceToken = req.headers["device-token"] as string
        if (!deviceToken) {
            return failure("Device token is required", 400);
        }
        req.body.deviceToken = deviceToken
        console.log("Device token:", deviceToken)

        next()

    } catch (error) {
       res.status(400).json(failure("Invalid device token", 400))
    } 
}