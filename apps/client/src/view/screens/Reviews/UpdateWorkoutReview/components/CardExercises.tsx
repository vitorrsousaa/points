import type { Workout } from "@/entitites/workout";
import type { WorkoutReview } from "@/entitites/workout-review";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Icon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";
import { useMemo } from "react";
import { useWorkoutReviewContext } from "../UpdateWorkoutReviewContext";

interface BaseCardProps {
	planned: Workout["exercises"][0];
	realized?: Workout["exercises"][0];
}

function BaseCard(props: BaseCardProps) {
	const { planned, realized } = props;

	const dialogCardInfo = useMemo(
		() => (
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
							Nesta seção, o treinador pode visualizar como foi o desempenho do
							atleta dentro de cada exercício proposto. Comparando as séries,
							repetições, carga e RPE planejado com o realizado, é possível
							identificar pontos de melhoria e ajustar o treino para aprimorar o
							desempenho do atleta.
							<br />
							<br />
							Em cada coluna é possível visualizar a série, as repetições, a
							carga e o RPE planejado e realizado. Caso o atleta não tenha
							realizado o exercício, a coluna não será preenchida.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		),
		[],
	);

	return (
		<Card className="w-full">
			<Collapsible defaultOpen>
				<CardHeader className="flex flex-row justify-between items-start">
					<div className="space-y-1">
						<CardTitle>{planned.name}</CardTitle>
						<CardDescription>
							{planned.notes ||
								"Não foi criado nenhuma anotação para este exercício."}
						</CardDescription>
					</div>
					<div className="flex gap-3">
						{dialogCardInfo}
						<CollapsibleTrigger asChild>
							<Button size={"icon"} variant={"outline"}>
								<Icon name="double_arrow" className="size-5" />
							</Button>
						</CollapsibleTrigger>
					</div>
				</CardHeader>
				<CollapsibleContent>
					<CardContent>
						<ExerciseComparison
							plannedExercise={planned}
							realizedExercise={realized}
						/>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
}

function ExerciseComparison({
	plannedExercise,
	realizedExercise,
}: {
	plannedExercise: WorkoutReview["plannedExercises"][0];
	realizedExercise?: WorkoutReview["plannedExercises"][0];
}) {
	if (!plannedExercise) return null;

	const nullableValue = <Icon name="value_none" />;

	const dialogAboutSets = useMemo(
		() => (
			<Dialog>
				<DialogTrigger asChild>
					<Button style={{ all: "unset", cursor: "pointer" }} size={"icon"}>
						<Icon name="questionMark" />
					</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="gap-2">
						<DialogTitle>Como funciona ?</DialogTitle>
						<DialogDescription>
							Nesta coluna, adicionaremos qual a série que o atleta fez, e o
							tipo da série realizada. As séries podem ser do tipo "T", que são
							consideradas séries de trabalho, ou do tipo "W", que são
							consideradas séries de aquecimento. A definição das séries é feita
							durante a construção do protocolo de treinamento.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		),
		[],
	);

	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="flex items-center gap-1">
							Série {dialogAboutSets}
						</TableHead>
						<TableHead>Reps (P/R)</TableHead>
						<TableHead>Carga (P/R)</TableHead>
						<TableHead>RPE (P/R)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{plannedExercise.sets?.map((plannedSet, index) => {
						const realizedSet = realizedExercise?.sets?.[index];
						return (
							<TableRow
								key={`${plannedExercise.exerciseId}-tableRow-${realizedExercise?.exerciseId}`}
							>
								<TableCell className="font-medium">
									{index + 1} - {plannedSet.type}
								</TableCell>
								<TableCell>
									<span className="inline-flex items-center">
										{plannedSet?.reps || "N/A"}
									</span>{" "}
									/{" "}
									<span className="inline-flex items-center">
										{realizedSet?.reps || nullableValue}
									</span>
								</TableCell>
								<TableCell>
									<span className="inline-flex items-center">
										{plannedSet?.weight || "N/A"}
									</span>{" "}
									/{" "}
									<span className="inline-flex items-center">
										{realizedSet?.weight || nullableValue}
									</span>
								</TableCell>
								<TableCell>
									<span className="inline-flex items-center">
										{plannedSet?.rpe || "N/A"}
									</span>{" "}
									/{" "}
									<span className="inline-flex items-center">
										{realizedSet?.rpe || nullableValue}
									</span>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export function CardExercise() {
	const { workoutReview } = useWorkoutReviewContext();

	if (!workoutReview) return null;

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-0.5">
				<strong>Exercícios realizados</strong>
				<small className="text-muted-foreground">
					Analise todos os exercícios realizados pelo atleta
				</small>
			</div>
			<div className="flex gap-4 flex-col">
				{workoutReview.plannedExercises.map((plannedExercise, index) => (
					<BaseCard
						key={`${plannedExercise.name}-${plannedExercise.exerciseId}`}
						planned={plannedExercise}
						realized={workoutReview.realizedExercises[index]}
					/>
				))}
			</div>
		</div>
	);
}
