import type { Pet } from "@/data/pets"
import { especieEmoji } from "@/data/pets"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Phone } from "lucide-react"

interface PetDetailDialogProps {
  pet: Pet | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PetDetailDialog({ pet, open, onOpenChange }: PetDetailDialogProps) {
  if (!pet) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl bg-muted border-0 sm:max-w-sm">
        <DialogHeader className="sr-only">
          <DialogTitle>Detalhes de {pet.nome}</DialogTitle>
          <DialogDescription>Detalhes de {pet.nome}</DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-4">
          <Avatar className="size-28 rounded-xl shrink-0">
            {pet.foto && <AvatarImage src={pet.foto} alt={pet.nome} />}
            <AvatarFallback className="rounded-xl text-5xl bg-background">
              {especieEmoji[pet.especie]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary">{pet.nome}</span>
            <Badge variant="secondary" className="w-fit">{pet.especie}</Badge>
            <span className="text-sm text-muted-foreground">
              {pet.idade} {pet.unidadeIdade}
            </span>
          </div>
        </div>

        {pet.tutor && (
          <>
            <Separator className="bg-muted-foreground/15" />
            <div className="flex items-center justify-around text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span>{pet.tutor.nome}</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <span>{pet.tutor.contato}</span>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
