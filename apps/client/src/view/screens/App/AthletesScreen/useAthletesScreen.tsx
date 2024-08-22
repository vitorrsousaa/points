import { useGetAllAthletes } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import { useDebounce } from "@/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
	SearchForm,
	type SearchFormSchemaTypes,
	searchFormDefaultValues,
} from "./searchFormSchema";

export function useAthletesScreen() {
	const { id } = useAuth();

	const { athletes, isLoadingAthletes, isErrorAthletes } =
		useGetAllAthletes(id);

	const hasAthletes = Boolean(athletes && athletes?.length > 0);

	const { control: searchControl, watch: searchWatch } =
		useForm<SearchFormSchemaTypes>({
			mode: "onChange",
			defaultValues: searchFormDefaultValues,
			resolver: zodResolver(SearchForm),
		});

	const searchTerm = useDebounce(searchWatch("search"), 300);

	const filteredAthletes = useMemo(() => {
		if (!athletes) {
			return [];
		}

		if (!searchTerm) {
			return athletes;
		}

		return athletes.filter((athlete) =>
			athlete.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [athletes, searchTerm]);

	return {
		athletes,
		filteredAthletes,
		searchControl,
		isLoadingAthletes,
		isErrorAthletes,
		hasAthletes,
	};
}
