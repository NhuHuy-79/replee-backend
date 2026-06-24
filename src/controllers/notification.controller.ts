import type { Request, Response } from "express"
import { z } from "zod"
import { ApiResponse } from "../types/api.response"
import { failure, success } from "../utils/response"
import { sendConversationNotification } from "../services/notification.service"
import { AuthenticatedRequest } from "../types/auth.request"
import { MessageType } from "../types/message.payload"

// Schema xác thực dữ liệu đầu vào bằng Zod
const pushNotificationSchema = z.object({
  receiverId: z.string().min(1, "receiverId is required"),
  conversationId: z.union([z.string(), z.number()]).pipe(z.coerce.string()),
  senderName: z.string().min(1, "senderName is required"),
  imgUrl: z.string().min(1, "imgUrl is required"),
  content: z.string().min(1, "content is required"),
  contentType: z.enum(MessageType),
  messageId: z.string().min(1, "messageId is required"),
  deviceToken: z.string().min(1, "deviceToken is required"),
})

export const pushNotification = async (auth: Request, res: Response) => {
  try {
    const req = auth as AuthenticatedRequest;
    const uid = req.user?.uid

    if (!uid) {
      return res.status(401).json(failure("Unauthorized: Missing user identity", 401))
    } 

    const validationResult = pushNotificationSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map(e => e.message).join(', ')
      return res.status(400).json(failure(`Validation failed: ${errorMessage}`, 400))
    }

    const { deviceToken, ...messagePayload } = validationResult.data

    const response = await sendConversationNotification(uid, deviceToken, messagePayload)

    if (!response.success) {
      return res.status(response.apiError?.code || 500).json(response)
    }

    return res.status(200).json(response)

  } catch (error) {
    console.error(`[PushNotification Controller Error]:`, error)
    return res.status(500).json(failure("Internal server error during push notification", 500))
  }
}
