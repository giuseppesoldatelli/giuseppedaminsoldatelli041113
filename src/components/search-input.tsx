"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Buscar...",
	className,
}: SearchInputProps) {
	return (
		<div
			className={cn(
				"relative flex-1 rounded-xl shadow-lg bg-card dark:bg-card",
				className,
			)}
		>
			<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground z-10" />
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="rounded-xl border-0 bg-transparent shadow-none pl-11 h-12 hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
		</div>
	);
}
