export interface MessagePayload {
  conversationId: string
  senderName: string
  imgUrl: string
  content: string
  contentType: MessageType
}

export enum MessageType {
    PLAIN_TEXT = "PLAIN_TEXT",
    IMAGE_URL = "IMAGE_URL",
    VIDEO_URL = "VIDEO_URL",
    FILE_URL = "FILE_URL",
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    FILE = "FILE",
}