"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Upload, PawPrint } from "lucide-react";
import type { ApiPet } from "@/lib/api/types";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const petSchema = z.object({
	nome: z.string().min(1, "Nome obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
	raca: z.string().min(1, "Espécie/raça obrigatória").max(100, "Raça deve ter no máximo 100 caracteres"),
	idade: z.number().min(1, "Idade inválida").max(999, "Idade deve ter no máximo 999 anos"),
});

type PetFormData = z.infer<typeof petSchema>;

interface PetFormProps {
	pet?: ApiPet;
	onSubmit: (data: PetFormData, file: File | null) => void;
	isSubmitting?: boolean;
}

export function PetForm({ pet, onSubmit, isSubmitting }: PetFormProps) {
	const [fotoPreview, setFotoPreview] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const form = useForm<PetFormData>({
		resolver: zodResolver(petSchema) as never,
		defaultValues: {
			nome: "",
			raca: "",
			idade: 0,
		},
	});

	useEffect(() => {
		if (pet) {
			form.reset({
				nome: pet.nome ?? "",
				raca: pet.raca ?? "",
				idade: pet.idade ?? 0,
			});
			setFotoPreview(pet.foto?.url ?? null);
		}
	}, [pet, form]);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setFotoPreview(url);
			setSelectedFile(file);
		}
	}

	function handleFormSubmit(data: PetFormData) {
		onSubmit(data, selectedFile);
	}

	return (
		<div className="mt-8 w-full flex flex-col items-center pb-16 px-4">
			<div className="w-full max-w-md mb-2">
				<Link
					href={pet ? `/pets/${pet.id}` : "/"}
					className="inline-flex items-center p-2 hover:opacity-70 transition-opacity"
				>
					<ArrowLeft className="size-5" />
					<span className="ml-2 cursor-pointer">Voltar</span>
				</Link>
			</div>

			<Card className="w-full max-w-md rounded-xl border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-center">{pet ? "Editar Pet" : "Novo Pet"}</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
							<div className="flex flex-col items-center gap-4">
								<Avatar className="size-32 rounded-xl">
									{fotoPreview && <AvatarImage src={fotoPreview} alt="Preview" />}
									<AvatarFallback className="rounded-xl text-5xl bg-muted">
										<PawPrint className="size-12" />
									</AvatarFallback>
								</Avatar>
								<label className="cursor-pointer">
									<input
										type="file"
										accept="image/*"
										onChange={handleFileChange}
										className="hidden"
									/>
									<div className="flex items-center gap-2 text-sm text-primary hover:underline">
										<Upload className="size-4" />
										{fotoPreview ? "Alterar foto" : "Adicionar foto"}
									</div>
								</label>
							</div>

							<FormField
								control={form.control}
								name="nome"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input placeholder="Nome do pet" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="raca"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Espécie/raça</FormLabel>
										<FormControl>
											<Input placeholder="Ex: Labrador Retriever, Gato Persa..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="idade"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Idade (anos)</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={0}
												max={999}
												placeholder="0"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Salvando..." : pet ? "Salvar alterações" : "Cadastrar pet"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
