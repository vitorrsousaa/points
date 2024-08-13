import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Icon,
	Input,
	ScrollArea,
	Separator,
	Spinner,
} from "@shared/ui";
import type { TExerciseFormSchema } from "../../training-form.schema";
import { useExerciseListHook } from "./exercise-list.hook";

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

	return (
		<Card className="w-[350px] h-full flex flex-col">
			<CardHeader className="p-4">
				<span>Exercicios</span>
				{hasExercises && (
					<Input
						placeholder="Pesquise o exercício"
						value={filterExercise}
						onChange={onChangeFilterExercise}
					/>
				)}
			</CardHeader>
			<Separator className="mb-2" />
			<ScrollArea>
				<CardContent className="flex flex-col h-full p-4">
					{isLoadingExercises ? (
						<div className="w-full flex min-h-56 items-center justify-center">
							<Spinner />
						</div>
					) : isErrorExercises ? (
						<div className="flex flex-col gap-1 text-center">
							<small>Tivemos um erro ao buscar os exercícios.</small>
							<small>Por favor, recarregue a página.</small>
						</div>
					) : (
						<div className="space-y-2 w-full flex flex-col flex-grow">
							{exercises?.map((exercise) => (
								<div
									key={exercise.id}
									className="flex items-center w-full gap-1"
								>
									<Button
										size="icon"
										variant="ghost"
										onClick={() => handleAddNewExercise(exercise)}
									>
										<Icon name="plusCircle" className="h-4 w-4 text-primary" />
										<span className="sr-only">Add exercise</span>
									</Button>
									<div className=" flex flex-col flex-1  ">
										<small className="truncate max-w-[200px]">
											{exercise.name}
										</small>
										<small className="text-[12px] text-muted-foreground">
											{exercise.primaryMuscle}
										</small>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</ScrollArea>
		</Card>
	);
}
