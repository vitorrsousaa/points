import type { WorkoutReview } from "@/entitites/workout-review";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Icon,
} from "@shared/ui";

interface WorkoutReviewCardProps {
	workoutReview: WorkoutReview;
}

export function WorkoutReviewCard(props: WorkoutReviewCardProps) {
	const { workoutReview: review } = props;

	const formatedDate = new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(new Date(review.createdAt));

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="py-4">
				<CardTitle>{review.workoutName}</CardTitle>
				<CardDescription>
					<Badge variant="secondary" className="mt-1">
						Pendente
					</Badge>
				</CardDescription>
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
				<Button variant="outline" className="w-full">
					<Icon name="eyeOpen" className="w-4 h-4 mr-2" />
					Revisar
				</Button>
			</CardContent>
		</Card>
	);
}
