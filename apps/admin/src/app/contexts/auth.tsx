import { STORAGE_KEYS } from "@/config/storages";
import { userService } from "@/services/user";
import { PageLoader } from "@/ui/page-loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

import { toast } from "react-hot-toast";

export interface AuthContextValue {
	signedIn: boolean;
	signin: (accessToken: string) => void;
	signout: () => void;
	email?: string;
	name?: string;
	id?: string;
}

export const AuthContext = createContext<AuthContextValue>(
	{} as AuthContextValue,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storageAccessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

		return !!storageAccessToken;
	});

	const queryClient = useQueryClient();

	const { data, isError, isFetching, isSuccess } = useQuery({
		queryKey: ["users", "me"],
		queryFn: async () => userService.profile(),
		enabled: signedIn,
		staleTime: Number.POSITIVE_INFINITY,
	});

	const signin = useCallback((accessToken: string) => {
		localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

		setSignedIn(true);
	}, []);

	const signout = useCallback(() => {
		localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
		queryClient.invalidateQueries({
			queryKey: ["users", "me"],
		});

		setSignedIn(false);
	}, [queryClient]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isError) {
			toast.error("Sua sessão expirou!");

			signout();
		}
	}, [isError]);

	return (
		<AuthContext.Provider
			value={{
				signedIn: isSuccess && signedIn,
				signin,
				signout,
				email: data?.email as string,
				name: data?.name ?? "",
				id: data?.id ?? "",
			}}
		>
			<PageLoader isLoading={isFetching} />
			{!isFetching && children}
		</AuthContext.Provider>
	);
}
