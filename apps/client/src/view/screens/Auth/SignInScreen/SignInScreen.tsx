import { ROUTES } from "@/config/routes";
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
import { Link } from "react-router-dom";
import { useSignIn } from "./useSignIn";

export function SignInScreen() {
	const { control, handleSubmit, isLoggingAccount, methods } = useSignIn();

	return (
		<>
			<div className="hidden bg-muted lg:block">
				{/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
			</div>

			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[480px]">
					<div className="flex flex-col items-center gap-2 mb-8 text-center">
						<h1 className="text-3xl font-bold">Acesse a GRYPP</h1>
						<p className="text-balance text-muted-foreground">
							Facilitando sua rotina no acompanhamento dos alunos.
						</p>
					</div>

					<Form {...methods}>
						<form
							onSubmit={handleSubmit}
							id="Signin"
							className="flex flex-col gap-4"
						>
							<FormField
								control={control}
								name="email"
								disabled={isLoggingAccount}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="email@email.com.br" {...field} />
										</FormControl>
										<FormDescription>
											Informe o seu melhor email para contato.
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
											<PasswordInput
												placeholder="*******"
												description="Informe sua senha de acesso."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>

					<Separator className="mt-8 mb-8" />

					<div className="space-y-8 w-full">
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
					</div>
				</div>
			</div>
		</>
	);
}
