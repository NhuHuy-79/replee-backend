import { ApiError } from "../types/api.response";
import { ApiResponse } from "../types/api.response";
import { Response } from "express";

export function success<T>(data?: T) : ApiResponse<T>{
    return {
        success: true,
        data,
    }
}

export function failure(message: string, code: number) : ApiResponse<null>{
    return {
        success: false,
        apiError: {
            message,
            code,
        }
    }
}