import { ExerciseForm, TExerciseFormSchema } from "@/components/ExerciseForm";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/hooks/auth";
import { useCreateCustomExercise } from "@/hooks/exercise";
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	HeaderScreen,
	Icon,
} from "@shared/ui";
import { useNavigate } from "react-router-dom";

export function NewExerciseScreen() {
	const navigate = useNavigate();
	const { id } = useAuth();
	const { createExercise, isCreatingExercise } = useCreateCustomExercise();

	async function handleSubmit(data: TExerciseFormSchema) {
		if (!id) return;

		const newExercise = { ...data, coachId: id };

		createExercise(newExercise);

		navigate(ROUTES.EXERCISES);
	}

	return (
		<div className="grid flex-1 items-start gap-4 md:gap-8 w-full m-auto">
			<div className="flex items-center gap-8">
				<div className="flex gap-4 items-center">
					<HeaderScreen
						title="Adicionar exercício"
						description="Crie um novo exercício customizado e utilize nos seus treinos."
					/>

					<Dialog>
						<DialogTrigger asChild>
							<Button style={{ all: "unset", cursor: "pointer" }} size={"icon"}>
								<Icon name="questionMark" className="h-5 w-5" />
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader className="gap-2">
								<DialogTitle>Como funciona ?</DialogTitle>
								<DialogDescription>
									Você pode definir todas as informações essenciais para criação
									de um exercício, e utilizá-lo nos treinos dos seus atletas.
								</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<Button>Entendi</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="flex flex-col items-center gap-4 md:ml-auto md:flex-row">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="secondary">Descartar</Button>
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
						form="new-exercise-form"
						isLoading={isCreatingExercise}
					>
						Adicionar
					</Button>
				</div>
			</div>

			<ExerciseForm
				onSubmit={handleSubmit}
				formId="new-exercise-form"
				isSubmitting={isCreatingExercise}
			/>
		</div>
	);
}
