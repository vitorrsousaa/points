import { formatMoney } from "@/utils/money-formatter";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	MoneyInput,
	Switch,
	Textarea,
} from "@shared/ui";
import { useProductFormHook } from "./product-form.hook";
import type { TProductFormSchema } from "./product-form.schema";

export interface ProductFormProps {
	formId?: string;
	initialValues?: TProductFormSchema;
	onSubmit: (data: TProductFormSchema) => Promise<void>;
	isSubmitting?: boolean;
}

export function ProductForm(props: ProductFormProps) {
	const { formId = "product-form", isSubmitting } = props;

	const { methods, handleSubmit } = useProductFormHook(props);

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
										placeholder="Nome do produto"
										type="text"
										required
										disabled={isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Preencha com o nome do produto.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={methods.control}
						name="isAvailable"
						render={({ field: { value, onChange, name } }) => (
							<FormItem className="w-full items-center flex-row flex justify-between gap-4 min-[580px]:max-w-40">
								<FormLabel>Disponibilidade</FormLabel>
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
				</div>
				<div className="flex flex-col gap-2 sm:flex-row w-full">
					<FormField
						control={methods.control}
						name="price"
						render={({ field: { value, onChange, name } }) => (
							<FormItem className="w-full">
								<FormLabel>Preço do produto</FormLabel>
								<FormControl>
									<MoneyInput
										name={name}
										min={0.1}
										disabled={isSubmitting}
										required
										onChange={onChange}
										value={value}
										moneyFormatter={formatMoney}
									/>
								</FormControl>
								<FormDescription>Adicione o valor do produto.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={methods.control}
						name="category"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Categoria</FormLabel>
								<Input
									placeholder="Categoria do produto"
									type="text"
									required
									disabled={isSubmitting}
									{...field}
								/>
								<FormDescription>
									Informe a categoria do produto
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={methods.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Escreva uma descrição sobre o produto"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Esta descrição vai ser exibida na página do produto.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
