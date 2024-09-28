import { ROUTES } from "@/config/routes";
import {
	AthletesScreen,
	ConfirmationAccountScreen,
	DashboardScreen,
	ExercisesScreen,
	NewAthleteScreen,
	NewExerciseScreen,
	NewTrainingScreen,
	NotFoundScreen,
	SettingsScreen,
	SignInScreen,
	SignUpScreen,
	TrainingScreen,
	UpdateAthleteScreen,
	UpdateTrainingScreen,
	VerificationCodeScreen,
	WorkoutReviews,
} from "@/screens/index";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "../layouts";
import { AuthGuard } from "./AuthGuard";

export function RouterStack() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Navigate to={ROUTES.SIGNIN} replace />} />
						<Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />
						<Route path={ROUTES.SIGNIN} element={<SignInScreen />} />
						<Route
							path={ROUTES.CONFIRMATION_ACCOUNT}
							element={<ConfirmationAccountScreen />}
						/>
						<Route
							path={ROUTES.VERIFICATION}
							element={<VerificationCodeScreen />}
						/>
					</Route>
				</Route>

				<Route path="/" element={<AuthGuard isPrivate />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route path={ROUTES.DASHBOARD} element={<DashboardScreen />} />
						<Route path={ROUTES.ATHLETES} element={<AthletesScreen />} />
						<Route path={ROUTES.NEW_ATHLETE} element={<NewAthleteScreen />} />
						<Route
							path={ROUTES.UPDATE_ATHLETE}
							element={<UpdateAthleteScreen />}
						/>
						<Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
						<Route path={ROUTES.EXERCISES} element={<ExercisesScreen />} />
						<Route path={ROUTES.NEW_EXERCISE} element={<NewExerciseScreen />} />
						<Route
							path={ROUTES.ATHLETE_MORE_INFO}
							element={<TrainingScreen />}
						/>
						<Route
							path={ROUTES.UPDATE_WORKOUT}
							element={<UpdateTrainingScreen />}
						/>
						<Route path={ROUTES.NEW_TRAINING} element={<NewTrainingScreen />} />
						<Route path={ROUTES.WORKOUT_REVIEW} element={<WorkoutReviews />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	);
}
