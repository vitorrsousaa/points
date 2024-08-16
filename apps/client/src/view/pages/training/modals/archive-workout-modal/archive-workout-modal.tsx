import { Button, Modal } from "@shared/ui";

interface ArchiveWorkoutModalProps {
	onClose: () => void;
	isOpen: boolean;
	onArchiveWorkout: () => void;
}

export function ArchiveWorkoutModal(props: ArchiveWorkoutModalProps) {
	const { isOpen, onArchiveWorkout, onClose } = props;
	return (
		<Modal.Root isOpen={isOpen} onClose={() => {}}>
			<Modal.Header>
				<Modal.Title>Arquivar treino</Modal.Title>
				<Modal.Description>
					Tem certeza que deseja arquivar esse treino?
				</Modal.Description>
				<small className="text-md mt-4 mb-4">
					Este treino não poderá ser visualizado pelo atleta!
				</small>
				<Modal.Footer>
					<Button onClick={onClose} variant={"destructive"}>
						Cancelar
					</Button>
					<Button onClick={onArchiveWorkout}>Arquivar</Button>
				</Modal.Footer>
			</Modal.Header>
		</Modal.Root>
	);
}
