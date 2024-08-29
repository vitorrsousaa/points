import { useAuth } from "@/hooks/auth";

export function useMyAccountTab() {
	const { email, name, isLoading } = useAuth();

	return {
		email,
		name,
		isLoading,
	};
}
