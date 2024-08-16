import { TrainingForm } from "@/components/training-form";
import type { TTrainingFormSchema } from "@/components/training-form/training-form.schema";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function UpdateWorkout() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const { athleteId, workoutId } = useParams<{
		athleteId: string;
		workoutId: string;
	}>();

	console.log(athleteId, workoutId, state);

	const handleCreateWorkout = useCallback(
		async (data: TTrainingFormSchema) => {
			// navigate(-1);
			console.log(data);
			// await createWorkout({
			// 	workout: data,
			// 	athleteId: athleteId || "",
			// });
		},
		[athleteId, navigate],
	);

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Editando um novo treino</CardTitle>
					<CardDescription>
						Adicione todas as informações necessárias para criar um novo treino
						para o atleta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<TrainingForm
						// isSubmitting={isCreatingWorkout}
						onSubmit={handleCreateWorkout}
						formId="update-training-form"
						initialValues={state?.workout || undefined}
						// isSubmitting={isCreatingAthlete}
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button
						variant={"secondary"}
						onClick={() => navigate(-1)}
						// disabled={isCreatingWorkout}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="update-training-form"
						// isLoading={isCreatingWorkout}
						// isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
