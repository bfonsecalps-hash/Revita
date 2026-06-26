import type { IContactService, ContactMessage } from '@/domain/ports/IContactService'

export class ContactApiAdapter implements IContactService {
  constructor(private readonly baseUrl: string) {}

  async send(message: ContactMessage): Promise<void> {
    const res = await fetch(`${this.baseUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })
    if (!res.ok) throw new Error('Falha ao enviar mensagem')
  }
}