import type { Workout } from "@/entitites/workout";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Icon,
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
			<CardHeader className="flex flex-row items-start">
				<div className="space-y-1">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button style={{ all: "unset", cursor: "pointer" }} size={"icon"}>
							<Icon name="questionMark" className="h-5 w-5" />
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader className="gap-2">
							<DialogTitle>Como funciona ?</DialogTitle>
							<DialogDescription>
								O volume de treino considera apenas as séries de trabalho para
								os exercícios que envolvem os três principais lifts:
								agachamento, levantamento terra e supino.
								<br /> <br />
								Exemplo: Se você planejou 3 séries de 5 repetições de
								agachamento com 100 kg e completou todas, o volume contabilizado
								será de 1.500 kg (3 séries x 5 repetições x 100 kg).
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
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
								{planned.S[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
							</TableCell>
							<TableCell>
								{planned.B[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
							</TableCell>
							<TableCell>
								{planned.D[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Realizado</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
							</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
							</TableCell>
							<TableCell>
								{realized.S[type === "sets" ? "sets" : "load"]}{" "}
								<span className="hidden sm:inline-block">
									{type === "load" && "kg"}
								</span>
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
		<div className="space-y-4">
			<div className="flex flex-col gap-0.5">
				<strong>Volume de treino</strong>
				<small className="text-muted-foreground">
					Acompanhe o volume de treino do seu atleta
				</small>
			</div>
			<div className="flex gap-4 flex-col min-[990px]:flex-row">
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
		</div>
	);
}
