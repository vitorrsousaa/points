import { AthleteForm } from "@/components/athlete-form";
import type { TAthleteFormSchema } from "@/components/athlete-form/athlete-form.schema";
import { ROUTES } from "@/config/routes";
import { useCreateAthlete } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
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
		<div className="grid flex-1 items-start gap-4 md:gap-8">
			<Card>
				<CardHeader>
					<CardTitle>Adicionando um novo atleta</CardTitle>
					<CardDescription>
						Adicione todas as informações necessárias para criar um novo atleta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AthleteForm
						onSubmit={handleSubmit}
						formId="new-athlete-form"
						isSubmitting={isCreatingAthlete}
					/>
				</CardContent>
				<CardFooter className="w-full gap-2 flex flex-row justify-end">
					<Button variant={"secondary"} onClick={() => navigate(-1)}>
						Cancelar
					</Button>
					<Button
						type="submit"
						form="new-athlete-form"
						isLoading={isCreatingAthlete}
					>
						Salvar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
