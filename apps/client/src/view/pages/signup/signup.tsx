import { ROUTES } from "@/config/routes";

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	Input,
	PasswordInput,
	Separator,
} from "@shared/ui";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shared/ui";

import { Link } from "react-router-dom";
import { useSignupHook } from "./signup.hook";

export function Signup() {
	const { methods, isCreatingAccount, control, handleSubmit } = useSignupHook();

	return (
		<div className="flex h-full items-center justify-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Crie sua conta</CardTitle>
					<CardDescription>
						Adicione as informações para cadastrar a sua loja.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...methods}>
						<form onSubmit={handleSubmit} id="signup">
							<div className="flex flex-row align-center gap-2">
								<FormField
									control={control}
									name="firstName"
									disabled={isCreatingAccount}
									render={({ field }) => (
										<FormItem>
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
										<FormItem>
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
											<Input placeholder="email@email.com.br" {...field} />
										</FormControl>
										<FormDescription>
											Informe o seu melhor e-mail para contato.
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
											<PasswordInput placeholder="*******" {...field} />
										</FormControl>
										<FormDescription>
											Informe sua senha de acesso. A senha deve conter números,
											letras e caracteres especiais.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
					<Separator className="mt-4 mb-4" />
					<div className="space-y-2 w-full">
						<Button
							type="submit"
							form="signup"
							className="w-full"
							isLoading={isCreatingAccount}
						>
							Criar conta
						</Button>
						<div className="text-center text-sm">
							Já possui uma conta ?{" "}
							<Link to={ROUTES.SIGNIN} className="font-medium text-primary">
								Faça login!
							</Link>
						</div>
						<div className="text-center text-sm">
							<Link
								to={ROUTES.CONFIRMATION_ACCOUNT}
								className="text-sm font-medium text-primary "
							>
								Confirme sua conta aqui.
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
