import {
	Button,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	RenderIf,
	Spinner,
} from "@shared/ui";

import { DeleteWorkoutModal } from "../../modals/delete-workout-modal";
import { useWorkoutCardHeaderHook } from "./useWorkoutHeader";

interface WorkoutCardHeaderProps {
	children: React.ReactNode;
}

export function WorkoutCardHeader(props: WorkoutCardHeaderProps) {
	const { children } = props;

	const {
		status,
		deleteWorkoutModalIsOpen,
		handleDuplicateWorkout,
		navigateToUpdateWorkout,
		toggleDeleteWorkoutModal,
		handleDeleteWorkout,
	} = useWorkoutCardHeaderHook();

	function renderWorkoutActions() {
		return (
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
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
							toggleDeleteWorkoutModal();
						}}
					>
						<Icon name="trash" className="h-4 w-4 mr-2" />
						Deletar treino
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<CardHeader className="flex flex-col gap-2">
			<div className="flex flex-row justify-between items-center">
				<CardTitle className="flex items-center justify-start">
					{children}
				</CardTitle>
				<RenderIf
					condition={status === "pending"}
					render={<Spinner className="h-5 w-5 mr-1" />}
				/>

				<RenderIf
					condition={status === "error"}
					render={
						<Icon
							name="crossCircled"
							className="text-destructive h-5 w-5 mr-1"
						/>
					}
				/>

				<RenderIf
					condition={status !== "pending" && status !== "error"}
					render={renderWorkoutActions()}
				/>
			</div>

			<DeleteWorkoutModal
				isOpen={deleteWorkoutModalIsOpen}
				onClose={toggleDeleteWorkoutModal}
				onDeleteWorkout={handleDeleteWorkout}
			/>
		</CardHeader>
	);
}
