import { AthleteForm } from "@/components/AthleteForm";
import type { TAthleteFormSchema } from "@/components/AthleteForm/AthleteFormSchema";
import { useAuth } from "@/hooks/auth";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function UpdateAthleteScreen() {
	const navigate = useNavigate();
	const { id } = useAuth();

	const { state } = useLocation();

	const hasAthlete = Boolean(state?.athlete);

	const { athleteId } = useParams<{
		athleteId: string;
	}>();

	async function handleSubmit(data: TAthleteFormSchema) {
		if (!id) return;
		if (!athleteId) return;

		const newAthlete = { ...data, coachId: id };

		console.log(newAthlete);

		// navigate(ROUTES.ATHLETES);
	}

	return (
		<div className="grid flex-1 items-start gap-4 md:gap-8 w-full m-auto">
			<div className="flex items-center gap-8">
				<div className="flex gap-4 items-center">
					<HeaderScreen
						title="Atualizar atleta"
						description="Atualize as informações do atleta."
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
									Após o cadastro, o atleta poderá acessar o aplicativo e
									definir uma senha. Você poderá acompanhar o progresso dele e
									adicionar novos treinos.
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
						form="new-athlete-form"
						// isLoading={isCreatingAthlete}
					>
						Adicionar
					</Button>
				</div>
			</div>

			<AthleteForm
				onSubmit={handleSubmit}
				formId="new-athlete-form"
				initialValues={
					hasAthlete && {
						...state?.athlete,
						firstName: state?.athlete?.name.split(" ")[0],
						lastName:
							state?.athlete?.name.split(" ")[
								state?.athlete?.name.split(" ").length - 1
							],
					}
				}
				// isSubmitting={isCreatingAthlete}
			/>
		</div>
	);
}
