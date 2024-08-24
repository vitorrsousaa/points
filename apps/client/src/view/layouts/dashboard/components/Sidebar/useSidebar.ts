import { useAuth } from "@/hooks/auth";

export function useSidebar() {
	const { name, email } = useAuth();

	return {
		name,
		email,
	};
}
