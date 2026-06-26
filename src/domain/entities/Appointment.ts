export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  patientPhone: string
  treatmentId: string
  preferredDate: Date
  notes?: string
  status: AppointmentStatus
}