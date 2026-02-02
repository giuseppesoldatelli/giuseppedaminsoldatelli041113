"use client";

import Link from "next/link";
import { ArrowLeft, User, Phone, Pencil, PawPrint } from "lucide-react";
import type { ApiPet } from "@/lib/api/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TruncatedText } from "@/components/ui/truncated-text";

interface PetDetailProps {
	pet: ApiPet;
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
						{pet.foto?.url && <AvatarImage src={pet.foto.url} alt={pet.nome} />}
						<AvatarFallback className="rounded-xl bg-background">
							<PawPrint className="size-24" />
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-center gap-2 mt-4 w-full">
						<TruncatedText
							text={pet.nome}
							className="text-3xl font-bold text-primary max-w-full text-center"
						/>
						{pet.raca && (
							<TruncatedText text={pet.raca} as="badge" className="max-w-full" />
						)}
						<span className="text-sm text-muted-foreground">
							{pet.idade} {pet.idade === 1 ? "ano" : "anos"}
						</span>
					</div>

					{pet.tutores && pet.tutores.length > 0 && (
						<>
							<Separator className="bg-muted-foreground/15 my-4 w-full" />
							<Link
								href={`/tutores/${pet.tutores[pet.tutores.length - 1].id}`}
								className="flex items-center justify-around text-sm w-full hover:opacity-70 transition-opacity"
							>
								<div className="flex items-center gap-2">
									<User className="size-4 text-muted-foreground" />
									<span>{pet.tutores[pet.tutores.length - 1].nome}</span>
								</div>
								<span className="text-muted-foreground">·</span>
								<div className="flex items-center gap-2">
									<Phone className="size-4 text-muted-foreground" />
									<span>{pet.tutores[pet.tutores.length - 1].telefone}</span>
								</div>
							</Link>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
