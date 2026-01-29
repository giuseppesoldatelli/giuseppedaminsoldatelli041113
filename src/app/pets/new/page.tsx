"use client"

import { useRouter } from "next/navigation"
import { pets } from "@/data/pets"
import { PetForm } from "@/components/pet-form"

export default function NewPetPage() {
  const router = useRouter()

  function handleSubmit(data: { nome: string; especie: "Cachorro" | "Gato" | "Pássaro" | "Coelho" | "Hamster" | "Tartaruga"; idade: number; unidadeIdade: "ano" | "anos" | "mes" | "meses"; raca?: string }, fotoUrl: string | null) {
    const newPet = {
      id: Math.max(...pets.map(p => p.id)) + 1,
      nome: data.nome,
      especie: data.especie,
      idade: data.idade,
      unidadeIdade: data.unidadeIdade,
      raca: data.raca,
      foto: fotoUrl,
    }
    pets.push(newPet)
    router.push("/")
  }

  return <PetForm onSubmit={handleSubmit} />
}
