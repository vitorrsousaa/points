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
import { useUpdateWorkoutHook } from "./update-workout.hook";

export function UpdateWorkout() {
	const {
		isUpdatingWorkout,
		hasWorkout,
		workout,
		handleCreateWorkout,
		navigate,
	} = useUpdateWorkoutHook();

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
						isSubmitting={isUpdatingWorkout}
						onSubmit={handleCreateWorkout}
						formId="update-training-form"
						initialValues={hasWorkout && workout}
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button
						variant={"secondary"}
						onClick={() => navigate(-1)}
						disabled={isUpdatingWorkout}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="update-training-form"
						isLoading={isUpdatingWorkout}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
