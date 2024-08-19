import { TrainingForm } from "@/components/TrainingForm";
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
import { useUpdateWorkoutHook } from "./useUpdateTrainingScreen";

export function UpdateTrainingScreen() {
	const {
		isUpdatingWorkout,
		hasWorkout,
		workout,
		handleUpdateWorkout,
		navigate,
	} = useUpdateWorkoutHook();

	return (
		<div>
			<div className="w-full gap-2 flex flex-row items-center justify-between">
				<HeaderScreen
					title="Editar treino"
					description="Atualize o treino do atleta."
				/>

				<div className="gap-2 flex flex-row justify-end">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="secondary" disabled={isUpdatingWorkout}>
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
						form="update-training-form"
						isLoading={isUpdatingWorkout}
						// isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</div>
			</div>

			<TrainingForm
				isSubmitting={isUpdatingWorkout}
				onSubmit={handleUpdateWorkout}
				formId="update-training-form"
				initialValues={hasWorkout && workout}
				// isSubmitting={isCreatingAthlete}
			/>
		</div>
	);
}
