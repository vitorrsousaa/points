import type { Exercise } from "@/entitites/exercise";
import { useGetAllExercises } from "@/hooks/exercise";
import { useCallback } from "react";
import type { ExerciseListProps } from "./exercise-list";

export function useExerciseListHook(props: ExerciseListProps) {
	const { onAddExercise } = props;

	const { exercises, isLoadingExercises, isErrorExercises } =
		useGetAllExercises();

	const hasExercises = Boolean(exercises && exercises?.length > 0);

	const handleAddNewExercise = useCallback(
		(exercise: Exercise) => {
			onAddExercise({
				name: exercise.name,
				target: exercise.target,
				notes: "",
				exerciseId: exercise.id,
				restTime: "Off",
				sets: [
					{
						reps: 6,
						weight: 10,
					},
				],
			});
		},
		[onAddExercise],
	);

	return {
		exercises,
		isLoadingExercises,
		isErrorExercises,
		hasExercises,
		handleAddNewExercise,
	};
}
