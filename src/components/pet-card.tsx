"use client"

import Link from "next/link"
import { PawPrint } from "lucide-react"
import type { ApiPet } from "@/lib/api/types"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TruncatedText } from "@/components/ui/truncated-text"

interface PetCardProps {
  pet: ApiPet
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/pets/${pet.id}`}>
      <Card className="rounded-xl shadow-lg border-0 hover:scale-[1.02] transition-transform cursor-pointer">
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl">
            {pet.foto?.url && <AvatarImage src={pet.foto.url} alt={pet.nome} />}
            <AvatarFallback className="rounded-xl">
              <PawPrint className="size-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <TruncatedText
              text={pet.nome}
              className="font-semibold max-w-[120px]"
            />
            <span className="text-sm text-muted-foreground">
              {pet.idade} {pet.idade === 1 ? "ano" : "anos"}
            </span>
            {pet.raca && (
              <TruncatedText text={pet.raca} as="badge" className="max-w-[100px]" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
