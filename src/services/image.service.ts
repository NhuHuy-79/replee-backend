import cloudinary from '../config/cloudinary.config';
import { failure, success } from '../utils/response';

export const deleteImage = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return success(result);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }

}