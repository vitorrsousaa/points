import { ROUTES } from "@/config/routes";

import {
	ConfirmationAccountScreen,
	DashboardScreen,
	ExercisesScreen,
	SettingsScreen,
	SignInScreen,
	SignUpScreen,
} from "@/screens/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard";
import { AuthGuard } from "./AuthGuard";

export function RouterStack() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />
					<Route path={ROUTES.SIGNIN} element={<SignInScreen />} />
					<Route
						path={ROUTES.CONFIRMATION_ACCOUNT}
						element={<ConfirmationAccountScreen />}
					/>
				</Route>
				<Route element={<AuthGuard isPrivate={true} />}>
					<Route element={<DashboardLayout />}>
						<Route path={ROUTES.DASHBOARD} element={<DashboardScreen />} />
						<Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
						<Route
							path={ROUTES.CREATE_EXERCISE}
							element={<ExercisesScreen />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
