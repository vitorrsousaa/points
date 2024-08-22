import { z } from "zod";

export const SearchForm = z.object({
	search: z.string(),
});

export type SearchFormSchemaTypes = z.infer<typeof SearchForm>;

export const searchFormDefaultValues: SearchFormSchemaTypes = {
	search: "",
};
