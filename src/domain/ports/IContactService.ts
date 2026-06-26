export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface IContactService {
  send(message: ContactMessage): Promise<void>
}