import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@shared/ui";

interface DeleteWorkoutModalProps {
	onClose: () => void;
	isOpen: boolean;
	onDeleteWorkout: () => void;
}

export function DeleteWorkoutModal(props: DeleteWorkoutModalProps) {
	const { isOpen, onDeleteWorkout, onClose } = props;

	return (
		<Dialog open={isOpen}>
			<DialogContent
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader onClick={(e) => e.preventDefault()}>
					<DialogTitle>Deletar treino</DialogTitle>

					<DialogDescription>
						Tem certeza que deseja deletar esse treino? Essa ação não poderá ser
						revertida.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter
					onClick={(e) => e.preventDefault()}
					className="flex items-center gap-2"
				>
					<Button
						onClick={(e) => {
							e.preventDefault();
							onClose();
						}}
						variant="secondary"
					>
						Cancelar
					</Button>

					<Button
						onClick={(e) => {
							e.preventDefault();
							onDeleteWorkout();
						}}
					>
						Deletar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
