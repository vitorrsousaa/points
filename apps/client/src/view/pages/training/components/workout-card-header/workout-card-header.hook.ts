import { useNavigate } from "@/hooks/navigate";
import { useRemoveWorkout } from "@/hooks/workout";
import { useCallback, useReducer } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useWorkoutCardContext } from "../workout-card/workout-card";

export function useWorkoutCardHeaderHook() {
	const { id, status, workout } = useWorkoutCardContext();

	const { athleteId } = useParams<{ athleteId: string }>();

	const [deleteWorkoutModalIsOpen, toggleDeleteWorkoutModal] = useReducer(
		(state) => !state,
		false,
	);

	const { removeWorkout } = useRemoveWorkout();

	const handleDeleteWorkout = useCallback(async () => {
		toast.promise(
			removeWorkout({ athleteId: athleteId || "", workoutId: id }),
			{
				loading: "Removendo treino...",
				success: "Treino removido com sucesso",
				error: "Tivemos um erro!",
			},
		);
		toggleDeleteWorkoutModal();
	}, [id, athleteId, removeWorkout]);

	const { navigate } = useNavigate();

	const handleDuplicateWorkout = useCallback(() => {
		navigate("NEW_TRAINING", {
			replace: { athleteId: athleteId || "" },
			state: { workout },
		});
	}, [navigate, athleteId, workout]);

	const navigateToUpdateWorkout = useCallback(() => {
		navigate("UPDATE_WORKOUT", {
			replace: { athleteId: athleteId || "", workoutId: id },
			state: { workout },
		});
	}, [athleteId, id, navigate, workout]);

	const [archiveWorkoutModalIsOpen, toggleArchiveWorkoutModal] = useReducer(
		(state) => !state,
		false,
	);

	const handleArchiveWorkout = useCallback(() => {
		console.log("archive");
	}, []);

	return {
		status,
		archiveWorkoutModalIsOpen,
		deleteWorkoutModalIsOpen,
		handleDuplicateWorkout,
		navigateToUpdateWorkout,
		toggleDeleteWorkoutModal,
		handleArchiveWorkout,
		handleDeleteWorkout,
		toggleArchiveWorkoutModal,
	};
}
