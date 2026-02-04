"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Upload, User } from "lucide-react";
import type { ApiTutorDetail } from "@/lib/api/types";
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

function maskPhone(value: string): string {
	const numbers = value.replace(/\D/g, "").slice(0, 11);
	if (numbers.length <= 2) return numbers;
	if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
	return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

function maskCpf(value: string): string {
	const numbers = value.replace(/\D/g, "").slice(0, 11);
	if (numbers.length <= 3) return numbers;
	if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
	if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
	return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
}

const tutorSchema = z.object({
	nome: z.string().min(1, "Nome obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
	telefone: z.string()
		.min(1, "Telefone obrigatório")
		.regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido (use formato (00) 00000-0000)"),
	cpf: z.string()
		.min(1, "CPF obrigatório")
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (use formato 000.000.000-00)"),
	email: z.string()
		.email("Email inválido")
		.max(100, "Email deve ter no máximo 100 caracteres")
		.optional()
		.or(z.literal("")),
	endereco: z.string().max(200, "Endereço deve ter no máximo 200 caracteres").optional().or(z.literal("")),
});

type TutorFormData = z.infer<typeof tutorSchema>;

interface TutorFormProps {
	tutor?: ApiTutorDetail;
	onSubmit: (data: TutorFormData, file: File | null) => void;
	isSubmitting?: boolean;
}

export function TutorForm({ tutor, onSubmit, isSubmitting }: TutorFormProps) {
	const [fotoPreview, setFotoPreview] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const form = useForm<TutorFormData>({
		resolver: zodResolver(tutorSchema) as never,
		defaultValues: {
			nome: "",
			telefone: "",
			cpf: "",
			email: "",
			endereco: "",
		},
	});

	useEffect(() => {
		if (tutor) {
			form.reset({
				nome: tutor.nome ?? "",
				telefone: tutor.telefone ? maskPhone(String(tutor.telefone)) : "",
				cpf: tutor.cpf ? maskCpf(String(tutor.cpf)) : "",
				email: tutor.email ?? "",
				endereco: tutor.endereco ?? "",
			});
			setFotoPreview(tutor.foto?.url ?? null);
		}
	}, [tutor, form]);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setFotoPreview(url);
			setSelectedFile(file);
		}
	}

	function handleFormSubmit(data: TutorFormData) {
		const submitData = {
			...data,
			cpf: data.cpf.replace(/\D/g, ""),
		};
		onSubmit(submitData, selectedFile);
	}

	return (
		<div className="mt-8 w-full flex flex-col items-center pb-16 px-4">
			<div className="w-full max-w-md mb-2">
				<Link
					href={tutor ? `/tutores/${tutor.id}` : "/"}
					className="inline-flex items-center p-2 hover:opacity-70 transition-opacity"
				>
					<ArrowLeft className="size-5" />
					<span className="ml-2 cursor-pointer">Voltar</span>
				</Link>
			</div>

			<Card className="w-full max-w-md rounded-xl border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="text-center">{tutor ? "Editar Tutor" : "Novo Tutor"}</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
							<div className="flex flex-col items-center gap-4">
								<Avatar className="size-32 rounded-xl">
									{fotoPreview && <AvatarImage src={fotoPreview} alt="Preview" />}
									<AvatarFallback className="rounded-xl text-5xl bg-muted">
										<User className="size-12" />
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
											<Input placeholder="Nome do tutor" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="telefone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone</FormLabel>
										<FormControl>
											<Input
												placeholder="(00) 00000-0000"
												{...field}
												onChange={(e) => field.onChange(maskPhone(e.target.value))}
												maxLength={15}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CPF</FormLabel>
										<FormControl>
											<Input
												placeholder="000.000.000-00"
												{...field}
												onChange={(e) => field.onChange(maskCpf(e.target.value))}
												maxLength={14}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email (opcional)</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="email@exemplo.com"
												{...field}
												maxLength={100}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="endereco"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Endereço (opcional)</FormLabel>
										<FormControl>
											<Input placeholder="Rua, número, bairro, cidade" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Salvando..." : tutor ? "Salvar alterações" : "Cadastrar tutor"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
