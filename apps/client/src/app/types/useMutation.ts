type DefaultObject = Record<string, unknown>;

export interface MutationOptions<TData, TVariables = DefaultObject> {
	onSuccess?: (data?: TData, variables?: TVariables) => void;
	onError?: (error: unknown, variables?: TVariables) => void;
	errorMessage?: string;
}
