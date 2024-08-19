import type { Exercise } from "@/entitites/exercise";
import { useGetAllExercises } from "@/hooks/exercise";
import { useCallback, useMemo, useState } from "react";
import type { ExerciseListProps } from "./ExerciseList";

export function useExerciseListHook(props: ExerciseListProps) {
	const { onAddExercise } = props;

	const { exercises, isLoadingExercises, isErrorExercises } =
		useGetAllExercises();

	const hasExercises = Boolean(exercises && exercises?.length > 0);

	const [filterExercise, setFilterExercise] = useState<string>("");

	const handleAddNewExercise = useCallback(
		(exercise: Exercise) => {
			onAddExercise({
				name: exercise.name,
				target: exercise.target,
				notes: "",
				exerciseId: exercise.id,
				restTime: "Off",
				equipment: exercise.equipment,
				primaryMuscle: exercise.primaryMuscle,
				secondaryMuscle: exercise.secondaryMuscle,
				sets: [
					{
						reps: 6,
						weight: 10,
						rpe: 7,
						type: "W",
					},
				],
			});
		},
		[onAddExercise],
	);

	const onChangeFilterExercise = useCallback<
		React.ChangeEventHandler<HTMLInputElement>
	>((event) => {
		console.log(event);
		setFilterExercise(event.target.value);
	}, []);

	const filteredExercises = useMemo(() => {
		return exercises
			? exercises.filter((exercise) => {
					return exercise.name
						.toLowerCase()
						.includes(filterExercise.toLowerCase());
				})
			: [];
	}, [exercises, filterExercise]);

	return {
		exercises: filteredExercises,
		isLoadingExercises,
		isErrorExercises,
		hasExercises,
		filterExercise,
		onChangeFilterExercise,
		handleAddNewExercise,
	};
}
