import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@shared/ui";
import { useForm } from "react-hook-form";

export function MyAccountTab() {
	const methods = useForm({});

	return (
		<div className="space-y-8 w-full">
			<Form {...methods}>
				<FormItem className="w-full grid grid-cols-2">
					<div>
						<FormLabel>Username</FormLabel>
						<FormDescription>
							Informe o seu melhor e-mail para contato.
						</FormDescription>
					</div>

					<FormControl>
						<Input placeholder="email@email.com.br" />
					</FormControl>
					<FormMessage />
				</FormItem>

				<FormItem className="w-full grid grid-cols-2">
					<div>
						<FormLabel>E-mail</FormLabel>
						<FormDescription>
							Informe o seu melhor e-mail para contato.
						</FormDescription>
					</div>

					<FormControl>
						<Input placeholder="email@email.com.br" disabled aria-disabled />
					</FormControl>
					<FormMessage />
				</FormItem>
			</Form>
		</div>
	);
}
