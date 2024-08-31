import { QUERY_KEYS } from "@/config/queryKeys";
import { coachServices } from "@/services/coach";
import { useQuery } from "@tanstack/react-query";

export function useGetAthleteGrowth() {
	const { data, isError, isPending, isLoading, isFetching } = useQuery({
		queryKey: QUERY_KEYS.ATHLETE_GROWTH,
		queryFn: coachServices.getAthleteGrowth,
	});

	return {
		growth: data,
		isErrorAthleteGrowth: isError,
		isLoadingAthleteGrowth: isLoading || isPending,
		isFetchingAthleteGrowth: isFetching,
	};
}
