"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChevronDown, Eye, EyeOff, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/lib/auth/context";
import { loginSchema, type LoginFormData } from "@/lib/auth/schemas";

export function Header() {
	const { user, isAuthenticated, isLoading, login, logout } = useAuth();
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showRegisterPassword, setShowRegisterPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema) as never,
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormData) {
		setLoginError(null);
		setIsSubmitting(true);
		try {
			await login(data.username, data.password);
			setOpen(false);
			form.reset();
			toast.success("Login realizado com sucesso!");
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
			setLoginError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	}

	function handleLogout() {
		logout();
		setOpen(false);
		toast.success("Logout realizado com sucesso!");
	}

	if (isLoading) {
		return (
			<header className="fixed top-0 left-0 right-0 flex justify-end p-4 z-50">
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button
						variant="outline"
						disabled
						className="text-xs sm:text-sm text-muted-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-border font-medium bg-card shadow-sm dark:bg-card/90"
					>
						Carregando...
					</Button>
				</div>
			</header>
		);
	}

	if (isAuthenticated && user) {
		return (
			<header className="fixed top-0 left-0 right-0 flex justify-end p-4 z-50">
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<div className="flex items-center gap-3 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border font-medium bg-card shadow-sm dark:bg-card/90">
						<span className="text-foreground">{user.username}</span>
						<div className="h-4 w-px bg-border" />
						<Button
							variant="ghost"
							size="sm"
							className="h-auto p-1 text-muted-foreground hover:text-destructive hover:bg-transparent"
							onClick={handleLogout}
						>
							<LogOut className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</header>
		);
	}

	return (
		<header className="fixed top-0 left-0 right-0 flex justify-end p-4 z-50">
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="text-xs sm:text-sm text-muted-foreground hover:text-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-border hover:border-primary/50 font-medium bg-card shadow-sm dark:bg-card/90 dark:text-foreground dark:border-border/60"
						>
							Entrar
							<ChevronDown
								className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
								strokeWidth={1.5}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="rounded-xl shadow-lg border-0 p-6 w-80">
						<Tabs defaultValue="login" className="w-full">
							<TabsList className="w-full mb-4">
								<TabsTrigger value="login" className="flex-1">
									Entrar
								</TabsTrigger>
								<TabsTrigger value="register" className="flex-1">
									Cadastrar
								</TabsTrigger>
							</TabsList>

							<TabsContent value="login">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Usuário</FormLabel>
													<FormControl>
														<Input
															placeholder="seu_usuario"
															className="focus-visible:ring-primary"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Senha</FormLabel>
													<FormControl>
														<div className="relative">
															<Input
																type={showPassword ? "text" : "password"}
																placeholder="••••••••"
																className="focus-visible:ring-primary pr-10"
																{...field}
															/>
															<button
																type="button"
																onClick={() => setShowPassword(!showPassword)}
																className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
															>
																{showPassword ? (
																	<EyeOff className="h-4 w-4" />
																) : (
																	<Eye className="h-4 w-4" />
																)}
															</button>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{loginError && <p className="text-sm text-destructive">{loginError}</p>}
										<Button
											type="submit"
											disabled={isSubmitting}
											className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
										>
											{isSubmitting ? "Entrando..." : "Entrar"}
										</Button>
									</form>
								</Form>
							</TabsContent>

							<TabsContent value="register">
								<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
									<div className="space-y-2">
										<label htmlFor="register-email" className="text-sm font-medium">
											Email
										</label>
										<Input
											id="register-email"
											type="email"
											placeholder="seu@email.com"
											className="focus-visible:ring-primary"
										/>
									</div>
									<div className="space-y-2">
										<label htmlFor="register-password" className="text-sm font-medium">
											Senha
										</label>
										<div className="relative">
											<Input
												id="register-password"
												type={showRegisterPassword ? "text" : "password"}
												placeholder="••••••••"
												className="focus-visible:ring-primary pr-10"
											/>
											<button
												type="button"
												onClick={() => setShowRegisterPassword(!showRegisterPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
											>
												{showRegisterPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</button>
										</div>
									</div>
									<div className="space-y-2">
										<label htmlFor="confirm-password" className="text-sm font-medium">
											Confirmar Senha
										</label>
										<div className="relative">
											<Input
												id="confirm-password"
												type={showConfirmPassword ? "text" : "password"}
												placeholder="••••••••"
												className="focus-visible:ring-primary pr-10"
											/>
											<button
												type="button"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
											>
												{showConfirmPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</button>
										</div>
									</div>
									<Button
										type="submit"
										className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
									>
										Cadastrar
									</Button>
								</form>
							</TabsContent>
						</Tabs>
					</PopoverContent>
				</Popover>
			</div>
		</header>
	);
}
