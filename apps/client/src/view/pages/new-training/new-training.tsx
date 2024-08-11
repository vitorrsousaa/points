import { TrainingForm } from "@/components/training-form";
import { useCreateWorkout } from "@/hooks/workout";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/ui";
import { useNavigate, useParams } from "react-router-dom";

export function NewTraining() {
	const navigate = useNavigate();

	const { athleteId } = useParams<{ athleteId: string }>();

	const { createWorkout } = useCreateWorkout();

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
						onSubmit={async (data) => {
							await createWorkout({
								workout: data,
								athleteId: athleteId || "",
							});
						}}
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
