"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	ArrowLeft,
	User,
	Phone,
	Mail,
	MapPin,
	PawPrint,
	Pencil,
	Plus,
	X,
	Loader2,
	IdCard,
} from "lucide-react";
import { toast } from "sonner";
import type { ApiTutorDetail } from "@/lib/api/types";
import { unlinkPetFromTutor } from "@/lib/api/tutores";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkPetDialog } from "@/components/link-pet-dialog";
import { TruncatedText } from "@/components/ui/truncated-text";

function formatCpf(cpf: string): string {
	const numbers = cpf.replace(/\D/g, "");
	if (numbers.length !== 11) return cpf;
	return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
}

interface TutorDetailProps {
	tutor: ApiTutorDetail;
	onPetLinked?: () => void;
	onPetUnlinked?: () => void;
}

export function TutorDetail({ tutor, onPetLinked, onPetUnlinked }: TutorDetailProps) {
	const pathname = usePathname();
	const backPath = pathname.split("/").slice(0, -1).join("/") || "/";
	const [linkDialogOpen, setLinkDialogOpen] = useState(false);
	const [unlinkingPetId, setUnlinkingPetId] = useState<number | null>(null);

	async function handleUnlinkPet(petId: number) {
		setUnlinkingPetId(petId);
		try {
			await unlinkPetFromTutor(tutor.id, petId);
			toast.success("Pet desvinculado com sucesso!");
			onPetUnlinked?.();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao desvincular pet");
		} finally {
			setUnlinkingPetId(null);
		}
	}

	function handlePetLinked() {
		onPetLinked?.();
	}
	return (
		<div className="mt-8 w-full flex flex-col items-center pb-16 px-4">
			<div className="w-full mb-2 flex items-center justify-between max-w-2xl">
				<Link href={backPath} className="inline-flex items-center p-2 hover:opacity-70 transition-opacity">
					<ArrowLeft className="size-5" />
					<span className="ml-2 cursor-pointer">Voltar</span>
				</Link>
				<Link href={`/tutores/${tutor.id}/edit`}>
					<Button variant="outline" size="sm" className="gap-2">
						<Pencil className="size-4" />
						Editar
					</Button>
				</Link>
			</div>

			<Card className="w-full rounded-xl bg-muted border-0 max-w-2xl">
				<CardContent className="pt-6 flex flex-col md:flex-row gap-6">
					<div className="flex flex-col items-center flex-1 min-w-0 overflow-hidden">
						<Avatar className="size-56 rounded-xl">
							{tutor.foto?.url && <AvatarImage src={tutor.foto.url} alt={tutor.nome} />}
							<AvatarFallback className="rounded-xl bg-background">
								<User className="size-24" />
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col items-center gap-2 mt-4 w-full">
							<TruncatedText text={tutor.nome} className="text-3xl font-bold text-primary max-w-full text-center" />
						</div>

						<Separator className="bg-muted-foreground/15 my-4 w-full" />

						<div className="flex flex-col gap-3 w-full text-sm">
							<div className="flex items-center gap-2">
								<Phone className="size-4 text-muted-foreground" />
								<span>{tutor.telefone}</span>
							</div>
							{tutor.cpf && (
								<div className="flex items-center gap-2">
									<IdCard className="size-4 text-muted-foreground" />
									<span>{formatCpf(String(tutor.cpf))}</span>
								</div>
							)}
							{tutor.email && (
								<div className="flex items-center gap-2">
									<Mail className="size-4 text-muted-foreground flex-shrink-0" />
									<TruncatedText text={tutor.email} className="max-w-[200px]" />
								</div>
							)}
							{tutor.endereco && (
								<div className="flex items-center gap-2">
									<MapPin className="size-4 text-muted-foreground flex-shrink-0" />
									<TruncatedText text={tutor.endereco} className="max-w-[200px]" />
								</div>
							)}
						</div>
					</div>

					<>
						<Separator
							orientation="vertical"
							className="hidden md:block bg-muted-foreground/15 h-auto"
						/>
						<Separator className="md:hidden bg-muted-foreground/15" />
						<div className="w-full md:w-56 md:-mt-2">
							<div className="flex items-center justify-between mb-3">
								<h3 className="text-sm font-medium text-muted-foreground">Pets</h3>
								<Button
									variant="ghost"
									size="sm"
									className="h-7 gap-1 text-xs"
									onClick={() => setLinkDialogOpen(true)}
								>
									<Plus className="size-3" />
									Vincular
								</Button>
							</div>
							<div className="flex flex-col gap-2 max-h-86 overflow-y-auto overflow-x-hidden pr-2 styled-scrollbar">
								{tutor.pets && tutor.pets.length > 0 ? (
									tutor.pets.map((pet) => (
										<div
											key={pet.id}
											className="flex items-center gap-3 py-2 px-3 rounded-xl bg-background group"
										>
											<Link
												href={`/pets/${pet.id}`}
												className="flex items-center gap-3 flex-1 min-w-0"
											>
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
											</Link>
											<button
												onClick={() => handleUnlinkPet(pet.id)}
												disabled={unlinkingPetId !== null}
												className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all disabled:opacity-50"
											>
												{unlinkingPetId === pet.id ? (
													<Loader2 className="size-4 animate-spin text-muted-foreground" />
												) : (
													<X className="size-4 text-destructive" />
												)}
											</button>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground text-sm">
										Nenhum pet vinculado
									</div>
								)}
							</div>
						</div>
					</>
				</CardContent>
			</Card>

			<LinkPetDialog
				tutorId={tutor.id}
				linkedPetIds={tutor.pets?.map((p) => p.id) ?? []}
				open={linkDialogOpen}
				onOpenChange={setLinkDialogOpen}
				onPetLinked={handlePetLinked}
			/>
		</div>
	);
}
