import { notFound } from "next/navigation"
import { pets } from "@/data/pets"
import { PetDetail } from "@/components/pet-detail"

interface PetPageProps {
  params: Promise<{ id: string }>
}

export default async function PetPage({ params }: PetPageProps) {
  const { id } = await params
  const pet = pets.find((p) => p.id === Number(id))

  if (!pet) {
    notFound()
  }

  return <PetDetail pet={pet} />
}
