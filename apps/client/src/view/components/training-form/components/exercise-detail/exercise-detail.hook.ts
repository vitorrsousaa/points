import { useCallback } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { TTrainingFormSchema } from "../../training-form.schema";
import type { ExerciseDetailProps } from "./exercise-detail";

export function useExerciseDetailHook(props: ExerciseDetailProps) {
	const { index } = props;

	const { control } = useFormContext<TTrainingFormSchema>();

	const {
		fields: sets,
		append: addNewSet,
		remove,
	} = useFieldArray({
		control,
		name: `exercises.${index}.sets`,
	});

	const watchExercise = useWatch({
		control,
		name: `exercises.${index}`,
	});

	const handleAddNewSet = useCallback(() => {
		addNewSet({ reps: 6, weight: 10 });
	}, [addNewSet]);

	const handleRemoveSet = useCallback(
		(index: number) => {
			if (index === 0) return;
			remove(index);
		},
		[remove],
	);

	return {
		name: watchExercise.name,
		target: watchExercise.target,
		control,
		sets,
		handleAddNewSet,
		handleRemoveSet,
	};
}
