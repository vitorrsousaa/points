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
} from "@shared/ui";
import { type TExerciseFormSchema, muscles } from "./ExerciseFormSchema";
import { useExerciseFormHook } from "./useExerciseForm";

export interface ExerciseFormProps {
	formId?: string;
	isSubmitting?: boolean;
	onSubmit: (data: TExerciseFormSchema) => Promise<void>;
}

export function ExerciseForm(props: ExerciseFormProps) {
	const { formId = "exercise-form", isSubmitting } = props;

	const { handleSubmit, methods } = useExerciseFormHook(props);

	return (
		<Form {...methods}>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Exercício</CardTitle>

						<CardDescription>
							Preencha os campos para criar um novo exercício.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-4">
						<div className="w-full flex flex-col sm:flex-row gap-4">
							<FormField
								control={methods.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												placeholder="Supino reto"
												type="text"
												required
												disabled={isSubmitting}
												{...field}
												className="w-full"
											/>
										</FormControl>
										<FormDescription>
											Preencha com o nome do exercício.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="equipment"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Equipamento</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={isSubmitting}
											>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o equipamento" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Barra">Barra</SelectItem>
													<SelectItem value="Maquina">Maquina</SelectItem>
													<SelectItem value="Halter">Halter</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Preencha com o equipamento utilizado.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col w-full md:flex-row gap-4">
							<FormField
								control={methods.control}
								name="primaryMuscle"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Musculo primário</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={isSubmitting}
											>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o equipamento" />
												</SelectTrigger>
												<SelectContent className="max-h-52">
													{muscles.map((muscle) => (
														<SelectItem key={muscle} value={muscle}>
															{muscle}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Preencha com musculo primário.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="secondaryMuscle"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Musculo secundário</FormLabel>
										<FormControl>
											<Select
												onValueChange={(event) =>
													field.onChange(event === "null" ? null : event)
												}
												defaultValue={field.value ? field.value : "null"}
												disabled={isSubmitting}
											>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o equipamento" />
												</SelectTrigger>
												<SelectContent className="max-h-52">
													<SelectItem value="null">Nenhum</SelectItem>
													{muscles.map((muscle) => (
														<SelectItem key={muscle} value={muscle}>
															{muscle}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Preencha com musculo secundário.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="target"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Target</FormLabel>
										<FormControl>
											<Select
												onValueChange={(event) =>
													field.onChange(event === "null" ? null : event)
												}
												defaultValue={field.value ? field.value : "null"}
												disabled={isSubmitting}
											>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o equipamento" />
												</SelectTrigger>
												<SelectContent className="max-h-52">
													<SelectItem value="null">Nenhum</SelectItem>
													<SelectItem value="S">Squat</SelectItem>
													<SelectItem value="B">Bench press</SelectItem>
													<SelectItem value="D">Deadlift</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Selecione o movimento alvo.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
