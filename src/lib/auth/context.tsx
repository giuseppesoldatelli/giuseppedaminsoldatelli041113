"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User, AuthContextValue } from "./types";
import { loginApi, logoutApi, initializeAuth } from "@/lib/api/auth";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		initializeAuth()
			.then(setUser)
			.finally(() => setIsLoading(false));
	}, []);

	const login = useCallback(async (username: string, password: string) => {
		const loggedUser = await loginApi(username, password);
		setUser(loggedUser);
	}, []);

	const logout = useCallback(() => {
		logoutApi();
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}
