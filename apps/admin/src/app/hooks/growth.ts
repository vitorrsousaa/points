import { QUERY_KEYS } from "@/config/queryKeys";
import { adminServices } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export function useGrowthAthlete(period: number) {
	const { data, isError, isPending, isLoading, isFetching } = useQuery({
		queryKey: QUERY_KEYS.GROWTH_ATHLETE(period),
		queryFn: () => adminServices.growthAthlete({ period }),
	});

	return {
		growthAthlete: data,
		isLoadingGrowthAthlete: isPending || isLoading,
		isErrorGrowthAthlete: isError,
		isFetchingGrowthAthlete: isFetching,
	};
}

export function useGrowthCoach(period: number) {
	const { data, isError, isPending, isLoading, isFetching } = useQuery({
		queryKey: QUERY_KEYS.GROWTH_COACH(period),
		queryFn: () => adminServices.growthCoach({ period }),
	});

	return {
		growthCoach: data,
		isLoadingGrowthCoach: isPending || isLoading,
		isErrorGrowthCoach: isError,
		isFetchingGrowthCoach: isFetching,
	};
}
