import { DevTool } from "@hookform/devtools";
import {
	Card,
	CardContent,
	CardHeader,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
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
		control,
		handleAddNewExercise,
		handleRemoveExercise,
		handleSubmit,
	} = useTrainingFormHook(props);

	return (
		<Form {...methods}>
			<form
				id={formId}
				onSubmit={handleSubmit}
				className="flex flex-row w-full gap-4"
			>
				<Card className="w-full">
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
					<CardContent className="space-y-3">
						{exercises.map((exercise, index) => (
							<ExerciseDetail
								key={exercise.id}
								index={index}
								onRemoveExercise={handleRemoveExercise}
							/>
						))}
					</CardContent>
				</Card>
				<ExerciseList onAddExercise={handleAddNewExercise} />
				{/* <DevTool control={control} /> */}
			</form>
		</Form>
	);
}
