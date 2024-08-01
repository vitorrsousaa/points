import { TrainingForm } from "@/components/training-form";
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

export function NewTraining() {
	const navigate = useNavigate();

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Criando um novo treino</CardTitle>
					<CardDescription>
						Adicione todas as informações necessárias para criar um novo treino
						para o atleta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<TrainingForm
						onSubmit={async (data) => console.log(data)}
						formId="new-training-form"
						// isSubmitting={isCreatingAthlete}
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button variant={"secondary"} onClick={() => navigate(-1)}>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="new-training-form"
						// isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
