import type { Pet } from "@/data/pets"
import { especieEmoji } from "@/data/pets"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PetCardProps {
  pet: Pet
  onClick?: () => void
}

export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <Card
      className="rounded-xl shadow-lg border-0 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4">
        <Avatar className="size-16 rounded-xl">
          {pet.foto && <AvatarImage src={pet.foto} alt={pet.nome} />}
          <AvatarFallback className="rounded-xl text-2xl">
            {especieEmoji[pet.especie]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="font-semibold leading-none">{pet.nome}</span>
          <span className="text-sm text-muted-foreground">
            {pet.idade} {pet.unidadeIdade}
          </span>
          <Badge variant="secondary">{pet.especie}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
