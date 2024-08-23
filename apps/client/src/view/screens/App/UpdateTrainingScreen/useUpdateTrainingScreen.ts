import type { TTrainingFormSchema } from "@/components/TrainingForm/TrainingFormSchema";
import type { Workout } from "@/entitites/workout";
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

			const workout: Workout = {
				...data,
				description: data.description,
				name: data.name,
				isActive: data.isActive,
				exercises: data.exercises,
				category: data.category,
				createdAt: state?.workout?.createdAt || new Date().toISOString(),
				updatedAt: state?.workout?.updatedAt || new Date().toISOString(),
				id: workoutId,
				volume: state?.workout?.volume,
			};

			updateWorkout({
				workout,
				athleteId,
				coachId: id,
			});
		},
		[athleteId, navigate, updateWorkout, id, workoutId, state],
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
