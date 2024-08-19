import { TrainingForm } from "@/components/TrainingForm";
import type { TTrainingFormSchema } from "@/components/TrainingForm/TrainingFormSchema";
import { useCreateWorkout } from "@/hooks/workout";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	HeaderScreen,
} from "@shared/ui";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function NewTrainingScreen() {
	const navigate = useNavigate();

	const { athleteId } = useParams<{ athleteId: string }>();

	const { createWorkout, isCreatingWorkout } = useCreateWorkout();

	const handleCreateWorkout = useCallback(
		async (data: TTrainingFormSchema) => {
			await createWorkout({
				workout: data,
				athleteId: athleteId || "",
			});

			navigate(-1);
		},
		[athleteId, createWorkout, navigate],
	);

	return (
		<div>
			<div className="w-full gap-2 flex flex-row items-center justify-between">
				<HeaderScreen
					title="Novo treino"
					description="Adicione um novo treino para o atleta."
				/>

				<div className="gap-2 flex flex-row justify-end">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="secondary" disabled={isCreatingWorkout}>
								Descartar
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Você tem certeza que deseja descartar as informações?
								</AlertDialogTitle>
								<AlertDialogDescription>
									As informações preenchidas não serão salvas e você perderá o
									progresso.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction onClick={() => navigate(-1)}>
									Confirmar
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Button
						type="submit"
						form="new-training-form"
						isLoading={isCreatingWorkout}
						// isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</div>
			</div>

			<TrainingForm
				isSubmitting={isCreatingWorkout}
				onSubmit={handleCreateWorkout}
				formId="new-training-form"
				// isSubmitting={isCreatingAthlete}
			/>
		</div>
	);
}
