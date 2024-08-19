import { ROUTES } from "@/config/routes";
import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
	isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
	const { signedIn } = useAuth();

	if (!signedIn && isPrivate) {
		return <Navigate to={ROUTES.SIGNIN} replace />;
	}

	if (signedIn && !isPrivate) {
		return <Navigate to={ROUTES.DASHBOARD} replace />;
	}

	return <Outlet />;
}
