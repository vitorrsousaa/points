import { useGetAthleteById } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "@/hooks/navigate";
import { useGetAllWorkouts } from "@/hooks/workout";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	Spinner,
	cn,
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

	const { workouts, isLoadingWorkouts, isErrorWorkouts } =
		useGetAllWorkouts(athleteId);

	const hasTraining = Boolean(workouts && workouts?.length > 0);

	return (
		<>
			{isLoadingAthlete || isLoadingWorkouts ? (
				<div className="w-full flex flex-col gap-4 items-center justify-center mt-14">
					<small>Buscando os dados do atleta...</small>
					<Spinner />
				</div>
			) : isErrorAthlete || isErrorWorkouts ? (
				<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
					<strong className="font-medium">
						Tivemos um erro para buscar os dados do atleta.
					</strong>
					<span className="text-muted-foreground">Tente novamente!</span>
				</div>
			) : (
				<>
					<div className="grid flex-1 items-start gap-4">
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
										Acompanhe os treinos do atleta.
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
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{workouts?.map((workout) => (
											<Card
												key={workout.id}
												className={cn(
													workout.status === "error" &&
														"border-destructive/50 bg-destructive/5",
												)}
											>
												<CardHeader className="p-2 flex flex-row justify-between items-center">
													{workout.name}
													{workout.status === "pending" ? (
														<Spinner className="h-5 w-5 mr-1" />
													) : workout.status === "error" ? (
														<Icon
															name="crossCircled"
															className="text-destructive h-5 w-5 mr-1"
														/>
													) : (
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<Icon
																		name="dots"
																		className="h-4 w-4 rotate-90"
																	/>
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Ações</DropdownMenuLabel>

																<DropdownMenuItem>
																	<Icon
																		name="archive"
																		className="h-4 w-4 mr-2"
																	/>
																	Desativar treino
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<Icon
																		name="clipboard"
																		className="h-4 w-4 mr-2"
																	/>
																	Duplicar treino
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<Icon
																		name="pencil"
																		className="h-4 w-4 mr-2"
																	/>
																	Editar treino
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<Icon name="trash" className="h-4 w-4 mr-2" />
																	Deletar treino
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													)}
												</CardHeader>
												<CardFooter className="p-2">Volume</CardFooter>
											</Card>
										))}
									</div>
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
