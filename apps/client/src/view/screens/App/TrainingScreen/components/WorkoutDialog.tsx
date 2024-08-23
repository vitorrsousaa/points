import type { Workout } from "@/entitites/workout";
import {
	Badge,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	RenderIfElse,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";
import type React from "react";
import { useWorkoutCardHeaderHook } from "./WorkoutCardHeader/useWorkoutHeader";

interface WorkoutDialogProps {
	workout: Workout;
	children: React.ReactNode;
}

export function WorkoutDialog({ workout, children }: WorkoutDialogProps) {
	const {
		handleDuplicateWorkout,
		navigateToUpdateWorkout,
		handleDeleteWorkout,
	} = useWorkoutCardHeaderHook();

	function renderWorkoutActions() {
		return (
			<div className="absolute top-1.5 right-10">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<Icon name="dots" className="h-4 w-4 rotate-90" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>

						<DropdownMenuItem onClick={handleDuplicateWorkout}>
							<Icon name="clipboard" className="h-4 w-4 mr-2" />
							Duplicar treino
						</DropdownMenuItem>
						<DropdownMenuItem onClick={navigateToUpdateWorkout}>
							<Icon name="pencil" className="h-4 w-4 mr-2" />
							Editar treino
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleDeleteWorkout}>
							<Icon name="trash" className="h-4 w-4 mr-2" />
							Deletar treino
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>

			<DialogContent className="min-w-[50%]">
				{renderWorkoutActions()}

				<DialogHeader className="w-full flex flex-row items-center justify-between">
					<DialogTitle>
						{workout.name}

						<Badge
							className="ml-2"
							variant={workout.isActive ? "default" : "secondary"}
						>
							{workout.isActive ? "Ativo" : "Inativo"}
						</Badge>
					</DialogTitle>
				</DialogHeader>

				<DialogDescription>
					<RenderIfElse
						condition={!!workout.description}
						ifRender={workout.description}
						elseRender="Descrição do treino não informada. Adicione uma e visualize aqui."
					/>
				</DialogDescription>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nome</TableHead>
							<TableHead>Equipamento</TableHead>
							<TableHead>Músculo Primário</TableHead>
							<TableHead>Músculo Secundário</TableHead>
							<TableHead>SETS</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{workout.exercises?.map((exercise) => (
							<TableRow key={exercise.name}>
								<TableCell>{exercise.name}</TableCell>
								<TableCell>{exercise.equipment}</TableCell>
								<TableCell>
									<RenderIfElse
										condition={!!exercise.primaryMuscle}
										ifRender={exercise.primaryMuscle}
										elseRender="-"
									/>
								</TableCell>

								<TableCell>
									<RenderIfElse
										condition={!!exercise.secondaryMuscle}
										ifRender={exercise.secondaryMuscle}
										elseRender="-"
									/>
								</TableCell>

								<TableCell>
									<Dialog>
										<DialogTrigger>
											<Icon name="eyeOpen" />
										</DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle>{exercise.name}</DialogTitle>

												<DialogDescription>
													Abaixo a visualização dos "SETS" do equipamento
													selecionado.
												</DialogDescription>
											</DialogHeader>

											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>REPS</TableHead>
														<TableHead>Peso</TableHead>
													</TableRow>
												</TableHeader>

												<TableBody>
													{exercise.sets.map((set) => (
														<TableRow key={set.weight}>
															<TableCell>{set.reps}</TableCell>

															<TableCell>{set.weight}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</DialogContent>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
}
