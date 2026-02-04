"use client"

import { use, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { getTutorById } from "@/lib/api/tutores"
import type { ApiTutorDetail } from "@/lib/api/types"
import { TutorDetail } from "@/components/tutor-detail"

interface TutorPageProps {
	params: Promise<{ id: string }>
}

export default function TutorPage({ params }: TutorPageProps) {
	const { id } = use(params)
	const router = useRouter()
	const [tutor, setTutor] = useState<ApiTutorDetail | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchTutor = useCallback(async () => {
		try {
			const data = await getTutorById(Number(id))
			setTutor(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao carregar tutor")
		} finally {
			setLoading(false)
		}
	}, [id])

	useEffect(() => {
		fetchTutor()
	}, [fetchTutor])

	function handleRefresh() {
		fetchTutor()
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

	return <TutorDetail tutor={tutor} onPetLinked={handleRefresh} onPetUnlinked={handleRefresh} />
}
