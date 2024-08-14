import { AthleteForm } from "@/components/athlete-form";
import type { TAthleteFormSchema } from "@/components/athlete-form/athlete-form.schema";
import { ROUTES } from "@/config/routes";
import { useCreateAthlete } from "@/hooks/athlete";
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
	Icon,
} from "@shared/ui";
import { useNavigate } from "react-router-dom";

export function NewAthlete() {
	const navigate = useNavigate();
	const { id } = useAuth();
	const { createAthlete, isCreatingAthlete } = useCreateAthlete();

	async function handleSubmit(data: TAthleteFormSchema) {
		if (!id) return;

		const newAthlete = { ...data, coachId: id };

		createAthlete(newAthlete);

		navigate(ROUTES.ATHLETES);
	}

	return (
		<div className="grid flex-1 items-start gap-4 md:gap-8 max-w-2xl m-auto">
			<div className="flex items-center gap-8">
				<div className="flex gap-4 items-center">
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Novo atleta
					</h1>

					<Dialog>
						<DialogTrigger asChild>
							<Button style={{ all: "unset", cursor: "pointer" }}>
								<Icon name="questionMark" className="h-6 w-6" />
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader className="gap-2">
								<DialogTitle>Como funciona?</DialogTitle>
								<DialogDescription>
									Após o cadastro, o atleta poderá acessar o aplicativo e
									definir uma senha. Você poderá acompanhar o progresso dele e
									adicionar novos treinos.
								</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<Button type="submit">Entendi</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="items-center gap-4 md:ml-auto md:flex">
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
						isLoading={isCreatingAthlete}
					>
						Adicionar
					</Button>
				</div>
			</div>

			<AthleteForm
				onSubmit={handleSubmit}
				formId="new-athlete-form"
				isSubmitting={isCreatingAthlete}
			/>
		</div>
	);
}
