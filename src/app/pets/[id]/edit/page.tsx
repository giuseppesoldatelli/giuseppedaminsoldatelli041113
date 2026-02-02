"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getPetById, updatePet } from "@/lib/api/pets"
import type { ApiPet } from "@/lib/api/types"
import { PetForm } from "@/components/pet-form"

interface EditPetPageProps {
  params: Promise<{ id: string }>
}

export default function EditPetPage({ params }: EditPetPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [pet, setPet] = useState<ApiPet | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPet() {
      try {
        const data = await getPetById(Number(id))
        setPet(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar pet")
      } finally {
        setLoading(false)
      }
    }
    fetchPet()
  }, [id])

  async function handleSubmit(
    data: {
      nome: string
      raca: string
      idade: number
    },
  ) {
    if (!pet) return

    setSubmitting(true)
    try {
      await updatePet(pet.id, {
        nome: data.nome,
        raca: data.raca,
        idade: data.idade,
      })
      toast.success("Pet atualizado com sucesso!")
      router.push(`/pets/${pet.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar pet")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
        <Loader2 className="size-12 mb-4 animate-spin" />
        <p className="text-lg font-medium">Carregando...</p>
      </div>
    )
  }

  if (error || !pet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-destructive">
        <p className="text-lg font-medium">Pet não encontrado</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-sm underline hover:no-underline"
        >
          Voltar para a lista
        </button>
      </div>
    )
  }

  return <PetForm pet={pet} onSubmit={handleSubmit} isSubmitting={submitting} />
}
