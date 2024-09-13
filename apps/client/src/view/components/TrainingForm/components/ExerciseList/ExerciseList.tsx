import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Icon,
	Input,
	RenderIf,
	ScrollArea,
	Separator,
	Skeleton,
} from "@shared/ui";
import type { TExerciseFormSchema } from "../../TrainingFormSchema";
import { useExerciseListHook } from "./useExerciseList";

export interface ExerciseListProps {
	onAddExercise: (param: TExerciseFormSchema) => void;
}

export function ExerciseList(props: ExerciseListProps) {
	const {
		exercises,
		isLoadingExercises,
		isErrorExercises,
		hasExercises,
		filterExercise,
		handleAddNewExercise,
		onChangeFilterExercise,
	} = useExerciseListHook(props);

	function exerciseListRender() {
		return (
			<>
				<CardHeader className="space-y-4">
					<CardTitle>Exercicios</CardTitle>
					<RenderIf
						condition={hasExercises}
						render={
							<Input
								placeholder="Pesquise o exercício"
								value={filterExercise}
								onChange={onChangeFilterExercise}
							/>
						}
					/>
				</CardHeader>

				<Separator />

				<ScrollArea className="py-4 px-6">
					<CardContent className="flex flex-col h-full p-0">
						<div className="gap-6 w-full flex flex-col flex-grow">
							{exercises?.map((exercise) => (
								<div
									key={exercise.id}
									className="flex items-center w-full gap-2 rounded-lg transition-colors"
								>
									<Button
										size="icon"
										variant="ghost"
										onClick={() => handleAddNewExercise(exercise)}
									>
										<Icon name="plusCircle" className="h-5 w-5  text-primary" />
										<span className="sr-only">Add exercise</span>
									</Button>
									<div className="flex flex-col flex-1 ml-2">
										<small className="truncate font-medium text-sm w-full lg:max-w-44">
											{exercise.name}
										</small>
										<small className="text-sm text-gray-500 w-fit">
											{exercise.primaryMuscle}
										</small>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</ScrollArea>
			</>
		);
	}

	return (
		<Card className="lg:min-w-[280px] h-full flex flex-col md:w-[250px]">
			<RenderIf
				condition={isLoadingExercises}
				render={<Skeleton className="h-full w-full" />}
			/>

			<RenderIf
				condition={isErrorExercises}
				render={
					<div className="flex flex-col gap-1 text-center">
						<small>Tivemos um erro ao buscar os exercícios.</small>
						<small>Por favor, recarregue a página.</small>
					</div>
				}
			/>

			<RenderIf
				condition={Boolean(!isLoadingExercises && !isErrorExercises)}
				render={exerciseListRender()}
			/>
		</Card>
	);
}
