import type { Appointment } from '../entities/Appointment'

export interface IAppointmentRepository {
  create(input: Omit<Appointment, 'id' | 'status'>): Promise<Appointment>
}