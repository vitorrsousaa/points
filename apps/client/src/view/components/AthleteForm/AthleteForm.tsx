import {
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
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

	// TODO: add height field to the form
	// TODO: add firstName and lastName fields to the form

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
												placeholder="Jhon Doe"
												type="text"
												required
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
												placeholder="Jhon Doe"
												type="text"
												required
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
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											placeholder="example@email.com"
											type="email"
											required
											disabled={isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Preencha com o e-mail do atleta.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{isUpdating && (
					<FormField
						control={methods.control}
						name="isActive"
						render={({ field: { value, onChange, name } }) => (
							<FormItem className="w-full items-center flex-row flex justify-between gap-4 min-[580px]:max-w-40">
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Switch
										checked={value}
										onCheckedChange={onChange}
										name={name}
										disabled={isSubmitting}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				)}

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
							name="email"
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
							control={methods.control}
							name="email"
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
