"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { PawPrint, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ApiPet } from "@/lib/api/types";
import { getPets } from "@/lib/api/pets";
import { linkPetToTutor } from "@/lib/api/tutores";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SearchInput } from "@/components/search-input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PAGE_SIZE = 10;

interface LinkPetDialogProps {
	tutorId: number;
	linkedPetIds: number[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onPetLinked: () => void;
}

export function LinkPetDialog({
	tutorId,
	linkedPetIds,
	open,
	onOpenChange,
	onPetLinked,
}: LinkPetDialogProps) {
	const [pets, setPets] = useState<ApiPet[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [linking, setLinking] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const fetchPets = useCallback(async (pageNum: number, query: string, reset: boolean) => {
		if (reset) {
			setLoading(true);
		} else {
			setLoadingMore(true);
		}

		try {
			const response = await getPets({
				page: pageNum,
				size: PAGE_SIZE,
				nome: query || undefined,
			});

			if (reset) {
				setPets(response.content);
			} else {
				setPets((prev) => [...prev, ...response.content]);
			}

			setHasMore(pageNum < response.pageCount - 1);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao carregar pets");
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	}, []);

	useEffect(() => {
		if (open) {
			setPets([]);
			setPage(0);
			setHasMore(true);
			setSearchQuery("");
			fetchPets(0, "", true);
		}
	}, [open, fetchPets]);

	useEffect(() => {
		if (!open || loading || loadingMore || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore) {
					const nextPage = page + 1;
					setPage(nextPage);
					fetchPets(nextPage, searchQuery, false);
				}
			},
			{ threshold: 0.1 },
		);

		const sentinel = sentinelRef.current;
		if (sentinel) {
			observer.observe(sentinel);
		}

		return () => {
			if (sentinel) {
				observer.unobserve(sentinel);
			}
		};
	}, [open, loading, loadingMore, hasMore, page, searchQuery, fetchPets]);

	function handleSearchChange(value: string) {
		setSearchQuery(value);
		setPets([]);
		setPage(0);
		setHasMore(true);
		fetchPets(0, value, true);
	}

	const availablePets = useMemo(() => {
		return pets.filter((pet) => !linkedPetIds.includes(pet.id));
	}, [pets, linkedPetIds]);

	async function handleSelectPet(petId: number) {
		setLinking(petId);
		try {
			await linkPetToTutor(tutorId, petId);
			toast.success("Pet vinculado com sucesso!");
			onPetLinked();
			onOpenChange(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao vincular pet");
		} finally {
			setLinking(null);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-muted border-0">
				<DialogHeader>
					<DialogTitle>Vincular Pet</DialogTitle>
				</DialogHeader>

				<SearchInput
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder="Buscar pet..."
				/>

				<div className="max-h-64 overflow-y-auto overflow-x-hidden space-y-2 pr-2 styled-scrollbar">
					{loading ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : availablePets.length === 0 && !loadingMore ? (
						<div className="text-center py-8 text-muted-foreground text-sm">
							{searchQuery ? "Nenhum pet encontrado" : "Nenhum pet disponível"}
						</div>
					) : (
						<>
							{availablePets.map((pet) => (
								<button
									key={pet.id}
									onClick={() => handleSelectPet(pet.id)}
									disabled={linking !== null}
									className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors disabled:opacity-50"
								>
									<Avatar className="size-10 rounded-lg">
										{pet.foto?.url && <AvatarImage src={pet.foto.url} alt={pet.nome} />}
										<AvatarFallback className="rounded-lg">
											<PawPrint className="size-4" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col items-start min-w-0">
										<span className="font-medium text-sm leading-none truncate">{pet.nome}</span>
										<span className="text-xs text-muted-foreground truncate">
											{pet.raca || `${pet.idade} ${pet.idade === 1 ? "ano" : "anos"}`}
										</span>
									</div>
									{linking === pet.id && <Loader2 className="size-4 animate-spin ml-auto" />}
								</button>
							))}
							{hasMore && (
								<div ref={sentinelRef} className="flex justify-center py-2">
									{loadingMore && <Loader2 className="size-5 animate-spin text-muted-foreground" />}
								</div>
							)}
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
