export interface ApiFoto {
  id: number
  nome: string
  contentType: string
  url: string
}

export interface ApiTutor {
  id: number
  nome: string
  telefone: string
  email?: string | null
  endereco?: string
  cpf?: string | null
  foto?: ApiFoto | null
}

export interface ApiPet {
  id: number
  nome: string
  raca?: string
  idade: number
  foto?: ApiFoto | null
  tutores?: ApiTutor[]
}

export interface PaginatedResponse<T> {
  content: T[]
  page: number
  size: number
  total: number
  pageCount: number
}

export interface PetsListParams {
  page?: number
  size?: number
  nome?: string
}

export interface ApiTutorDetail extends ApiTutor {
  pets?: ApiPet[]
}

export interface UpdatePetPayload {
  nome: string
  raca?: string
  idade: number
}
