import { ROUTES } from "@/config/routes";
import { useAuth } from "@/hooks/auth";
import {
	OPTIONS_WORKOUT_REVIEW,
	useGetAllWorkoutReview,
} from "@/hooks/workout-review";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	HeaderScreen,
	Input,
	RenderIf,
	RenderIfElse,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Spinner,
} from "@shared/ui";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutReviewCard } from "./components/workout-review-card";

export function WorkoutReviews() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("date");

	const { id } = useAuth();

	const { isErrorWorkoutReviews, isLoadingWorkoutReviews, workoutReviews } =
		useGetAllWorkoutReview(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(id || ""));

	const filteredAndSortedReviews = useMemo(
		() =>
			workoutReviews
				.filter(
					(review) =>
						review.workoutName
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						review.athleteName.toLowerCase().includes(searchTerm.toLowerCase()),
				)
				.sort((a, b) => {
					if (sortBy === "date") {
						return (
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						);
					}
					if (sortBy === "athlete") {
						return a.athleteName.localeCompare(b.athleteName);
					}

					return a.workoutName.localeCompare(b.workoutName);
				}),
		[workoutReviews, searchTerm, sortBy],
	);

	const completedReviews = useMemo(() => {
		return workoutReviews.filter((workout) => workout.reviewed).length;
	}, [workoutReviews]);

	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4">
			<HeaderScreen
				title="Revisões de treino"
				description="Acompanhe as últimas atualizações dos seus atletas."
			/>

			<RenderIf
				condition={isLoadingWorkoutReviews}
				render={
					<div className="w-full flex flex-col gap-2 items-center justify-center mt-8">
						<Spinner />
						<span>Carregando suas revisões de treino...</span>
					</div>
				}
			/>

			<RenderIf
				condition={!isLoadingWorkoutReviews && isErrorWorkoutReviews}
				render={
					<div className="w-full flex flex-col gap-2 items-center justify-center mt-8">
						<span>Erro ao carregar suas revisões de treino.</span>
						<Button
							variant="outline"
							onClick={() => navigate(ROUTES.DASHBOARD)}
						>
							Tentar novamente
						</Button>
					</div>
				}
			/>

			<RenderIf
				condition={!isLoadingWorkoutReviews && !isErrorWorkoutReviews}
				render={
					<>
						<div className="flex flex-col sm:flex-row gap-4 mb-4">
							<Card className="w-full">
								<CardHeader className="pb-2 flex flex-row justify-between items-start">
									<div>
										<CardDescription>
											Total de treinos realizados
										</CardDescription>
										<CardTitle className="text-4xl">
											{workoutReviews.length}
										</CardTitle>
									</div>
								</CardHeader>

								<CardFooter>
									<p className="text-xs text-muted-foreground">
										Parabéns! Vocês estão evoluindo.
									</p>
								</CardFooter>
							</Card>

							<Card className="w-full">
								<CardHeader className="pb-2 flex flex-row justify-between items-start">
									<div>
										<CardDescription>
											Total de treinos revisados
										</CardDescription>
										<CardTitle className="text-4xl">
											{completedReviews}
										</CardTitle>
									</div>
								</CardHeader>

								<CardContent>
									<p className="text-xs text-muted-foreground">
										Revise os treinos dos seus atletas
									</p>
								</CardContent>
							</Card>
						</div>

						<Card className="p-4 rounded-xl border flex items-center">
							<CardContent className="p-0 w-full flex items-center justify-between gap-2">
								<Input
									type="text"
									placeholder="Procurar por treino ou atleta"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Select value={sortBy} onValueChange={setSortBy}>
									<SelectTrigger className="w-full md:w-[280px]">
										<SelectValue placeholder="Ordenar por" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="date">Ordenar por data</SelectItem>
										<SelectItem value="athlete">Ordenar por atleta</SelectItem>
										<SelectItem value="title">Ordenar por título</SelectItem>
									</SelectContent>
								</Select>
							</CardContent>
						</Card>

						<RenderIfElse
							condition={filteredAndSortedReviews.length > 0}
							ifRender={
								<div className="grid gap-6  lg:grid-cols-2">
									{filteredAndSortedReviews.map((review) => (
										<WorkoutReviewCard
											key={review.id}
											workoutReview={review}
											status={review.status}
										/>
									))}
								</div>
							}
							elseRender={
								<div className="w-full flex flex-col gap-2 items-center justify-center mt-8">
									<span>Nenhuma revisão de treino pendente.</span>
									<small>
										Seus atletas ainda não cadastraram treinos para serem
										revisados.
									</small>
								</div>
							}
						/>
					</>
				}
			/>
		</div>
	);
}
