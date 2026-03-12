export interface ApiError{
    message: string,
    code: number
}



export interface ApiResponse<T>{
    success: boolean,
    data?: T,
    apiError?: ApiError
}