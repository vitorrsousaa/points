import { Button, Modal } from "@shared/ui";

interface DeleteWorkoutModalProps {
	onClose: () => void;
	isOpen: boolean;
	onDeleteWorkout: () => void;
}

export function DeleteWorkoutModal(props: DeleteWorkoutModalProps) {
	const { isOpen, onDeleteWorkout, onClose } = props;
	return (
		<Modal.Root isOpen={isOpen} onClose={() => {}}>
			<Modal.Header>
				<Modal.Title>Deletar treino</Modal.Title>
				<Modal.Description>
					Tem certeza que deseja deletar esse treino?
				</Modal.Description>
				<small className="text-md mt-4 mb-4">
					Essa ação não pode ser desfeita!
				</small>
				<Modal.Footer>
					<Button onClick={onClose} variant={"destructive"}>
						Cancelar
					</Button>
					<Button onClick={onDeleteWorkout}>Deletar</Button>
				</Modal.Footer>
			</Modal.Header>
		</Modal.Root>
	);
}
