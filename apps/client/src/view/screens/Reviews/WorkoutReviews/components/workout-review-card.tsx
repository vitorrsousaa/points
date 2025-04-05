import type { WorkoutReview } from "@/entitites/workout-review";
import { useNavigate } from "@/hooks/navigate";
import type { Status } from "@/utils/types";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Icon,
	cn,
} from "@shared/ui";

interface WorkoutReviewCardProps {
	workoutReview: WorkoutReview;
	status?: Status;
}

export function WorkoutReviewCard(props: WorkoutReviewCardProps) {
	const { workoutReview: review, status } = props;

	const formatedDate = new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(new Date(review.createdAt));

	const { navigate } = useNavigate();

	const navigateToReview = () => {
		navigate("UPDATE_WORKOUT_REVIEW", {
			replace: {
				workoutReviewId: review.id,
			},
		});
	};

	return (
		<Card
			className={cn(
				"hover:shadow-lg transition-shadow ",
				status === "error" && "bg-destructive/5",
			)}
		>
			<CardHeader className="py-4">
				<CardTitle className="flex items-center gap-4 justify-between">
					{review.workoutName}

					<Badge variant="secondary" className="mt-1">
						{review.reviewed ? "Revisado" : "Pendente"}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-1">
					<div className="flex items-center">
						<Icon name="person" className="w-4 h-4 mr-2" />

						<span className="text-sm">{review.athleteName}</span>
					</div>
					<div className="flex items-center">
						<Icon name="calendar" className="w-4 h-4 mr-2" />

						<span className="text-sm">{formatedDate}</span>
					</div>
				</div>
				<Button
					variant="outline"
					className={cn("w-full", status === "error" && "bg-destructive/10")}
					onClick={navigateToReview}
				>
					<Icon name="eyeOpen" className="w-4 h-4 mr-2" />

					{status === "error" && "Erro ao revisar treino"}
					{status !== "error" &&
						(review.reviewed ? "Treino revisado" : "Revisar")}
				</Button>
			</CardContent>
		</Card>
	);
}
