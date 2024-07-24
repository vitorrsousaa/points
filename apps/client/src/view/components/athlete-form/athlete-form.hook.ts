import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { AtheleFormProps } from "./athele-form";
import { AthleteFormSchema, defaultInitialValues } from "./athlete-form.schema";

export function useAthleteFormHook(props: AtheleFormProps) {
	const { initialValues, onSubmit } = props;

	const isUpdating = useMemo(() => Boolean(initialValues), [initialValues]);

	const methods = useForm({
		resolver: zodResolver(AthleteFormSchema),
		defaultValues: initialValues || defaultInitialValues,
	});

	const { handleSubmit: hookFormSubmit } = methods;

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	return { methods, isUpdating, handleSubmit };
}
