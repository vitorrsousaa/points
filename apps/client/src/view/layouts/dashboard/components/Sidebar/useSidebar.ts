import { useAuth } from "@/hooks/auth";

export function useSidebar() {
	const { name, email, signout } = useAuth();

	return {
		name,
		email,
		signout,
	};
}
