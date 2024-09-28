import { ROUTES } from "@/config/routes";
import { useAuth } from "@/hooks/auth";
import { useGetAllWorkoutReview } from "@/hooks/workout-review";
import {
	Button,
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
		useGetAllWorkoutReview({
			coachId: id || "",
			limit: 10,
			reviewed: false,
		});

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
						<div className="flex flex-col md:flex-row gap-4 mb-6">
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
						</div>

						<RenderIfElse
							condition={filteredAndSortedReviews.length > 0}
							ifRender={
								<div className="grid gap-6  lg:grid-cols-2">
									{filteredAndSortedReviews.map((review) => (
										<WorkoutReviewCard key={review.id} workoutReview={review} />
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
