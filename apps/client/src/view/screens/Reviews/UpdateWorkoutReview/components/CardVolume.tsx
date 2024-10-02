import type { Workout } from "@/entitites/workout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";
import { useWorkoutReviewContext } from "../UpdateWorkoutReviewContext";

interface BaseCardProps {
	isLoading?: boolean;
	isError?: boolean;
	type: "sets" | "load";
	planned: Workout["volume"];
	realized: Workout["volume"];
}

function BaseCard(props: BaseCardProps) {
	const { isLoading, isError, type, planned, realized } = props;

	const title =
		type === "sets" ? "Volume de treino - Séries" : "Volume de treino - Carga";
	const description =
		type === "sets"
			? "Compare o volume de séries planejado e realizado para aprimorar seu treino."
			: "Analise a carga planejada e levantada para otimizar seu desempenho no treino.";

	if (isLoading) {
		return <Skeleton className="h-50 w-full rounded-xl" />;
	}

	if (isError) {
		return (
			<Card className="w-full h-50 bg-destructive/8">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<small>Ocorreu um erro ao carregar o volume de treino</small>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead />
							<TableHead>S</TableHead>
							<TableHead>B</TableHead>
							<TableHead>D</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Planejado</TableCell>
							<TableCell>
								{planned.S[type === "sets" ? "sets" : "load"]}
							</TableCell>
							<TableCell>
								{planned.B[type === "sets" ? "sets" : "load"]}
							</TableCell>
							<TableCell>
								{planned.D[type === "sets" ? "sets" : "load"]}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Realizado</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}
							</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}
							</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export function CardVolume() {
	const { workoutReview, isErrorWorkoutReview, isLoadingWorkoutReview } =
		useWorkoutReviewContext();

	if (!workoutReview) return null;

	return (
		<div className="flex gap-4 flex-col min-[890px]:flex-row">
			<BaseCard
				isLoading={isLoadingWorkoutReview}
				isError={isErrorWorkoutReview}
				type="sets"
				planned={workoutReview?.plannedVolume}
				realized={workoutReview?.realizedVolume}
			/>
			<BaseCard
				isLoading={isLoadingWorkoutReview}
				isError={isErrorWorkoutReview}
				type="load"
				planned={workoutReview?.plannedVolume}
				realized={workoutReview?.realizedVolume}
			/>
		</div>
	);
}
