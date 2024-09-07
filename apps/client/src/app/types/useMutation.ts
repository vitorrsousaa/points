export interface MutationOptions<TData, TVariables = {}> {
	onSuccess?: (data?: TData, variables?: TVariables) => void;
	onError?: (error: unknown, variables?: TVariables) => void;
	errorMessage?: string;
}
