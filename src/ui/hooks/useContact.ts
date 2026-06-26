import { useState } from 'react'
import { ContactApiAdapter } from '@/infrastructure/api/contactApi'
import { makeSendContactMessage } from '@/application/useCases/sendContactMessage'
import type { ContactMessage } from '@/domain/ports/IContactService'

const service = new ContactApiAdapter(import.meta.env.VITE_API_URL ?? '')
const sendContactMessage = makeSendContactMessage(service)

export function useContact() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function send(message: ContactMessage) {
    setLoading(true)
    setError(null)
    try {
      await sendContactMessage(message)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return { send, loading, error, sent }
}