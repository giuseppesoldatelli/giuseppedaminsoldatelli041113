"use client";

import Link from "next/link";
import { ArrowLeft, User, Phone, Pencil } from "lucide-react";
import type { Pet } from "@/data/pets";
import { especieEmoji } from "@/data/pets";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PetDetailProps {
	pet: Pet;
}

export function PetDetail({ pet }: PetDetailProps) {
	return (
		<div className="mt-8 w-full flex flex-col items-center pb-16 px-4">
			<div className="w-full max-w-md mb-2 flex items-center justify-between">
				<Link href="/" className="inline-flex items-center p-2 hover:opacity-70 transition-opacity">
					<ArrowLeft className="size-5" />
					<span className="ml-2 cursor-pointer">Voltar</span>
				</Link>
				<Link href={`/pets/${pet.id}/edit`}>
					<Button
						variant="ghost"
						size="sm"
						className="gap-2 border-0 hover:bg-transparent cursor-pointer"
					>
						<Pencil className="size-4" />
						Editar
					</Button>
				</Link>
			</div>

			<Card className="w-full max-w-md rounded-xl bg-muted border-0">
				<CardContent className="pt-6 flex flex-col items-center">
					<Avatar className="size-56 rounded-xl">
						{pet.foto && <AvatarImage src={pet.foto} alt={pet.nome} />}
						<AvatarFallback className="rounded-xl text-8xl bg-background">
							{especieEmoji[pet.especie]}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-center gap-2 mt-4">
						<span className="text-3xl font-bold text-primary">{pet.nome}</span>
						<div className="flex items-center gap-2">
							<Badge variant="secondary">{pet.especie}</Badge>
							{pet.raca && <Badge variant="outline">{pet.raca}</Badge>}
						</div>
						<span className="text-sm text-muted-foreground">
							{pet.idade} {pet.unidadeIdade}
						</span>
					</div>

					{pet.tutor && (
						<>
							<Separator className="bg-muted-foreground/15 my-4 w-full" />
							<div className="flex items-center justify-around text-sm w-full">
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
				</CardContent>
			</Card>
		</div>
	);
}
