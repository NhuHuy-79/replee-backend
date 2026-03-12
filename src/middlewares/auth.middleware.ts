import { AuthenticatedRequest } from './../types/auth.request';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api.response';
import { success, failure } from '../utils/response';
import admin from '../config/firebase.config';

export const firebaseAuthMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;   

        if (!authHeader  || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(failure("Authentication token is missing or invalid", 401))
        }

        const token = authHeader.split(" ")[1]
        
        const decodedToken = await admin.auth().verifyIdToken(token)

        req.user = decodedToken

        next()

    } catch (error) { 
        return res.status(401).json(failure("Authentication failed", 401))
    }
}