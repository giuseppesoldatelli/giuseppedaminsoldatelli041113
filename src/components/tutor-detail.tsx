"use client";

import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import type { ApiTutorDetail } from "@/lib/api/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface TutorDetailProps {
	tutor: ApiTutorDetail;
}

export function TutorDetail({ tutor }: TutorDetailProps) {
	return (
		<div className="mt-8 w-full flex flex-col items-center pb-16 px-4">
			<div
				className={`w-full mb-2 flex items-center justify-between ${tutor.pets?.length ? "max-w-2xl" : "max-w-md"}`}
			>
				<Link href="/" className="inline-flex items-center p-2 hover:opacity-70 transition-opacity">
					<ArrowLeft className="size-5" />
					<span className="ml-2 cursor-pointer">Voltar</span>
				</Link>
			</div>

			<Card
				className={`w-full rounded-xl bg-muted border-0 ${tutor.pets?.length ? "max-w-2xl" : "max-w-md"}`}
			>
				<CardContent className="pt-6 flex flex-col md:flex-row gap-6">
					<div className="flex flex-col items-center flex-1">
						<Avatar className="size-56 rounded-xl">
							{tutor.foto?.url && <AvatarImage src={tutor.foto.url} alt={tutor.nome} />}
							<AvatarFallback className="rounded-xl bg-background">
								<User className="size-24" />
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col items-center gap-2 mt-4">
							<span className="text-3xl font-bold text-primary">{tutor.nome}</span>
						</div>

						<Separator className="bg-muted-foreground/15 my-4 w-full" />

						<div className="flex flex-col gap-3 w-full text-sm">
							<div className="flex items-center gap-2">
								<Phone className="size-4 text-muted-foreground" />
								<span>{tutor.telefone}</span>
							</div>
							{tutor.email && (
								<div className="flex items-center gap-2">
									<Mail className="size-4 text-muted-foreground" />
									<span>{tutor.email}</span>
								</div>
							)}
							{tutor.endereco && (
								<div className="flex items-center gap-2">
									<MapPin className="size-4 text-muted-foreground" />
									<span>{tutor.endereco}</span>
								</div>
							)}
						</div>
					</div>

					{tutor.pets && tutor.pets.length > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="hidden md:block bg-muted-foreground/15 h-auto"
							/>
							<Separator className="md:hidden bg-muted-foreground/15" />
							<div className="w-full md:w-56 md:-mt-2">
								<h3 className="text-sm font-medium text-muted-foreground mb-3">Pets</h3>
								<div className="flex flex-col gap-2 max-h-80 overflow-y-auto overflow-x-hidden styled-scrollbar pr-2">
									{tutor.pets.map((pet) => (
										<Link key={pet.id} href={`/pets/${pet.id}`}>
											<div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-background hover:scale-[1.02] transition-transform cursor-pointer">
												<Avatar className="size-10 rounded-lg">
													{pet.foto?.url && <AvatarImage src={pet.foto.url} alt={pet.nome} />}
													<AvatarFallback className="rounded-lg">
														<PawPrint className="size-4" />
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col min-w-0">
													<span className="font-medium text-sm leading-none truncate">
														{pet.nome}
													</span>
													<span className="text-xs text-muted-foreground truncate">
														{pet.raca || `${pet.idade} ${pet.idade === 1 ? "ano" : "anos"}`}
													</span>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
