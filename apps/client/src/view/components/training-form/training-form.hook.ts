import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import type { TrainingFormProps } from "./training-form";
import {
	type TExerciseFormSchema,
	TrainingFormSchema,
	defaultInitialValues,
} from "./training-form.schema";
import { defaultVolume } from "./training.form.constants";

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

	const { exercises: watchExercises } = useWatch({
		control,
	});

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	const handleAddNewExercise = useCallback(
		(param: TExerciseFormSchema) => {
			const {
				name,
				target,
				notes,
				exerciseId,
				restTime,
				sets,
				equipment,
				primaryMuscle,
				secondaryMuscle,
			} = param;
			appendExercises({
				name,
				target,
				notes,
				exerciseId,
				restTime,
				sets,
				equipment,
				primaryMuscle,
				secondaryMuscle,
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

	const volume = useMemo<Record<string, { sets: number; load: number }>>(() => {
		if (!watchExercises) return defaultVolume;

		const sets = watchExercises.reduce((acc, exercise) => {
			const { sets, target } = exercise;

			if (!target || !sets) return acc;

			const totalSets = sets.reduce(
				(acc, set) => {
					const { type, reps, weight } = set;

					if (type === "W" || !reps || !weight) return acc;

					const totalWeight = reps * weight;

					return {
						sets: type === "F" || type === "T" ? acc.sets + 1 : acc.sets,
						load: acc.load + totalWeight,
					};
				},
				{ sets: 0, load: 0 },
			);

			return {
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				...acc,
				[target]: totalSets,
			};
		}, defaultVolume);

		return sets;
	}, [watchExercises]);

	return {
		methods,
		isUpdating,
		exercises,
		volume,
		handleAddNewExercise,
		handleRemoveExercise,
		handleSubmit,
	};
}
