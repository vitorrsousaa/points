import { ExerciseForm } from "@/components/ExerciseForm";
import { ROUTES } from "@/config/routes";
import { useCreateExercise, useGetAllExercises } from "@/hooks/exercise";
import { Button, HeaderScreen } from "@shared/ui";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCallback } from "react";
import { seedExercises } from "../../../../../../api/src/app/database/seed/exercise";

export function ExercisesScreen() {
	const navigate = useNavigate();

	const { createExercise, isCreatingExercise } = useCreateExercise();

	const { exercises, isLoadingExercises, isErrorExercises } =
		useGetAllExercises();

	const seedingExercises = useCallback(async () => {
		for (const exercise of seedExercises) {
			await createExercise({
				name: exercise.name,
				equipment: exercise.equipment,
				primaryMuscle: exercise.primaryMuscle,
				secondaryMuscle: exercise.secondaryMuscle,
				target: exercise.target,
			});
		}
	}, [createExercise]);

	return (
		<div>
			<div className="w-full flex flex-row justify-between items-center">
				<HeaderScreen
					title="Exercícios"
					description="Adicione novos exercícios"
				/>
				<div className="space-x-2">
					<Button
						variant={"outline"}
						disabled={isCreatingExercise}
						onClick={() => {
							seedingExercises();
							navigate(ROUTES.DASHBOARD);
						}}
					>
						Seed
					</Button>
					<Button
						form="create-exercise"
						type="submit"
						isLoading={isCreatingExercise}
					>
						Salvar
					</Button>
				</div>
			</div>
			<div className="flex flex-col mb-8">
				<small className="text-muted-foreground">
					Caso você queira realizar o seed dos exercícios no bando de dados,
					selecione o botão acima.
				</small>
				{(!isLoadingExercises || !isErrorExercises) && (
					<small className="text-muted-foreground">
						Atualmente, temos {exercises?.length} exercícios cadastrados.
					</small>
				)}
			</div>
			<ExerciseForm
				onSubmit={async (data) => {
					toast.promise(createExercise(data), {
						loading: "Criando exercício...",
						success: "Exercício criado com sucesso!",
						error: "Ocorreu um erro ao criar o exercício.",
					});
					navigate(ROUTES.DASHBOARD);
				}}
				isSubmitting={isCreatingExercise}
				formId="create-exercise"
			/>
		</div>
	);
}
