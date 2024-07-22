import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ProductFormProps } from "./product-form";
import {
	ProductFormSchema,
	type TProductFormSchema,
	defaultInitialValues,
} from "./product-form.schema";

export function useProductFormHook(props: ProductFormProps) {
	const { initialValues, onSubmit } = props;

	const methods = useForm<TProductFormSchema>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: initialValues || defaultInitialValues,
	});

	const { handleSubmit: hookFormSubmit } = methods;

	const handleSubmit = hookFormSubmit(async (data) => {
		await onSubmit(data);
	});

	return { methods, handleSubmit };
}
