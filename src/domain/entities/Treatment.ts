export type TreatmentCategory =
  | 'estetica'
  | 'ortodontia'
  | 'invisalign'
  | 'implantes'
  | 'preventivo'

export interface Treatment {
  id: string
  slug: string
  name: string
  shortDescription: string
  category: TreatmentCategory
  durationMinutes?: number
}