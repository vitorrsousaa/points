import { ROUTES } from "@/config/routes";
import { Athletes } from "@/pages/athletes";
import { ConfirmationAccount } from "@/pages/confirmation-account";
import { Dashboard } from "@/pages/dashboard";
import { Exercises } from "@/pages/exercises";
import { NewAthlete } from "@/pages/new-athlete";
import { NewTraining } from "@/pages/new-training";
import { Settings } from "@/pages/settings";
import { Signin } from "@/pages/signin";
import { Signup } from "@/pages/signup";
import { Training } from "@/pages/training";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard";
import { AuthGuard } from "./auth-guard";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route path={ROUTES.SIGNUP} element={<Signup />} />
					<Route path={ROUTES.SIGNIN} element={<Signin />} />
					<Route
						path={ROUTES.CONFIRMATION_ACCOUNT}
						element={<ConfirmationAccount />}
					/>
				</Route>
				<Route element={<AuthGuard isPrivate={true} />}>
					<Route element={<DashboardLayout />}>
						<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
						<Route path={ROUTES.ATHLETES} element={<Athletes />} />
						<Route path={ROUTES.NEW_ATHLETE} element={<NewAthlete />} />
						<Route path={ROUTES.SETTINGS} element={<Settings />} />
						<Route path={ROUTES.EXERCISES} element={<Exercises />} />
						<Route path={ROUTES.ATHLETE_MORE_INFO} element={<Training />} />
						<Route path={ROUTES.NEW_TRAINING} element={<NewTraining />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
