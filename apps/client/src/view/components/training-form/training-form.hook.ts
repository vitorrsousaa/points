import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import type { TrainingFormProps } from "./training-form";
import {
	type TExerciseFormSchema,
	TrainingFormSchema,
	defaultInitialValues,
} from "./training-form.schema";

export function useTrainingFormHook(props: TrainingFormProps) {
	const { initialValues, onSubmit } = props;

	const isUpdating = useMemo(() => Boolean(initialValues), [initialValues]);

	const methods = useForm({
		resolver: zodResolver(TrainingFormSchema),
		defaultValues: initialValues || defaultInitialValues,
	});

	const { handleSubmit: hookFormSubmit, control } = methods;

	const {
		append: appendExercises,
		remove: removeExercises,
		fields: exercises,
	} = useFieldArray({
		control,
		name: "exercises",
	});

	const watchExercises = useWatch({ control, name: "exercises" });

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	const handleAddNewExercise = useCallback(
		(param: TExerciseFormSchema) => {
			const { name, target, notes, exerciseId, restTime, sets } = param;
			appendExercises({
				name,
				target,
				notes,
				exerciseId,
				restTime,
				sets,
			});
		},
		[appendExercises],
	);

	const handleRemoveExercise = useCallback(
		(index: number) => {
			removeExercises(index);
		},
		[removeExercises],
	);

	return {
		methods,
		isUpdating,
		exercises,
		control,
		handleAddNewExercise,
		handleRemoveExercise,
		handleSubmit,
	};
}
