import { ROUTES } from "@/config/routes";
import type { WorkoutReview } from "@/entitites/workout-review";
import { useAuth } from "@/hooks/auth";
import {
	OPTIONS_WORKOUT_REVIEW,
	useGetWorkoutReviewById,
} from "@/hooks/workout-review";
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Icon,
	RenderIf,
	Spinner,
} from "@shared/ui";
import { createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface WorkoutReviewContextValue {
	workoutReview: WorkoutReview | null;
	isLoadingWorkoutReview: boolean;
	isErrorWorkoutReview: boolean;
}

const WorkoutReviewContext = createContext<WorkoutReviewContextValue>(
	{} as WorkoutReviewContextValue,
);

export function useWorkoutReviewContext() {
	const context = useContext(WorkoutReviewContext);

	if (!context) {
		throw new Error(
			"useWorkoutReviewContext must be used within an WorkoutReviewContextProvider",
		);
	}

	return context;
}

export function WorkoutReviewContextProvider(props: {
	children: React.ReactNode;
}) {
	const { id } = useAuth();

	const { workoutReviewId } = useParams<{ workoutReviewId: string }>();

	const { workoutReview, isLoadingWorkoutReview, isErrorWorkoutReview } =
		useGetWorkoutReviewById(
			workoutReviewId ?? "",
			OPTIONS_WORKOUT_REVIEW.NOT_REVIEWED(id || ""),
		);

	const navigate = useNavigate();

	const navigateToWorkoutReview = () => {
		navigate(ROUTES.WORKOUT_REVIEW);
	};

	const navigateToDashboard = () => {
		navigate(ROUTES.DASHBOARD);
	};

	return (
		<WorkoutReviewContext.Provider
			value={{ workoutReview, isLoadingWorkoutReview, isErrorWorkoutReview }}
		>
			<RenderIf
				condition={isLoadingWorkoutReview}
				render={
					<div className=" flex items-center justify-center">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
									<Spinner className="mr-2 w-7 h-7" />
									Carregando Revisão de Treino
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-muted-foreground">
									Estamos carregando a revisão de treino. Por favor, aguarde um
									momento.
								</p>
							</CardContent>
						</Card>
					</div>
				}
			/>
			<RenderIf
				condition={
					(isErrorWorkoutReview || workoutReview === null) &&
					!isLoadingWorkoutReview
				}
				render={
					<div className=" flex items-center justify-center">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
									<Icon name="questionMark" className="mr-2 w-7 h-7" />
									{/* <AlertCircle className="w-6 h-6 mr-2 text-red-500" /> */}
									Revisão de Treino Não Encontrada
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-muted-foreground mb-4">
									Desculpe, não foi possível encontrar a revisão de treino que
									você está procurando. Isso pode ter acontecido porque:
								</p>
								<ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
									<li>A URL que você digitou está incorreta</li>
									<li>A revisão de treino foi removida ou não existe mais</li>
									<li>
										Você não tem permissão para acessar esta revisão de treino
									</li>
								</ul>
								<p className="text-center text-muted-foreground">
									Por favor, verifique a URL e tente novamente. Se o problema
									persistir, entre em contato com o suporte.
								</p>
							</CardContent>
							<CardFooter className="flex flex-col space-y-4 justify-center md:space-x-4 md:flex-row md:space-y-0">
								<Button onClick={navigateToDashboard}>
									Voltar para a Página Inicial
								</Button>
								<Button variant="outline" onClick={navigateToWorkoutReview}>
									Tentar Novamente
								</Button>
							</CardFooter>
						</Card>
					</div>
				}
			/>
			<RenderIf condition={Boolean(workoutReview)} render={props.children} />
		</WorkoutReviewContext.Provider>
	);
}
