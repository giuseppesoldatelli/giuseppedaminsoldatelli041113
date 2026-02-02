"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PetForm } from "@/components/pet-form"
import { createPet, uploadPetPhoto } from "@/lib/api/pets"

export default function NewPetPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(
    data: { nome: string; raca: string; idade: number },
    file: File | null
  ) {
    setSubmitting(true)
    try {
      const pet = await createPet({
        nome: data.nome,
        raca: data.raca,
        idade: data.idade,
      })

      if (file) {
        await uploadPetPhoto(pet.id, file)
      }

      toast.success("Pet cadastrado com sucesso!")
      router.push(`/pets/${pet.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao cadastrar pet")
    } finally {
      setSubmitting(false)
    }
  }

  return <PetForm onSubmit={handleSubmit} isSubmitting={submitting} />
}
