import { v2 as cloudinary } from "cloudinary"

export const deleteImageFromCloudinary = async (publicId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result === "ok") {
      return { success: true, message: "Image deleted from Cloudinary successfully" };
    }

    return { success: false, message: `Cloudinary returned status: ${response.result}` };
  } catch (error) {
    console.error("[Cloudinary Service Error]:", error);
    throw new Error("Failed to communicate with Cloudinary API");
  }
};