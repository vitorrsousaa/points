import { TrainingForm } from "@/components/training-form";
import type { TTrainingFormSchema } from "@/components/training-form/training-form.schema";
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
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function NewTraining() {
	const navigate = useNavigate();

	const { athleteId } = useParams<{ athleteId: string }>();

	const { createWorkout, isCreatingWorkout } = useCreateWorkout();

	const handleCreateWorkout = useCallback(
		async (data: TTrainingFormSchema) => {
			navigate(-1);
			await createWorkout({
				workout: data,
				athleteId: athleteId || "",
			});
		},
		[athleteId, createWorkout, navigate],
	);

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
						isSubmitting={isCreatingWorkout}
						onSubmit={handleCreateWorkout}
						formId="new-training-form"
						// isSubmitting={isCreatingAthlete}
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button
						variant={"secondary"}
						onClick={() => navigate(-1)}
						disabled={isCreatingWorkout}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="new-training-form"
						isLoading={isCreatingWorkout}
						// isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
