import { useAuth } from "@/hooks/auth";
import { useReviewedWorkoutReview } from "@/hooks/workout-review";
import {
	Avatar,
	AvatarFallback,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Icon,
} from "@shared/ui";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkoutReviewContext } from "../UpdateWorkoutReviewContext";

export function CardWorkoutHeader() {
	const { workoutReview } = useWorkoutReviewContext();

	if (!workoutReview) return null;

	const { athleteName, endTime } = workoutReview;

	const [firstName, lastName] = athleteName.split(" ");

	const formatedName = `${firstName[0]}${lastName[0]}`;

	function formatWorkoutTime(endDate: number) {
		const start = new Date();
		const end = new Date(endDate);

		const difference = start.getTime() - end.getTime();

		const hoursAgo = Math.floor(difference / (1000 * 60 * 60));
		const minutesAgo = Math.floor(
			(difference % (1000 * 60 * 60)) / (1000 * 60),
		);

		if (hoursAgo < 1) {
			return `${minutesAgo} minutos atrás`;
		}
		if (hoursAgo < 24) {
			return `${hoursAgo} horas e ${minutesAgo} minutos atrás`;
		}

		const options = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return end.toLocaleString("pt-BR", options as Intl.DateTimeFormatOptions);
	}

	const formatDate = formatWorkoutTime(endTime);

	const dialogCardInfo = useMemo(
		() => (
			<Dialog>
				<DialogTrigger asChild>
					<Button style={{ all: "unset", cursor: "pointer" }} size={"icon"}>
						<Icon name="questionMark" className="size-7" />
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="gap-2">
						<DialogTitle>Visualização do treino</DialogTitle>
						<DialogDescription>
							Nesta tela, você pode visualizar todos os exercícios realizados
							pelo atleta durante o treino. Ao clicar em "Revisar", o treino
							será marcado como revisado. Aproveite para conferir as cargas
							utilizadas e garantir um acompanhamento eficaz!
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		),
		[],
	);

	const navigate = useNavigate();

	const { id } = useAuth();

	const { reviewed } = useReviewedWorkoutReview({ coachId: id || "" });

	const handleReview = () => {
		reviewed({ workoutReview });
		navigate(-1);
	};

	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-row gap-2 items-center">
					<Avatar>
						<AvatarFallback>{formatedName}</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle>{athleteName}</CardTitle>
						<CardDescription>{formatDate}</CardDescription>
					</div>
				</div>

				{dialogCardInfo}
			</CardHeader>

			<CardContent className="pb-0">
				<CardTitle>Treino: {workoutReview?.workoutName}</CardTitle>
				<CardDescription>
					{workoutReview.notes || "Descrição do treino não informada"}
				</CardDescription>
			</CardContent>

			<CardFooter className="justify-end space-x-2">
				<Button variant={"outline"} onClick={() => navigate(-1)}>
					Voltar
				</Button>
				<Button onClick={handleReview}>Revisar</Button>
			</CardFooter>
		</Card>
	);
}
