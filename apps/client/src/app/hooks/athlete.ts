import { QUERY_KEYS } from "@/config/queryKeys";
import type { Athlete } from "@/entitites/athlete";
import { SentryHandler } from "@/libs/SentryHandler";
import { athleteServices } from "@/services/athlete";
import type { WithStatus } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AthletesQueryData = WithStatus<Athlete>[];

export function useCreateAthlete() {
	const queryClient = useQueryClient();

	const { sendEvent, sendException } = SentryHandler();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: athleteServices.create,
		onMutate: (variables) => {
			const { firstName, lastName } = variables;
			const tempId = Math.random().toString(36).substr(2, 9);
			const name = `${firstName} ${lastName}`;

			queryClient.setQueryData<AthletesQueryData>(
				QUERY_KEYS.ATHLETES,
				(oldData) =>
					oldData?.concat({
						id: tempId,
						status: "pending",
						name,
						accountConfirmation: false,
						...variables,
					}),
			);

			return { tempId };
		},
		onSuccess: async (data, variables, context) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ATHLETES });

			queryClient.setQueryData<AthletesQueryData>(
				QUERY_KEYS.ATHLETES,
				(oldData) =>
					oldData?.map((athlete) =>
						athlete.id === context?.tempId ? data : athlete,
					),
			);

			sendEvent({
				message: "CreateAthlete",
				level: "log",
				tags: {
					event_type: "transaction",
				},
				extra: {
					...variables,
				},
			});
		},
		onError: async (_error, _, context) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ATHLETES });

			queryClient.setQueryData<AthletesQueryData>(QUERY_KEYS.ATHLETES, (old) =>
				old?.map((athlete) =>
					athlete.id === context?.tempId
						? { ...athlete, status: "error" }
						: athlete,
				),
			);

			sendException({
				exceptionName: "create_athlete",
				..._error,
			});
		},
	});

	return {
		createAthlete: mutateAsync,
		isCreatingAthlete: isPending,
	};
}

export function useGetAllAthletes(coachId = "") {
	const { data, isLoading, isPending, isFetching, isError } = useQuery({
		queryKey: QUERY_KEYS.ATHLETES,
		queryFn: async () => {
			const response = await athleteServices.getAll({ coachId });

			return response as WithStatus<Athlete>[];
		},
	});

	return {
		athletes: data,
		isLoadingAthletes: isLoading || isPending || isFetching,
		isErrorAthletes: isError,
	};
}

export function useGetAthleteById({
	coachId,
	athleteId,
}: { coachId?: string; athleteId?: string }) {
	const { athletes, isErrorAthletes, isLoadingAthletes } =
		useGetAllAthletes(coachId);

	return {
		athlete: athletes?.find((athlete) => athlete.id === athleteId),
		isLoadingAthlete: isLoadingAthletes,
		isErrorAthlete: isErrorAthletes,
	};
}
