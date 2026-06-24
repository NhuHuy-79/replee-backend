import type { Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../types/auth.request";
import { deleteImageFromCloudinary } from "../services/file.service";
import { success, failure } from "../utils/response";

const deleteImageSchema = z.object({
  publicId: z.string().min(1, "publicId is required"),
});

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const authReq = req as unknown as AuthenticatedRequest;
    const uid = authReq.user?.uid;

    if (!uid) {
      return res.status(401).json(failure("Unauthorized: Missing user identity", 401));
    }

    const validationResult = deleteImageSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map((e) => e.message).join(", ");
      return res.status(400).json(failure(`Validation failed: ${errorMessage}`, 400));
    }

    const { publicId } = validationResult.data;

    const result = await deleteImageFromCloudinary(publicId);

    if (!result.success) {
      return res.status(400).json(failure(result.message, 400));
    }

    return res.status(200).json(success(result.message));

  } catch (error: any) {
    console.error(`[DeleteImage Controller Error]:`, error);
    return res.status(500).json(failure("Internal server error during image deletion", 500));
  }
};