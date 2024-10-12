import { MUTATION_KEYS } from "@/config/mutationKeys";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Settings } from "@/entitites/Settings";
import { settingsService } from "@/services/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetSettings() {
	const { getSettings } = settingsService();

	const {
		data: settings,
		isLoading,
		isPending,
		isFetching,
		isError,
	} = useQuery({
		queryKey: QUERY_KEYS.SETTINGS,
		queryFn: getSettings,
	});

	return {
		settings,
		isLoading: isPending || isFetching || isLoading,
		isError,
	};
}

export function useUpdateSettings() {
	const { updateSettings } = settingsService();

	const { settings } = useGetSettings();

	const queryClient = useQueryClient();

	const {
		data: updatedSettings,
		isPending,
		isError,
		mutateAsync,
	} = useMutation<unknown, unknown, Partial<Settings>>({
		mutationKey: [MUTATION_KEYS.SETTINGS],
		mutationFn: (newSettings) => {
			if (!settings) {
				throw new Error("Settings are not initialized");
			}

			const updatedSettings = { ...settings, ...newSettings };

			return updateSettings(updatedSettings);
		},
		onMutate: async (newSettings) => {
			const oldSettings = queryClient.getQueryData<Settings>(
				QUERY_KEYS.SETTINGS,
			);

			const mergedSettings = { ...oldSettings, ...newSettings };

			queryClient.setQueryData(QUERY_KEYS.SETTINGS, () => mergedSettings);

			return oldSettings;
		},
		onError: async (_error, _variables, context) => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.SETTINGS,
			});

			queryClient.setQueryData(QUERY_KEYS.SETTINGS, context);
		},
		onSuccess: async () => {
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.SETTINGS,
			});
		},
	});

	return {
		updatedSettings,
		isPending,
		isError,
		execute: mutateAsync,
	};
}
