import type { Request, Response } from "express"
import { ApiResponse } from "../types/api.response"
import { failure, success } from "../utils/response"
import { sendConversationNotification } from "../services/notification.service"
import { AuthenticatedRequest } from "../types/auth.request"

export const pushNotification = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log("Controller start")
    const uid = req.user?.uid

  if (!uid) {
    return res.status(401).json(failure("Unauthorized", 401))
  } 

  const { conversationId, senderName, imgUrl, content, contentType } = req.body
  const deviceToken = req.body.deviceToken
  const messagePayload = {
    conversationId,
    imgUrl,
    senderName,
    content,
    contentType
  }

  const response = await sendConversationNotification(uid, deviceToken, messagePayload)

  res.status(response.success ? 200 : 500).json(response)

  } catch (error) {
  
    res.status(500).json(failure("Failed to send notification", 500))
  }
}

