import { AuthContext, type AuthContextValue } from "@/contexts/auth";
import { authService } from "@/services/auth";
import type { ResetPasswordFn } from "@/services/auth/reset-password";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export function useAuth(): AuthContextValue {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return authContext;
}

export function useForgotPassword(): {
	isLoading: boolean;
	forgotPassword: (params: { email: string }) => Promise<void>;
} {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.forgotPassword,
	});

	return {
		isLoading: isPending,
		forgotPassword: mutateAsync,
	};
}

export function useResetPassword(): {
	isLoading: boolean;
	resetPassword: ResetPasswordFn;
} {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.resetPassword,
	});

	return {
		isLoading: isPending,
		resetPassword: mutateAsync,
	};
}

export function useSignup() {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.signup,
	});

	return {
		isCreatingAccount: isPending,
		signup: mutateAsync,
	};
}
