"use client"

import Link from "next/link"
import { User, Phone } from "lucide-react"
import type { ApiTutor } from "@/lib/api/types"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TruncatedText } from "@/components/ui/truncated-text"

interface TutorCardProps {
  tutor: ApiTutor
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Link href={`/tutores/${tutor.id}`}>
      <Card className="rounded-xl shadow-lg border-0 hover:scale-[1.02] transition-transform cursor-pointer">
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl">
            {tutor.foto?.url && <AvatarImage src={tutor.foto.url} alt={tutor.nome} />}
            <AvatarFallback className="rounded-xl">
              <User className="size-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <TruncatedText
              text={tutor.nome}
              className="font-semibold max-w-[120px]"
            />
            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
              <Phone className="size-3 shrink-0" />
              <span>{tutor.telefone}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
