// import { DevTool } from "@hookform/devtools";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	ScrollArea,
	Separator,
} from "@shared/ui";
import { ExerciseDetail } from "./components/exercise-detail";
import { ExerciseList } from "./components/exercise-list";
import { useTrainingFormHook } from "./training-form.hook";
import type { TTrainingFormSchema } from "./training-form.schema";

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

	return (
		<Form {...methods}>
			<form
				id={formId}
				onSubmit={handleSubmit}
				className="flex flex-row w-full gap-4 "
			>
				<Card className="w-full flex flex-col h-full">
					<CardHeader>
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
					</CardHeader>
					<Separator className="mb-6" />

					<ScrollArea className="h-60 ">
						<CardContent className="space-y-3">
							{exercises.map((exercise, index) => (
								<ExerciseDetail
									key={exercise.id}
									index={index}
									onRemoveExercise={handleRemoveExercise}
								/>
							))}
						</CardContent>
					</ScrollArea>

					<CardFooter className="flex flex-row gap-4">
						{exercises.length > 0 && (
							<>
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
							</>
						)}
					</CardFooter>
				</Card>
				<ExerciseList onAddExercise={handleAddNewExercise} />
				{/* <DevTool control={control} /> */}
			</form>
		</Form>
	);
}
