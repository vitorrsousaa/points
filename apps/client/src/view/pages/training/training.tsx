import { useNavigate } from "@/hooks/navigate";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Icon,
} from "@shared/ui";
import { useParams } from "react-router-dom";

export function Training() {
	const { athleteId } = useParams<{ athleteId: string }>();

	const { navigate } = useNavigate();

	console.log(athleteId);

	const hasTraining = false;
	return (
		<>
			<div className="grid flex-1 items-start gap-4 md:gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Atleta</CardTitle>
						<CardDescription>Informações do atleta.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-1">
							<small>Nome: Joaquim da silva</small>
							<small>Idade: 24 anos</small>
							<small>Peso: 84 kg</small>
							<small>Altura: 1,80 m</small>
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
							<div className="flex flex-col items-center mt-12 gap-2">
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
	);
}
