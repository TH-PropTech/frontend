export interface SurveyState {
  age: number
  income: number
  preferred_district: string
  rooms: number
  has_gym: boolean
  has_parking: boolean
}

export interface RecommendationResult {
  id: string | number
  name: string
  district: string
  rent_price: number
  rooms: number
  has_gym: boolean
  has_parking: boolean
  image_url?: string
  match_score: number
  reasons: string[]
  confidence: 'Cao' | 'Trung bình' | 'Thấp'
  contributions: {
    finance: number
    location: number
    demographics: number
    amenities: number
  }
}
