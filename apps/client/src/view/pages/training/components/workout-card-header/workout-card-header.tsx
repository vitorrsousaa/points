import {
	Button,
	CardHeader,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	Spinner,
} from "@shared/ui";
import { useCallback, useReducer } from "react";
import { DeleteWorkoutModal } from "../../modals/delete-workout-modal";
import { useWorkoutCardContext } from "../workout-card/workout-card";

interface WorkoutCardHeaderProps {
	children: React.ReactNode;
}

export function WorkoutCardHeader(props: WorkoutCardHeaderProps) {
	const { children } = props;

	const { id, status } = useWorkoutCardContext();

	const [deleteWorkoutModalIsOpen, toggleDeleteWorkoutModal] = useReducer(
		(state) => !state,
		false,
	);

	const handleDeleteWorkout = useCallback(() => {
		console.log("deleting workout");
		console.log(id);
		toggleDeleteWorkoutModal();
	}, [id]);

	return (
		<CardHeader className="p-2 flex flex-row justify-between items-center">
			{children}
			{status === "pending" ? (
				<Spinner className="h-5 w-5 mr-1" />
			) : status === "error" ? (
				<Icon name="crossCircled" className="text-destructive h-5 w-5 mr-1" />
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<Icon name="dots" className="h-4 w-4 rotate-90" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>

						<DropdownMenuItem>
							<Icon name="archive" className="h-4 w-4 mr-2" />
							Desativar treino
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icon name="clipboard" className="h-4 w-4 mr-2" />
							Duplicar treino
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icon name="pencil" className="h-4 w-4 mr-2" />
							Editar treino
						</DropdownMenuItem>
						<DropdownMenuItem onClick={toggleDeleteWorkoutModal}>
							<Icon name="trash" className="h-4 w-4 mr-2" />
							Deletar treino
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}

			<DeleteWorkoutModal
				isOpen={deleteWorkoutModalIsOpen}
				onClose={toggleDeleteWorkoutModal}
				onDeleteWorkout={handleDeleteWorkout}
			/>
		</CardHeader>
	);
}
