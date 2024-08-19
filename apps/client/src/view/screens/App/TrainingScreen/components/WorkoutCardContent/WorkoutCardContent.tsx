import type { Workout } from "@/entitites/workout";
import { Badge, CardContent } from "@shared/ui";

interface WorkoutCardContentProps {
	exercises: Workout["exercises"];
}

export function WorkoutCardContent(props: WorkoutCardContentProps) {
	const { exercises } = props;

	return (
		<CardContent className="p-2 h-full">
			{exercises.map((exercise, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={`exercise-${index}`}
				>
					<small className="text-muted-foreground">{exercise.name}</small>
					<Badge className="ml-4 py-[0.1rem] px-[0.5rem] hidden sm:inline-flex">
						{exercise.sets.length} sets
					</Badge>
				</div>
			))}

			{/* 
									 <CardContent>
												 <Table>
													<TableHeader>
														<TableRow>
															<TableHead>Nome</TableHead>
															<TableHead>Equipamento</TableHead>

															<TableHead className="hidden min-[540px]:table-cell">
																<span className="sr-only">Ações</span>
															</TableHead>
														</TableRow>
													</TableHeader>

													<TableBody>
														<TableCell>
															{workout.exercises[0].name}
														</TableCell>

														<TableCell>
															{workout.exercises[0].equipment}
														</TableCell>
													</TableBody>
												</Table> 
											</CardContent>  */}
		</CardContent>
	);
}
