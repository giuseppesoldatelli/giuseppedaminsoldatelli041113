"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getTutorById, updateTutor, uploadTutorPhoto } from "@/lib/api/tutores"
import type { ApiTutorDetail } from "@/lib/api/types"
import { TutorForm } from "@/components/tutor-form"

interface EditTutorPageProps {
  params: Promise<{ id: string }>
}

export default function EditTutorPage({ params }: EditTutorPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [tutor, setTutor] = useState<ApiTutorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTutor() {
      try {
        const data = await getTutorById(Number(id))
        setTutor(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar tutor")
      } finally {
        setLoading(false)
      }
    }
    fetchTutor()
  }, [id])

  async function handleSubmit(
    data: { nome: string; telefone: string; cpf: string; email?: string; endereco?: string },
    file: File | null
  ) {
    if (!tutor) return

    setSubmitting(true)
    try {
      await updateTutor(tutor.id, {
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        email: data.email || undefined,
        endereco: data.endereco || undefined,
      })

      if (file) {
        await uploadTutorPhoto(tutor.id, file)
      }

      toast.success("Tutor atualizado com sucesso!")
      router.push(`/tutores/${tutor.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar tutor")
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

  if (error || !tutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-destructive">
        <p className="text-lg font-medium">Tutor não encontrado</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-sm underline hover:no-underline"
        >
          Voltar para a lista
        </button>
      </div>
    )
  }

  return <TutorForm tutor={tutor} onSubmit={handleSubmit} isSubmitting={submitting} />
}
