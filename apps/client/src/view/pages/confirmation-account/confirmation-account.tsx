import { ROUTES } from "@/config/routes";
import { useAccountConfirmation } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	Separator,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import * as z from "zod";

const FormSchema = z.object({
	code: z.string().min(6, {
		message: "O código de verificação precisa ter 6 caracteres.",
	}),
	email: z.string().email({ message: "Email inválido" }),
});

type FormValues = z.infer<typeof FormSchema>;

export function ConfirmationAccount() {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			code: "",
			email: "",
		},
	});

	const {
		handleSubmit: hookFormSubmit,
		formState: { isValid },
	} = form;

	const { confirmAccount, isConfirmingAccount } = useAccountConfirmation();

	const navigate = useNavigate();

	const handleSubmit = hookFormSubmit(async (values) => {
		await toast.promise(confirmAccount(values), {
			loading: "Confirmando conta...",
			success: "Conta confirmada com sucesso",
			error: (error) => {
				if (error.message === "Expired Code") {
					return "Código expirado";
				}

				return "Código inválido";
			},
		});
		navigate(ROUTES.SIGNIN);
	});

	return (
		<div className="flex h-full items-center justify-center">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-xl">Confirmação de conta</CardTitle>
					<CardDescription>
						Digite o código que você recebeu por e-mail para confirmar sua
						conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								disabled={isConfirmingAccount}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="email@example.com"
												type="email"
												required
												{...field}
											/>
										</FormControl>
										<FormDescription>Preencha com seu e-mail.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="code"
								disabled={isConfirmingAccount}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code Password</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Por favor, insira o código enviado para o e-mail.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								isLoading={isConfirmingAccount}
								disabled={!isValid}
							>
								Confirme sua conta
							</Button>
						</form>
					</Form>
					<Separator className="mt-6 mb-6" />
					<div className="text-center text-sm">
						<span>
							Após a confirmação, faça login.{" "}
							<Link
								// to={ROUTES.LOGIN}
								to="/"
								className="text-primary font-medium"
							>
								Acesse aqui
							</Link>
						</span>
					</div>
					<div className="text-center text-sm">
						<span>
							Ou crie sua conta{" "}
							<Link to={ROUTES.SIGNUP} className="text-primary font-medium">
								aqui
							</Link>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
