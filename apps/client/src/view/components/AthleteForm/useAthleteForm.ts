import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { AtheleFormProps } from "./AthleteForm";
import { AthleteFormSchema, defaultInitialValues } from "./AthleteFormSchema";

export function useAthleteForm(props: AtheleFormProps) {
	const { initialValues, onSubmit } = props;

	const isUpdating = useMemo(() => Boolean(initialValues), [initialValues]);

	console.log(initialValues);

	const methods = useForm({
		resolver: zodResolver(AthleteFormSchema),
		defaultValues: initialValues || defaultInitialValues,
	});

	const { handleSubmit: hookFormSubmit, formState } = methods;

	console.log(formState.errors);

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	return { methods, isUpdating, handleSubmit };
}
