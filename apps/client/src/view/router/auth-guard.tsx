import { ROUTES } from "@/config/routes";
// import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
	isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
	// const { signedIn } = useAuth();

	const signedIn = false;

	if (!signedIn && isPrivate) {
		return <Navigate to={ROUTES.SIGNIN} replace />;
	}

	if (signedIn && !isPrivate) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return <Outlet />;
}
