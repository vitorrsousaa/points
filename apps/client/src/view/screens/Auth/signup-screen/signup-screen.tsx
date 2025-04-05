import { useSignup } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	Separator,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import {
	SignUpFormSchema,
	type SignUpFormSchemaTypes,
} from "./signup-screen.schema";

export function SignupScreen() {
	const methods = useForm<SignUpFormSchemaTypes>({
		resolver: zodResolver(SignUpFormSchema),
	});

	const { control, handleSubmit: hookFormSubmit } = methods;

	const { signup, isCreatingAccount } = useSignup();

	const handleSubmit = hookFormSubmit((data) => {
		const ROLE = ["COACH"];
		const newUserData = { ...data, role: ROLE };

		signup(newUserData);
	});

	return (
		<>
			<div className="hidden bg-muted lg:block" />

			<div className="flex items-center justify-center py-12 flex-col">
				<div className="flex flex-col items-center gap-2 mb-8 text-center">
					<h3 className="text-3xl font-bold">Crie sua conta</h3>
					<span className="text-muted-foreground text-pretty">
						Adicione seu e-mail e crie uma senha
					</span>
				</div>

				<Form {...methods}>
					<form
						id="signup"
						onSubmit={handleSubmit}
						className="flex items-center justify-center py-12 mx-auto w-full sm:w-[460px] gap-4 flex-col"
					>
						<div className="flex flex-col gap-4 w-full">
							<div className="flex flex-row align-center gap-2">
								<FormField
									control={control}
									name="firstName"
									disabled={isCreatingAccount}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Primeiro nome</FormLabel>
											<FormControl>
												<Input placeholder="John" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="lastName"
									disabled={isCreatingAccount}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Segundo nome</FormLabel>
											<FormControl>
												<Input placeholder="Doe" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={control}
								name="email"
								disabled={isCreatingAccount}
								render={({ field }) => (
									<FormItem>
										<FormLabel>E-mail</FormLabel>
										<FormControl>
											<Input placeholder="John" {...field} />
										</FormControl>
										<FormDescription>
											Enviaremos uma confirmação para este email.
										</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="password"
								disabled={isCreatingAccount}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<PasswordInput
												placeholder="*******"
												showValidation
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator className="mt-8 mb-8" />

						<div className="text-sm text-center">
							<strong className="text-[16px]">
								Dicas para criar uma senha mais segura:
							</strong>
							<ul className="list-disc text-left">
								<li>
									Combine letras maiúsculas e minúsculas, símbolos e números
								</li>
								<li>Não use informações pessoais</li>
								<li>Use pelo menos 8 caracteres</li>
							</ul>
						</div>

						<Button
							type="submit"
							form="signup"
							className="w-full"
							isLoading={isCreatingAccount}
						>
							Criar conta
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
