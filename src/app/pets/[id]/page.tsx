"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { getPetById } from "@/lib/api/pets"
import type { ApiPet } from "@/lib/api/types"
import { PetDetail } from "@/components/pet-detail"

interface PetPageProps {
  params: Promise<{ id: string }>
}

export default function PetPage({ params }: PetPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [pet, setPet] = useState<ApiPet | null>(null)
  const [loading, setLoading] = useState(true)
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

  return <PetDetail pet={pet} />
}
