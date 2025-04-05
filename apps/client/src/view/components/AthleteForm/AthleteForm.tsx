import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Icon,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@shared/ui";
import type { TAthleteFormSchema } from "./AthleteFormSchema";
import { useAthleteForm } from "./useAthleteForm";

export interface AtheleFormProps {
	formId?: string;
	onSubmit: (data: TAthleteFormSchema) => Promise<void>;
	isSubmitting?: boolean;
	initialValues?: TAthleteFormSchema;
}

export function AthleteForm(props: AtheleFormProps) {
	const { formId = "athlete-form", isSubmitting } = props;

	const { methods, isUpdating, handleSubmit } = useAthleteForm(props);

	return (
		<Form {...methods}>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Pessoais</CardTitle>

						<CardDescription>
							Preencha os campos com as informações pessoais do atleta.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 sm:flex-row">
							<FormField
								control={methods.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												placeholder="Jhon"
												type="text"
												required
												readOnly={isUpdating}
												disabled={isSubmitting}
												{...field}
												className="w-full"
											/>
										</FormControl>
										<FormDescription>
											Preencha com o nome do atleta.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Sobrenome</FormLabel>
										<FormControl>
											<Input
												placeholder="Doe"
												type="text"
												required
												readOnly={isUpdating}
												disabled={isSubmitting}
												{...field}
												className="w-full"
											/>
										</FormControl>
										<FormDescription>
											Preencha com o sobrenome do atleta.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={methods.control}
								name="age"
								render={({ field: { value, onChange, name } }) => (
									<FormItem>
										<FormLabel>Idade</FormLabel>
										<FormControl>
											<Input
												className="max-w-40"
												name={name}
												disabled={isSubmitting}
												required
												onChange={(e) =>
													onChange(Number.parseInt(e.target.value))
												}
												value={value}
												type="number"
												min={0}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={methods.control}
							name="email"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="example@email.com"
											type="email"
											required
											readOnly={isUpdating}
											disabled={isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Preencha com o email do atleta.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="isActive"
							control={methods.control}
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="flex flex-row items-center gap-2">
										Status
										<Dialog>
											<DialogTrigger asChild>
												<Button
													style={{ all: "unset", cursor: "pointer" }}
													size={"icon"}
												>
													<Icon name="questionMark" className="h-4 w-4" />
												</Button>
											</DialogTrigger>

											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader className="gap-2">
													<DialogTitle>Como funciona ?</DialogTitle>
													<DialogDescription>
														Quando o status é selecionado como ativo, o atleta
														consegue acessar o aplicativo e visualizar os
														treinos. Quando o status é selecionado como inativo,
														o atleta não tem permissão para acessar o
														aplicativo.
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</FormLabel>
									<Select
										onValueChange={(value) =>
											field.onChange(value === "active")
										}
										defaultValue={field.value ? "active" : "inactive"}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o status do atleta" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="active">Ativo</SelectItem>
											<SelectItem value="inactive">Inativo</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>Status do atleta</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Corporais</CardTitle>

						<CardDescription>
							Preencha os campos com as informações corporais do atleta.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-row gap-4">
						<FormField
							control={methods.control}
							name="weight"
							render={({ field: { value, onChange, name } }) => (
								<FormItem className="w-full">
									<FormLabel>Peso (KG)</FormLabel>
									<FormControl>
										<Input
											name={name}
											disabled={isSubmitting}
											required
											onChange={(e) =>
												onChange(Number.parseInt(e.target.value))
											}
											value={value}
											type="number"
											min={0}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={methods.control}
							name="height"
							render={({ field: { value, onChange, name } }) => (
								<FormItem className="w-full">
									<FormLabel>Altura (cm)</FormLabel>
									<FormControl>
										<Input
											name={name}
											disabled={isSubmitting}
											required
											onChange={(e) =>
												onChange(Number.parseInt(e.target.value))
											}
											value={value}
											type="number"
											min={0}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Treinamento</CardTitle>

						<CardDescription>
							Adicione os objetivos que o seu atleta busca durante o
							treinamento.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<FormField
							name="category"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Categoria</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a categoria" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="powerlifiting">
												Powerlifiting
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>Categoria do treino</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="objectives"
							render={({ field: { value, onChange, name } }) => (
								<FormItem className="w-full">
									<FormLabel>Objetivos</FormLabel>
									<FormControl>
										<Textarea value={value} onChange={onChange} name={name} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
