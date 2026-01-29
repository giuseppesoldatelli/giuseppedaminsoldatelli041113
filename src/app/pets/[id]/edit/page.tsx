"use client"

import { use } from "react"
import { useRouter, notFound } from "next/navigation"
import { pets } from "@/data/pets"
import { PetForm } from "@/components/pet-form"

interface EditPetPageProps {
  params: Promise<{ id: string }>
}

export default function EditPetPage({ params }: EditPetPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const pet = pets.find((p) => p.id === Number(id))

  if (!pet) {
    notFound()
  }

  const petData = pet

  function handleSubmit(data: { nome: string; especie: "Cachorro" | "Gato" | "Pássaro" | "Coelho" | "Hamster" | "Tartaruga"; idade: number; unidadeIdade: "ano" | "anos" | "mes" | "meses"; raca?: string }, fotoUrl: string | null) {
    const index = pets.findIndex((p) => p.id === petData.id)
    if (index !== -1) {
      pets[index] = {
        ...pets[index],
        nome: data.nome,
        especie: data.especie,
        idade: data.idade,
        unidadeIdade: data.unidadeIdade,
        raca: data.raca,
        foto: fotoUrl,
      }
    }
    router.push(`/pets/${petData.id}`)
  }

  return <PetForm pet={petData} onSubmit={handleSubmit} />
}
