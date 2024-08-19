import { ROUTES } from "@/config/routes";
import { useGetAthleteById } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import { useGetAllWorkouts } from "@/hooks/workout";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	HeaderScreen,
	Icon,
	RenderIf,
	RenderIfElse,
	Skeleton,
	Tooltip,
} from "@shared/ui";
import { Link, useParams } from "react-router-dom";

export function TrainingScreen() {
	const { athleteId } = useParams<{ athleteId: string }>();

	const { id } = useAuth();

	const { athlete, isErrorAthlete, isLoadingAthlete } = useGetAthleteById({
		athleteId,
		coachId: id,
	});

	const { workouts, isLoadingWorkouts, isErrorWorkouts } =
		useGetAllWorkouts(athleteId);

	const hasTraining = Boolean(
		workouts && workouts?.length > 0 && !isLoadingWorkouts,
	);

	return (
		<>
			<HeaderScreen
				title="Informações do atleta"
				description="Acompanhe o desempenho do atleta e adicione novos treinos."
			/>

			<RenderIf
				condition={isLoadingAthlete || isLoadingWorkouts}
				render={
					<div className="w-full flex flex-col gap-4 items-center justify-center mt-14">
						<Skeleton className="w-full h-20" />
					</div>
				}
			/>

			<RenderIf
				condition={isErrorAthlete || isErrorWorkouts}
				render={
					<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
						<strong className="font-medium">
							Tivemos um erro para buscar os dados do atleta.
						</strong>
						<span className="text-muted-foreground">Tente novamente!</span>
					</div>
				}
			/>

			<>
				<div className="grid flex-1 items-start gap-4 md:gap-8">
					<RenderIf
						condition={Boolean(
							athlete && !isLoadingAthlete && !isLoadingWorkouts,
						)}
						render={
							<Card>
								<CardContent className="py-4 flex ">
									<div className="w-full grid gap-10 flex flex-wrapgrid lg:grid-cols-2 grid-cols-1 sm:grid-cols-2">
										<div className="flex flex-col gap-1">
											<strong>Nome: </strong>
											<small className="flex items-center gap-2">
												{athlete?.name}

												<Badge
													variant={
														athlete?.accountConfirmation
															? "default"
															: "secondary"
													}
												>
													{athlete?.accountConfirmation ? "Ativo" : "Inativo"}
												</Badge>
											</small>
										</div>

										<div className="flex flex-col gap-1">
											<strong>Email: </strong>
											<small>{athlete?.email}</small>
										</div>

										<div className="flex flex-col gap-1">
											<strong>Idade: </strong>
											<small> {athlete?.age} anos</small>
										</div>

										<div className="flex flex-col gap-1">
											<strong>Peso: </strong>
											<small>{athlete?.weight} kg</small>
										</div>

										<div className="flex flex-col gap-1">
											<strong>Altura: </strong>
											<small>{athlete?.height} cm</small>
										</div>
									</div>
								</CardContent>
							</Card>
						}
					/>

					<div className="flex flex-col gap-1">
						<h2 className="text-xl font-bold tracking-tight">Treinos</h2>

						<span className="text-muted-foreground">
							Acompanhe o desempenho do atleta.
						</span>
					</div>

					<RenderIfElse
						condition={hasTraining}
						ifRender={
							<div className="gap-4 grid flex-wrapgrid lg:grid-cols-2 grid-cols-1 sm:grid-cols-2">
								{workouts?.map((workout) => (
									<Card key={workout.id} className="h-full">
										<CardHeader className="flex flex-col justify-between items-center gap-4">
											<div className="flex gap-2 justify-between items-center w-full">
												<CardTitle className="text-xl flex items-center gap-4">
													{workout.name}

													<Badge>Regenerativo</Badge>
												</CardTitle>

												<DropdownMenu>
													<Tooltip content="Ações">
														<DropdownMenuTrigger asChild>
															<Button
																aria-haspopup="true"
																size="icon"
																variant="ghost"
															>
																<Icon name="dots" className="h-4 w-4" />
																<span className="sr-only">Toggle menu</span>
															</Button>
														</DropdownMenuTrigger>
													</Tooltip>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Ações</DropdownMenuLabel>

														<Link to={ROUTES.ATHLETES}>
															<DropdownMenuItem>Editar</DropdownMenuItem>
														</Link>

														<DropdownMenuItem>Duplicar</DropdownMenuItem>
														<DropdownMenuItem>Deletar</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>

											<CardDescription className="text-pretty line-clamp-2">
												Esse treino tem como objetivo facilitar a execução de
												exercícios para o atleta. Para isto, é necessário seguir
												as instruções e realizar os exercícios conforme a
												orientação do treinador.
											</CardDescription>
										</CardHeader>

										{/* <CardContent>
													{/* <Table>
													<TableHeader>
														<TableRow>
															<TableHead>Nome</TableHead>
															<TableHead>Equipamento</TableHead>

															<TableHead className="hidden min-[540px]:table-cell">
																<span className="sr-only">Ações</span>
															</TableHead>
														</TableRow>
													</TableHeader>

													<TableBody>
														<TableCell>
															{workout.exercises[0].name}
														</TableCell>

														<TableCell>
															{workout.exercises[0].equipment}
														</TableCell>
													</TableBody>
												</Table> 
											</CardContent> */}
									</Card>
								))}
							</div>
						}
						elseRender={
							<div className="flex flex-col items-center mt-12 gap-2 mb-12">
								<small>
									Este atleta ainda não possui um treinamento cadastrado
								</small>
								<small>
									Clique no botão acima para adicionar um novo treino.
								</small>
							</div>
						}
					/>
				</div>
			</>
		</>
	);
}
