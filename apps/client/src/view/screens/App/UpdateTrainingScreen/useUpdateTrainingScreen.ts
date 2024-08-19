import type { TTrainingFormSchema } from "@/components/TrainingForm/TrainingFormSchema";
import { useAuth } from "@/hooks/auth";
import { useUpdateWorkout } from "@/hooks/workout";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function useUpdateWorkoutHook() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const { id } = useAuth();

	const { athleteId, workoutId } = useParams<{
		athleteId: string;
		workoutId: string;
	}>();

	const { updateWorkout, isUpdatingWorkout } = useUpdateWorkout();

	const handleUpdateWorkout = useCallback(
		async (data: TTrainingFormSchema) => {
			if (!athleteId || !id || !workoutId) return;

			navigate(-1);

			updateWorkout({
				workout: {
					...data,
					id: workoutId,
					visibility: state?.workout?.visibility,
				},
				athleteId,
				coachId: id,
			});
		},
		[athleteId, navigate, updateWorkout, id, state, workoutId],
	);

	const hasWorkout = useMemo(() => Boolean(state?.workout), [state]);

	return {
		isUpdatingWorkout,
		hasWorkout,
		workout: state?.workout,
		handleUpdateWorkout,
		navigate,
	};
}
