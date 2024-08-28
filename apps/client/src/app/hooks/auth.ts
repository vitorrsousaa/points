import { AuthContext, type AuthContextValue } from "@/contexts/auth";
import { authService } from "@/services/auth";
import type { ResetPasswordFn } from "@/services/auth/reset-password";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import type { AppError } from "../errors/app-error";
import type { AccountConfirmationParams } from "@/services/auth/account-confirmation";

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

export function useResendCode() {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.resendCode,
	});

	return {
		isResendingCode: isPending,
		resendCode: mutateAsync,
	};
}

export function useAccountConfirmation() {
	const { isPending, mutateAsync, isError, error } = useMutation<
		void,
		AppError,
		AccountConfirmationParams
	>({
		mutationFn: authService.accountConfirmation,
	});

	return {
		isConfirmingAccount: isPending,
		isErrorConfirmingAccount: isError,
		confirmAccount: mutateAsync,
		error,
	};
}

export function useSignin() {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.signin,
	});

	return {
		isLoggingAccount: isPending,
		signin: mutateAsync,
	};
}
