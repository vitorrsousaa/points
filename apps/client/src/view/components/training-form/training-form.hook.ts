import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { TrainingFormProps } from "./training-form";
import {
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

	const { handleSubmit: hookFormSubmit } = methods;

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	return { methods, isUpdating, handleSubmit };
}
