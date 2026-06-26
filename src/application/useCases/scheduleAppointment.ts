import type { IAppointmentRepository } from '@/domain/ports/IAppointmentRepository'
import type { Appointment } from '@/domain/entities/Appointment'

export type ScheduleAppointmentInput = Omit<Appointment, 'id' | 'status'>

export function makeScheduleAppointment(repo: IAppointmentRepository) {
  return (input: ScheduleAppointmentInput): Promise<Appointment> =>
    repo.create(input)
}