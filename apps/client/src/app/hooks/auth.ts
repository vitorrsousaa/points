import { AuthContext, type AuthContextValue } from "@/contexts/auth";
import { ResetPasswordFn, SignupParams } from "@/entitites/Auth";
import { SentryHandler } from "@/libs/SentryHandler";
import { authService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { MutationOptions } from "../types/useMutation";

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
	const { sendEvent, sendException } = SentryHandler();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.forgotPassword,
		onSuccess(_, variables) {
			sendEvent({
				message: "ForgotPassword",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError(error) {
			sendException({
				exceptionName: "forgot_password",
				...error,
			});
		},
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
	const { sendEvent, sendException } = SentryHandler();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.resetPassword,
		onSuccess(_, variables) {
			sendEvent({
				message: "ResetPassword",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError(error) {
			sendException({
				exceptionName: "reset_password",
				...error,
			});
		},
	});

	return {
		isLoading: isPending,
		resetPassword: mutateAsync,
	};
}

export function useSignup(
	options?: MutationOptions<{ userId: string }, SignupParams>,
) {
	const { sendEvent, sendException } = SentryHandler();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.signup,
		onSuccess(data, variables) {
			sendEvent({
				message: "SignUp",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});

			if (options?.onSuccess) {
				options.onSuccess(data, variables);
			}
		},
		onError(error) {
			sendException({
				exceptionName: "sign_up",
				...error,
			});

			if (options?.onError) {
				options.onError(error || options.errorMessage);
			}
		},
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
	const { sendEvent, sendException } = SentryHandler();

	const { isPending, mutateAsync, isError, error } = useMutation({
		mutationFn: authService.accountConfirmation,
		onSuccess(_, variables) {
			sendEvent({
				message: "AccountConfirmation",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError(error) {
			sendException({
				exceptionName: "account_confirmation",
				...error,
			});
		},
	});

	return {
		isConfirmingAccount: isPending,
		isErrorConfirmingAccount: isError,
		confirmAccount: mutateAsync,
		error,
	};
}

export function useSignin() {
	const { sendEvent, startSession, sendException } = SentryHandler();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: authService.signin,
		onSuccess(_, variables) {
			sendEvent({
				message: "SignIn",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});

			startSession(variables.email);
		},
		onError(error) {
			sendException({
				exceptionName: "sign_in",
				...error,
			});
		},
	});

	return {
		isLoggingAccount: isPending,
		signin: mutateAsync,
	};
}
