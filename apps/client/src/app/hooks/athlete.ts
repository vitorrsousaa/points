import { athleteServices } from "@/services/athlete";
import { useMutation } from "@tanstack/react-query";

export function useCreateAthlete() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: athleteServices.create,
	});

	return {
		createAthlete: mutateAsync,
		isCreatingAthlete: isPending,
	};
}
