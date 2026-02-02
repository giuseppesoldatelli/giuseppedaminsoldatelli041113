export interface ApiFoto {
  id: number
  nome: string
  contentType: string
  url: string
}

export interface ApiTutor {
  nome: string
  contato: string
}

export interface ApiPet {
  id: number
  nome: string
  raca?: string
  idade: number
  foto?: ApiFoto | null
  tutor?: ApiTutor
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

export interface UpdatePetPayload {
  nome: string
  raca?: string
  idade: number
}
