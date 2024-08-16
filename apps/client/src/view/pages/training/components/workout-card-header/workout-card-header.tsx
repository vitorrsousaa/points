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

import { ArchiveWorkoutModal } from "../../modals/archive-workout-modal";
import { DeleteWorkoutModal } from "../../modals/delete-workout-modal";
import { useWorkoutCardHeaderHook } from "./workout-card-header.hook";

interface WorkoutCardHeaderProps {
	children: React.ReactNode;
}

export function WorkoutCardHeader(props: WorkoutCardHeaderProps) {
	const { children } = props;

	const {
		status,
		archiveWorkoutModalIsOpen,
		deleteWorkoutModalIsOpen,
		handleDuplicateWorkout,
		navigateToUpdateWorkout,
		toggleDeleteWorkoutModal,
		handleArchiveWorkout,
		handleDeleteWorkout,
		toggleArchiveWorkoutModal,
	} = useWorkoutCardHeaderHook();

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

						<DropdownMenuItem onClick={toggleArchiveWorkoutModal}>
							<Icon name="archive" className="h-4 w-4 mr-2" />
							Arquivar treino
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleDuplicateWorkout}>
							<Icon name="clipboard" className="h-4 w-4 mr-2" />
							Duplicar treino
						</DropdownMenuItem>
						<DropdownMenuItem onClick={navigateToUpdateWorkout}>
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

			<ArchiveWorkoutModal
				isOpen={archiveWorkoutModalIsOpen}
				onClose={toggleArchiveWorkoutModal}
				onArchiveWorkout={handleArchiveWorkout}
			/>

			<DeleteWorkoutModal
				isOpen={deleteWorkoutModalIsOpen}
				onClose={toggleDeleteWorkoutModal}
				onDeleteWorkout={handleDeleteWorkout}
			/>
		</CardHeader>
	);
}
