import type { IContactService, ContactMessage } from '@/domain/ports/IContactService'

export function makeSendContactMessage(service: IContactService) {
  return (message: ContactMessage): Promise<void> =>
    service.send(message)
}