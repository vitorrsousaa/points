// import { DevTool } from "@hookform/devtools";
import {
	Card,
	CardContent,
	CardFooter,
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
	RenderIfElse,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Textarea,
} from "@shared/ui";
import { ExerciseDetail } from "./components/ExerciseDetails";
import { ExerciseList } from "./components/ExerciseList";
import { useTrainingFormHook } from "./useTrainingForm";
import type { TTrainingFormSchema } from "./TrainingFormSchema";

export interface TrainingFormProps {
	formId?: string;
	onSubmit: (data: TTrainingFormSchema) => Promise<void>;
	isSubmitting?: boolean;
	initialValues?: TTrainingFormSchema;
}

export function TrainingForm(props: TrainingFormProps) {
	const { formId = "training-form", isSubmitting } = props;

	const {
		methods,
		exercises,
		volume,
		handleAddNewExercise,
		handleRemoveExercise,
		handleSubmit,
	} = useTrainingFormHook(props);

	function renderExerciseList() {
		return (
			<>
				<ScrollArea>
					<CardContent className="space-y-3 flex-grow flex flex-col p-4 ">
						{exercises.map((exercise, index) => (
							<ExerciseDetail
								key={exercise.id}
								index={index}
								onRemoveExercise={handleRemoveExercise}
							/>
						))}
					</CardContent>
				</ScrollArea>

				<Separator className="mb-3" />
				<CardFooter className="flex flex-row gap-4 p-4 pt-0">
					<div className="flex flex-col">
						<small className="font-medium">Volume sets:</small>
						{Object.keys(volume).map((key) => (
							<small key={key}>
								{key}: {volume[key].sets} séries
							</small>
						))}
					</div>
					<div className="flex flex-col">
						<small className="font-medium">Volume load:</small>
						{Object.keys(volume).map((key) => (
							<small key={key}>
								{key}: {volume[key as "S" | "B" | "D"].load} Kg
							</small>
						))}
					</div>
				</CardFooter>
			</>
		);
	}

	return (
		<Form {...methods}>
			<form id={formId} onSubmit={handleSubmit} className="w-full space-y-4">
				<div className="border rounded-xl p-4 bg-card gap-4 flex flex-col">
					<div className="flex items-center gap-4">
						<FormField
							control={methods.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder="Nome do treino"
											type="text"
											required
											disabled={isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Preencha com o nome do treino.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-center gap-4 space-between">
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
							name="email"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o status do treino" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="active">Ativo</SelectItem>
											<SelectItem value="inactive">Inativo</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>Status do treino</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={methods.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descrição</FormLabel>

								<FormControl>
									<Textarea
										onChange={field.onChange}
										value={field.value}
										placeholder="Descrição do treino"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex gap-4">
					<ExerciseList onAddExercise={handleAddNewExercise} />

					<Card className="w-full flex flex-col h-full">
						<CardHeader className="p-4">
							<CardTitle>Exercicios</CardTitle>
						</CardHeader>
						<Separator className="mb-2" />

						<RenderIfElse
							condition={exercises.length > 0}
							ifRender={renderExerciseList()}
							elseRender={
								<CardContent className="flex-grow py-4 flex items-center justify-center">
									<small className="text-gray-500">
										Nenhum exercício adicionado
									</small>
								</CardContent>
							}
						/>
					</Card>
				</div>
			</form>
		</Form>
	);
}
