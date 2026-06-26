import { useState } from 'react'
import { AppointmentApiAdapter } from '@/infrastructure/api/appointmentApi'
import { makeScheduleAppointment } from '@/application/useCases/scheduleAppointment'
import type { ScheduleAppointmentInput } from '@/application/useCases/scheduleAppointment'
import type { Appointment } from '@/domain/entities/Appointment'

const repo = new AppointmentApiAdapter(import.meta.env.VITE_API_URL ?? '')
const scheduleAppointment = makeScheduleAppointment(repo)

export function useAppointment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Appointment | null>(null)

  async function schedule(input: ScheduleAppointmentInput) {
    setLoading(true)
    setError(null)
    try {
      setData(await scheduleAppointment(input))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return { schedule, loading, error, data }
}