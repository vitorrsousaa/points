import { ROUTES } from "@/config/routes";

import {
	AthletesScreen,
	ConfirmationAccountScreen,
	DashboardScreen,
	ExercisesScreen,
	NewAthleteScreen,
	NewTrainingScreen,
	SettingsScreen,
	SignInScreen,
	SignUpScreen,
	TrainingScreen,
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
						<Route path={ROUTES.ATHLETES} element={<AthletesScreen />} />
						<Route path={ROUTES.NEW_ATHLETE} element={<NewAthleteScreen />} />
						<Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
						<Route path={ROUTES.EXERCISES} element={<ExercisesScreen />} />
						<Route
							path={ROUTES.ATHLETE_MORE_INFO}
							element={<TrainingScreen />}
						/>
						<Route path={ROUTES.NEW_TRAINING} element={<NewTrainingScreen />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
