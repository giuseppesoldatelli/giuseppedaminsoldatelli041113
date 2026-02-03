"use client";

import { PawPrint, Search, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLoginPopover } from "@/lib/auth/login-popover-context";

const features = [
	{
		icon: PawPrint,
		title: "Cadastro de Pets",
		description: "Registre seus pets com informações detalhadas como nome, espécie, raça e foto.",
	},
	{
		icon: Search,
		title: "Consulta Fácil",
		description: "Busque e visualize pets cadastrados com filtros e paginação intuitiva.",
	},
	{
		icon: Code2,
		title: "API Pública",
		description: "Integre com nossa API REST para acessar dados de pets em suas aplicações.",
	},
];

export function LandingPage() {
	const { openLoginPopover } = useLoginPopover();

	return (
		<div className="flex flex-col items-center gap-10 py-12">
			<section className="flex flex-col items-center gap-6 text-center max-w-2xl">
				<Badge variant="secondary">Gerenciamento de Pets</Badge>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Cadastre e gerencie seus pets em um só lugar
				</h1>
				<p className="text-lg text-muted-foreground">
					Plataforma completa para cadastro, consulta e gerenciamento de pets. Faça login para
					acessar todas as funcionalidades.
				</p>
				<Button size="lg" onClick={openLoginPopover}>
					Começar agora
					<ArrowRight />
				</Button>
			</section>

			<section className="w-full max-w-4xl">
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader>
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
									<feature.icon className="size-5" />
								</div>
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
