"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TutorForm } from "@/components/tutor-form"
import { createTutor, uploadTutorPhoto } from "@/lib/api/tutores"

export default function NewTutorPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(
    data: { nome: string; telefone: string; cpf: string; email?: string; endereco?: string },
    file: File | null
  ) {
    setSubmitting(true)
    try {
      const tutor = await createTutor({
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        email: data.email || undefined,
        endereco: data.endereco || undefined,
      })

      if (file) {
        await uploadTutorPhoto(tutor.id, file)
      }

      toast.success("Tutor cadastrado com sucesso!")
      router.push(`/tutores/${tutor.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao cadastrar tutor")
    } finally {
      setSubmitting(false)
    }
  }

  return <TutorForm onSubmit={handleSubmit} isSubmitting={submitting} />
}
