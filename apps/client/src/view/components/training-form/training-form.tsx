import {
	Card,
	CardContent,
	CardHeader,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@shared/ui";
import { useTrainingFormHook } from "./training-form.hook";
import type { TTrainingFormSchema } from "./training-form.schema";

export interface TrainingFormProps {
	formId?: string;
	onSubmit: (data: TTrainingFormSchema) => Promise<void>;
	isSubmitting?: boolean;
	initialValues?: TTrainingFormSchema;
}

export function TrainingForm(props: TrainingFormProps) {
	const { formId = "training-form", isSubmitting } = props;

	const { methods, handleSubmit } = useTrainingFormHook(props);

	return (
		<Form {...methods}>
			<form
				id={formId}
				onSubmit={handleSubmit}
				className="flex flex-row w-full gap-4"
			>
				<Card className="bg-red-500 w-full">
					<CardHeader>
						<FormField
							control={methods.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder="Nome do treino"
											type="text"
											required
											disabled={isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Preencha com o nome do treino.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardHeader>
					<CardContent>content</CardContent>
				</Card>
				<Card className="bg-blue-300 w-1/3">
					<CardHeader>exercicios</CardHeader>
					<CardContent>content</CardContent>
				</Card>
			</form>
		</Form>
	);
}
