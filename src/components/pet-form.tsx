"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import type { Pet } from "@/data/pets";
import { especies, unidadesIdade, especieEmoji } from "@/data/pets";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const petSchema = z.object({
	nome: z.string().min(1, "Nome obrigatório"),
	especie: z.enum(["Cachorro", "Gato", "Pássaro", "Coelho", "Hamster", "Tartaruga"], {
		message: "Selecione uma espécie",
	}),
	idade: z.number().min(1, "Idade inválida"),
	unidadeIdade: z.enum(["ano", "anos", "mes", "meses"], {
		message: "Selecione a unidade",
	}),
	raca: z.string().optional(),
});

type PetFormData = z.infer<typeof petSchema>;

interface PetFormProps {
	pet?: Pet;
	onSubmit: (data: PetFormData, fotoUrl: string | null) => void;
}

export function PetForm({ pet, onSubmit }: PetFormProps) {
	const [fotoPreview, setFotoPreview] = useState<string | null>(pet?.foto ?? null);

	const form = useForm<PetFormData>({
		resolver: zodResolver(petSchema) as never,
		defaultValues: {
			nome: pet?.nome ?? "",
			especie: pet?.especie,
			idade: pet?.idade ?? 0,
			unidadeIdade: pet?.unidadeIdade ?? "anos",
			raca: pet?.raca ?? "",
		},
	});

	const especieSelecionada = form.watch("especie");

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setFotoPreview(url);
		}
	}

	function handleFormSubmit(data: PetFormData) {
		onSubmit(data, fotoPreview);
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
										{especieSelecionada ? especieEmoji[especieSelecionada] : "?"}
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
								name="especie"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Espécie</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione a espécie" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{especies.map((especie) => (
													<SelectItem key={especie} value={especie}>
														{especieEmoji[especie]} {especie}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="raca"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Raça (opcional)</FormLabel>
										<FormControl>
											<Input placeholder="Raça do pet" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-2 gap-4 items-start">
								<FormField
									control={form.control}
									name="idade"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Idade</FormLabel>
											<FormControl>
												<Input
													type="number"
													min={0}
													placeholder="0"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="unidadeIdade"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Unidade</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Unidade" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{unidadesIdade.map((unidade) => (
														<SelectItem key={unidade} value={unidade}>
															{unidade}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button type="submit" className="w-full">
								{pet ? "Salvar alterações" : "Cadastrar pet"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
