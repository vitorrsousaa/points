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
	RenderIfElse,
	Skeleton,
} from "@shared/ui";
import { useNavigate } from "react-router-dom";
import { Onboarding } from "./components";

export function DashboardScreen() {
	const { id } = useAuth();

	const {
		isErrorWorkoutReviews,
		isLoadingWorkoutReviews,
		isFetchingWorkoutReviews,
		workoutReviews,
		refetchWorkoutReviews,
	} = useGetAllWorkoutReview(OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(id || ""));

	const refetchReviews = () => {
		refetchWorkoutReviews();
	};

	const navigate = useNavigate();

	const navigateToWorkoutReviews = () => {
		navigate(ROUTES.WORKOUT_REVIEW);
	};

	return (
		<div className="w-full flex flex-col">
			<Onboarding />
			<HeaderScreen title="Visão geral" />

			<main>
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="space-y-4">
						<RenderIfElse
							condition={isLoadingWorkoutReviews || isFetchingWorkoutReviews}
							ifRender={<Skeleton className="h-40 rounded-lg" />}
							elseRender={
								<RenderIfElse
									condition={isErrorWorkoutReviews}
									ifRender={
										<Card
											className="sm:col-span-2"
											x-chunk="dashboard-05-chunk-0"
										>
											<CardHeader className="pb-3">
												<CardTitle>Seus atletas</CardTitle>
												<CardDescription className="text-balance leading-relaxed w-full">
													Erro ao carregar as revisões de treino.
												</CardDescription>
											</CardHeader>
											<CardFooter>
												<Button onClick={refetchReviews}>
													Tente novamente
												</Button>
											</CardFooter>
										</Card>
									}
									elseRender={
										<Card
											className="sm:col-span-2"
											x-chunk="dashboard-05-chunk-0"
										>
											<CardHeader className="pb-3">
												<CardTitle>Seus atletas</CardTitle>
												<CardDescription className="text-balance leading-relaxed w-full">
													Você possui {workoutReviews.length} treinos pendentes
													para revisar e aprovar. Click no botão abaixo para
													visualizar.
												</CardDescription>
											</CardHeader>
											<CardFooter>
												<Button onClick={navigateToWorkoutReviews}>
													Visualizar treinos
												</Button>
											</CardFooter>
										</Card>
									}
								/>
							}
						/>
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Treinos desta semana</CardDescription>
									<CardTitle className="text-4xl">3</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+25% a mais que a semana passada
									</div>
								</CardContent>
							</Card>
							<Card x-chunk="dashboard-05-chunk-2">
								<CardHeader className="pb-2">
									<CardDescription>This Month</CardDescription>
									<CardTitle className="text-4xl">$5,329</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+10% from last month
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
