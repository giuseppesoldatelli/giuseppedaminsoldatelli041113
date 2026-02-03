"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface LoginPopoverContextValue {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	openLoginPopover: () => void;
}

const LoginPopoverContext = createContext<LoginPopoverContextValue | null>(null);

export function LoginPopoverProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const openLoginPopover = () => setIsOpen(true);

	return (
		<LoginPopoverContext.Provider value={{ isOpen, setIsOpen, openLoginPopover }}>
			{children}
		</LoginPopoverContext.Provider>
	);
}

export function useLoginPopover() {
	const context = useContext(LoginPopoverContext);
	if (!context) {
		throw new Error("useLoginPopover deve ser usado dentro de um LoginPopoverProvider");
	}
	return context;
}
