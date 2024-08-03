import { useGetAthleteById } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "@/hooks/navigate";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Icon,
	Spinner,
} from "@shared/ui";
import { useParams } from "react-router-dom";

export function Training() {
	const { athleteId } = useParams<{ athleteId: string }>();

	const { id } = useAuth();

	const { navigate } = useNavigate();

	const { athlete, isErrorAthlete, isLoadingAthlete } = useGetAthleteById({
		athleteId,
		coachId: id,
	});

	console.log(athlete);

	const hasTraining = false;
	return (
		<>
			{isLoadingAthlete ? (
				<div className="w-full flex flex-col gap-4 items-center justify-center mt-14">
					<small>Buscando os dados do atleta...</small>
					<Spinner />
				</div>
			) : isErrorAthlete ? (
				<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
					<strong className="font-medium">
						Tivemos um erro para buscar os dados do atleta.
					</strong>
					<span className="text-muted-foreground">Tente novamente!</span>
				</div>
			) : (
				<>
					<div className="grid flex-1 items-start gap-4 md:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Atleta</CardTitle>
								<CardDescription>Informações do atleta.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-1">
									<small>Nome: {athlete?.name}</small>
									<small>Idade: {athlete?.age} anos</small>
									<small>Peso: {athlete?.weight} kg</small>
									<small>Altura: {athlete?.height} cm</small>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row justify-between items-center">
								<div>
									<CardTitle>Treinos</CardTitle>
									<CardDescription>
										Acompanhe o desempenho do atleta.
									</CardDescription>
								</div>
								<Button
									size="sm"
									className="h-9 gap-1"
									onClick={() =>
										navigate("NEW_TRAINING", {
											replace: { athleteId: athleteId || "" },
										})
									}
								>
									<Icon name="plusCircle" className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Adicionar treino
									</span>
								</Button>
							</CardHeader>
							<CardContent>
								{hasTraining ? (
									<>tem treino</>
								) : (
									<div className="flex flex-col items-center mt-12 gap-2 mb-12">
										<small>
											Este atleta ainda não possui um treinamento cadastrado
										</small>
										<small>
											Clique no botão acima para adicionar um novo treino.
										</small>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</>
	);
}
