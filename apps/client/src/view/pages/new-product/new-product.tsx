import { ProductForm } from "@/components/product-form";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/ui";

export function NewProduct() {
	return (
		<div className="grid flex-1 items-start gap-4 md:gap-8">
			<Card>
				<CardHeader>
					<CardTitle>Criando um novo produto</CardTitle>
					<CardDescription>
						Adicione todas as informações necessárias para criar um novo
						produto.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ProductForm
						onSubmit={(data) => console.log(data)}
						formId="new-product-form"
					/>
				</CardContent>
				<CardFooter className="w-full">
					<Button
						className="ml-auto"
						type="submit"
						form="new-product-form"
						// isLoading={isCreatingProduct}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
