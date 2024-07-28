import { ROUTES } from "@/config/routes";
import { useAuth, useSignin } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
	email: z
		.string({ message: "O e-mail é obrigatório." })
		.email("Formato de e-mail inválido."),
	password: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
});

type SigninFormSchema = z.infer<typeof formSchema>;

export function Signin() {
	const methods = useForm<SigninFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { control, handleSubmit: hookFormSubmit, setError } = methods;

	const navigate = useNavigate();

	const { signin } = useAuth();

	const { isLoggingAccount, signin: apiSignin } = useSignin();

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			const { accessToken } = await apiSignin(data);
			console.log({ accessToken });
			signin(accessToken);
			navigate(ROUTES.DASHBOARD);

			toast.success("Bem-vindo de volta!");
		} catch (error) {
			toast.error("Credenciais inválidas");
			setError("password", {
				message: "E-mail ou senha inválido",
			});
		}
	});

	return (
		<div className="flex h-full items-center justify-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Faça login</CardTitle>
					<CardDescription>
						Faça login e acesse o painel de administrador da sua loja.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...methods}>
						<form onSubmit={handleSubmit} id="Signin">
							<FormField
								control={control}
								name="email"
								disabled={isLoggingAccount}
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
								disabled={isLoggingAccount}
								control={control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<PasswordInput placeholder="*******" {...field} />
										</FormControl>
										<FormDescription>
											Informe sua senha de acesso.
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
							form="Signin"
							className="w-full"
							isLoading={isLoggingAccount}
						>
							Acessar conta
						</Button>
						<div className="text-center text-sm">
							Ainda não tem uma conta ?{" "}
							<Link to={ROUTES.SIGNUP} className="font-medium text-primary">
								Crie agora!
							</Link>
						</div>
						<div className="text-center text-sm">
							<Link
								to={ROUTES.CONFIRMATION_ACCOUNT}
								className="text-sm font-medium text-primary"
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
