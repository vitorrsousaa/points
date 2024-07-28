import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Switch,
} from "@shared/ui";
import { useAthleteFormHook } from "./athlete-form.hook";
import type { TAthleteFormSchema } from "./athlete-form.schema";

export interface AtheleFormProps {
	formId?: string;
	onSubmit: (data: TAthleteFormSchema) => Promise<void>;
	isSubmitting?: boolean;
	initialValues?: TAthleteFormSchema;
}

export function AthleteForm(props: AtheleFormProps) {
	const { formId = "athlete-form", isSubmitting } = props;

	const { methods, isUpdating, handleSubmit } = useAthleteFormHook(props);

	return (
		<Form {...methods}>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex flex-col gap-4 min-[580px]:flex-row">
					<FormField
						control={methods.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										placeholder="Nome do atleta"
										type="text"
										required
										disabled={isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Preencha com o nome do atleta.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={methods.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										placeholder="E-mail do atleta"
										type="email"
										required
										disabled={isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Preencha com o e-mail do atleta.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{isUpdating && (
						<FormField
							control={methods.control}
							name="status"
							render={({ field: { value, onChange, name } }) => (
								<FormItem className="w-full items-center flex-row flex justify-between gap-4 min-[580px]:max-w-40">
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Switch
											checked={value}
											onCheckedChange={onChange}
											name={name}
											disabled={isSubmitting}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
				</div>
				<div className="flex flex-col gap-2 sm:flex-row w-full">
					<FormField
						control={methods.control}
						name="weight"
						render={({ field: { value, onChange, name } }) => (
							<FormItem className="w-full">
								<FormLabel>Peso do atleta</FormLabel>
								<FormControl>
									<Input
										name={name}
										disabled={isSubmitting}
										required
										onChange={(e) => onChange(Number.parseInt(e.target.value))}
										value={value}
										type="number"
									/>
								</FormControl>
								<FormDescription>
									Adicione o peso do atleta, em Kilograma (Kg).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-2 sm:flex-row w-full">
					<FormField
						control={methods.control}
						name="age"
						render={({ field: { value, onChange, name } }) => (
							<FormItem className="w-full">
								<FormLabel>Idade do atleta</FormLabel>
								<FormControl>
									<Input
										name={name}
										disabled={isSubmitting}
										required
										onChange={(e) => onChange(Number.parseInt(e.target.value))}
										value={value}
										type="number"
									/>
								</FormControl>
								<FormDescription>
									Adicione o idade do atleta, em Kilograma (Kg).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}
