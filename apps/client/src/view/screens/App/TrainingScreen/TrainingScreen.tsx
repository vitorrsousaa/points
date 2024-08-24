import { useGetAthleteById } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "@/hooks/navigate";
import { useGetAllWorkouts } from "@/hooks/workout";
import {
	Badge,
	Button,
	Card,
	CardContent,
	HeaderScreen,
	Icon,
	RenderIf,
	RenderIfElse,
	Skeleton,
} from "@shared/ui";
import { useParams } from "react-router-dom";
import { WorkoutCard } from "./components/WorkoutCard";
import { WorkoutCardContent } from "./components/WorkoutCardContent";
import { WorkoutCardHeader } from "./components/WorkoutCardHeader";

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

	const { navigate } = useNavigate();

	return (
		<>
			<HeaderScreen
				title="Informações do atleta"
				description="Acompanhe o desempenho do atleta e adicione novos treinos."
			/>

			<RenderIf
				condition={isLoadingAthlete}
				render={
					<div className="w-full flex flex-col gap-4 items-center justify-center mt-14 mb-14">
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
						condition={Boolean(athlete && !isLoadingAthlete)}
						render={
							<Card>
								<CardContent className="py-4 flex ">
									<div className="w-full grid gap-6 lg:grid-cols-2 grid-cols-1 sm:grid-cols-2">
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

					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-col gap-1">
							<h2 className="text-xl font-bold tracking-tight">Treinos</h2>

							<span className="text-muted-foreground">
								Clique em um treino e saiba mais informações sobre.
							</span>
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
							<Icon name="plusCircle" className="h-5 w-5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Adicionar treino
							</span>
						</Button>
					</div>

					<RenderIfElse
						condition={hasTraining}
						ifRender={
							<div className="gap-4 grid flex-wrapgrid lg:grid-cols-2 grid-cols-1 sm:grid-cols-2">
								{workouts?.map((workout) => (
									<WorkoutCard
										key={workout.id}
										id={workout.id}
										workout={workout}
										status={workout.status}
									>
										<WorkoutCardHeader>
											{workout.name}

											<Badge
												className="ml-2"
												variant={workout.isActive ? "default" : "secondary"}
											>
												{workout.isActive ? "Ativo" : "Inativo"}
											</Badge>
										</WorkoutCardHeader>

										<WorkoutCardContent />
									</WorkoutCard>
								))}
							</div>
						}
						elseRender={
							<RenderIfElse
								condition={isLoadingWorkouts}
								ifRender={
									<div className="w-full flex items-center justify-center ">
										<Skeleton className="w-full h-20" />
									</div>
								}
								elseRender={
									<div className="flex flex-col items-center mt-12 gap-2 mb-12">
										<span>
											Este atleta ainda não possui um treinamento cadastrado
										</span>
										<small>
											Clique no botão acima para adicionar um novo treino.
										</small>
									</div>
								}
							/>
						}
					/>
				</div>
			</>
		</>
	);
}
