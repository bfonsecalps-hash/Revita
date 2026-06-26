import type { IAppointmentRepository } from '@/domain/ports/IAppointmentRepository'
import type { Appointment } from '@/domain/entities/Appointment'

export class AppointmentApiAdapter implements IAppointmentRepository {
  constructor(private readonly baseUrl: string) {}

  async create(input: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
    const res = await fetch(`${this.baseUrl}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Falha ao agendar consulta')
    return res.json() as Promise<Appointment>
  }
}