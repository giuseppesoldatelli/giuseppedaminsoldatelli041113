export interface Tutor {
  nome: string
  contato: string
}

export interface Pet {
  id: number
  nome: string
  especie: "Cachorro" | "Gato" | "Pássaro" | "Coelho" | "Hamster" | "Tartaruga"
  idade: number
  unidadeIdade: "ano" | "anos" | "mes" | "meses"
  raca?: string
  foto: string | null
  tutor?: Tutor
}

export const especies: Pet["especie"][] = ["Cachorro", "Gato", "Pássaro", "Coelho", "Hamster", "Tartaruga"]
export const unidadesIdade: Pet["unidadeIdade"][] = ["ano", "anos", "mes", "meses"]

export const especieEmoji: Record<Pet["especie"], string> = {
  Cachorro: "🐶",
  Gato: "🐱",
  Pássaro: "🐦",
  Coelho: "🐰",
  Hamster: "🐹",
  Tartaruga: "🐢",
}

export const pets: Pet[] = [
  { id: 1, nome: "Rex", especie: "Cachorro", idade: 3, unidadeIdade: "anos", foto: null, tutor: { nome: "Carlos Silva", contato: "(11) 99876-5432" } },
  { id: 2, nome: "Luna", especie: "Gato", idade: 2, unidadeIdade: "anos", foto: null, tutor: { nome: "Ana Oliveira", contato: "(21) 98765-4321" } },
  { id: 3, nome: "Pipoca", especie: "Cachorro", idade: 6, unidadeIdade: "meses", foto: null },
  { id: 4, nome: "Simba", especie: "Gato", idade: 4, unidadeIdade: "anos", foto: null, tutor: { nome: "Marcos Souza", contato: "(31) 97654-3210" } },
  { id: 5, nome: "Thor", especie: "Cachorro", idade: 1, unidadeIdade: "ano", foto: null },
  { id: 6, nome: "Mel", especie: "Pássaro", idade: 2, unidadeIdade: "anos", foto: null, tutor: { nome: "Juliana Costa", contato: "(41) 96543-2109" } },
  { id: 7, nome: "Bob", especie: "Tartaruga", idade: 10, unidadeIdade: "anos", foto: null },
  { id: 8, nome: "Nina", especie: "Gato", idade: 8, unidadeIdade: "meses", foto: null },
  { id: 9, nome: "Bolinha", especie: "Hamster", idade: 1, unidadeIdade: "ano", foto: null, tutor: { nome: "Pedro Santos", contato: "(51) 95432-1098" } },
  { id: 10, nome: "Frajola", especie: "Gato", idade: 5, unidadeIdade: "anos", foto: null, tutor: { nome: "Maria Cleyce", contato: "(11) 91234-5678" } },
  { id: 11, nome: "Amora", especie: "Coelho", idade: 3, unidadeIdade: "anos", foto: null },
  { id: 12, nome: "Toddy", especie: "Cachorro", idade: 7, unidadeIdade: "anos", foto: null, tutor: { nome: "Fernanda Lima", contato: "(61) 94321-0987" } },
  { id: 13, nome: "Mia", especie: "Gato", idade: 1, unidadeIdade: "ano", foto: null },
  { id: 14, nome: "Kiko", especie: "Pássaro", idade: 3, unidadeIdade: "meses", foto: null },
  { id: 15, nome: "Pandora", especie: "Coelho", idade: 2, unidadeIdade: "anos", foto: null },
  { id: 16, nome: "Bidu", especie: "Cachorro", idade: 4, unidadeIdade: "anos", foto: null },
  { id: 17, nome: "Flor", especie: "Hamster", idade: 6, unidadeIdade: "meses", foto: null },
  { id: 18, nome: "Nemo", especie: "Tartaruga", idade: 15, unidadeIdade: "anos", foto: null },
]
