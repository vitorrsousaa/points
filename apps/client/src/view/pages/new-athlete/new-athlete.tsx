import { AthleteForm } from "@/components/athlete-form";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/ui";
import { useNavigate } from "react-router-dom";

export function NewAthlete() {
	const navigate = useNavigate();

	return (
		<div className="grid flex-1 items-start gap-4 md:gap-8">
			<Card>
				<CardHeader>
					<CardTitle>Adicionando um novo atleta</CardTitle>
					<CardDescription>
						Adicione todas as informações necessárias para criar um novo atleta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AthleteForm
						onSubmit={async (data) => console.log(data)}
						formId="new-athlete-form"
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button variant={"secondary"} onClick={() => navigate(-1)}>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="new-athlete-form"
						// isLoading={isCreatingProduct}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
