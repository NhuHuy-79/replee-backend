import admin from '../config/firebase.config';
import { MessagePayload } from '../types/message.payload';
import { success, failure} from '../utils/response';

export const sendConversationNotification = async (
  uid: string,
  deviceToken: string,
  messagePayload: MessagePayload
) => {
  try {

    const { conversationId, senderName, imgUrl : imgUrl, content, contentType: contentType } = messagePayload

    console.log("Sending notification with payload:", messagePayload)

    const message = {
      token: deviceToken,
      data: {
        conversationId: String(conversationId),
        senderImg: imgUrl ?? "",
        senderName: senderName ?? "",
        content: content ?? "",
        type: contentType ?? ""
      }
}
    const messageId = await admin.messaging().send(message)

    console.log("SERVICE HIT")

    return success({ messageId })

  } catch (error: any) {

    console.error("FCM error:", error)

    if (error.code === "messaging/registration-token-not-registered") {

      failure("Device token is no longer valid", 410)
    }

    return failure("Failed to send notification", 500)
  }
}