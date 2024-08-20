import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ExerciseFormProps } from "./ExerciseForm";
import { ExerciseFormSchema, defaultInitialValues } from "./ExerciseFormSchema";

export function useExerciseFormHook(props: ExerciseFormProps) {
	const { onSubmit } = props;

	const methods = useForm({
		resolver: zodResolver(ExerciseFormSchema),
		defaultValues: defaultInitialValues,
	});

	const { handleSubmit: hookFormSubmit, reset } = methods;

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	return { methods, handleSubmit };
}
