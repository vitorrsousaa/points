import { useAccountConfirmation, useResendCode } from "@/hooks/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Spinner,
} from "@shared/ui";
import toast from "react-hot-toast";
import { ROUTES } from "@/config/routes";

export function VerificationCodeScreen() {
	const location = useLocation();

	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);

	const email = queryParams.get("email");
	const code = queryParams.get("code");

	const {
		confirmAccount,
		isConfirmingAccount,
		error,
		isErrorConfirmingAccount,
	} = useAccountConfirmation();

	const { resendCode, isResendingCode } = useResendCode();

	useEffect(() => {
		if (email && code) {
			const confirm = async () => {
				try {
					await toast.promise(confirmAccount({ email, code }), {
						success: () => {
							navigate(ROUTES.SIGNIN);
							return "Conta confirmada com sucesso";
						},
						error: (error) => {
							if (error.statusCode === 422) return "E-mail inválido";
							if (error.statusCode === 400) return "Código expirado";
							return "Erro ao confirmar conta";
						},
						loading: "Confirmando conta",
					});
				} catch (err) {
					// Tratamento de erro global se necessário
				}
			};

			confirm();
		}
	}, [email, code, confirmAccount, navigate]);
	return (
		<div className="flex h-full items-center justify-center">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-xl">Confirmação de conta</CardTitle>
					<CardDescription>
						Aguarde enquanto estamos confirmando a sua conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{email && code && isConfirmingAccount ? (
						<div className="w-full flex items-center justify-center mt-8 mb-8">
							<Spinner />
						</div>
					) : isErrorConfirmingAccount ? (
						<div className="flex flex-col gap-2 items-center">
							<span>Encontramos um erro para validar sua conta</span>
							{(error as unknown as Record<string, number>)?.statusCode ===
							400 ? (
								<>
									<small>
										Clique no botão abaixo para reenviar o código de validação
									</small>
									<Button
										onClick={() => {
											navigate(ROUTES.CONFIRMATION_ACCOUNT);
											email &&
												toast.promise(resendCode(email), {
													loading: "Reenviando código",
													success: () => {
														return "Código reenviado com sucesso";
													},
													error: "Erro ao reenviar código",
												});
										}}
										isLoading={isResendingCode}
									>
										Reenviar
									</Button>
								</>
							) : (
								<>
									<small>
										Por favor, tente realizar a confirmação manualmente
									</small>
									<Button onClick={() => navigate(ROUTES.CONFIRMATION_ACCOUNT)}>
										Redirecionar
									</Button>
								</>
							)}
						</div>
					) : (
						<div className="flex flex-col items-center gap-4">
							<span>Parabéns, sua conta já foi confirmada!</span>
							<small>Acesse a página de login.</small>
							<Button>
								<a href={ROUTES.SIGNIN}>Login</a>
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
