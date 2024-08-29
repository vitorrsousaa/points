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
	UpdateTrainingScreen,
	VerificationCodeScreen,
} from "@/screens/index";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Outlet,
} from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard";
import { AuthGuard } from "./AuthGuard";

const routes = createRoutesFromElements(
	<Route element={<Outlet />}>
		<Route path="*" element={<>Error page</>} />
		<Route element={<AuthGuard isPrivate={false} />}>
			<Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />
			<Route path={ROUTES.SIGNIN} element={<SignInScreen />} />
			<Route
				path={ROUTES.CONFIRMATION_ACCOUNT}
				element={<ConfirmationAccountScreen />}
			/>
			<Route path={ROUTES.VERIFICATION} element={<VerificationCodeScreen />} />
		</Route>
		<Route element={<AuthGuard isPrivate={true} />}>
			<Route element={<DashboardLayout />}>
				<Route path={ROUTES.DASHBOARD} element={<DashboardScreen />} />
				<Route path={ROUTES.ATHLETES} element={<AthletesScreen />} />
				<Route path={ROUTES.NEW_ATHLETE} element={<NewAthleteScreen />} />
				<Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
				<Route path={ROUTES.EXERCISES} element={<ExercisesScreen />} />
				<Route path={ROUTES.ATHLETE_MORE_INFO} element={<TrainingScreen />} />
				<Route
					path={ROUTES.UPDATE_WORKOUT}
					element={<UpdateTrainingScreen />}
				/>
				<Route path={ROUTES.NEW_TRAINING} element={<NewTrainingScreen />} />
			</Route>
		</Route>
	</Route>,
);

// const router = createBrowserRouter([
// 	{
// 		element: <AuthGuard isPrivate={false} />,
// 		errorElement: <div>Error page</div>,
// 		children: [
// 			{
// 				path: ROUTES.SIGNUP,
// 				element: <SignUpScreen />,
// 			},
// 			{
// 				path: ROUTES.SIGNIN,
// 				element: <SignInScreen />,
// 			},
// 			{
// 				path: ROUTES.CONFIRMATION_ACCOUNT,
// 				element: <ConfirmationAccountScreen />,
// 			},
// 			{
// 				path: ROUTES.VERIFICATION,
// 				element: <VerificationCodeScreen />,
// 			},
// 		],
// 	},
// 	{
// 		element: <AuthGuard isPrivate={true} />,
// 		errorElement: <div>Error page</div>,
// 		children: [
// 			{
// 				element: <DashboardLayout />,
// 				children: [
// 					{
// 						path: ROUTES.DASHBOARD,
// 						element: <DashboardScreen />,
// 					},
// 					{
// 						path: ROUTES.ATHLETES,
// 						element: <AthletesScreen />,
// 					},
// 					{
// 						path: ROUTES.NEW_ATHLETE,
// 						element: <NewAthleteScreen />,
// 					},
// 					{
// 						path: ROUTES.SETTINGS,
// 						element: <SettingsScreen />,
// 					},
// 					{
// 						path: ROUTES.EXERCISES,
// 						element: <ExercisesScreen />,
// 					},
// 					{
// 						path: ROUTES.ATHLETE_MORE_INFO,
// 						element: <TrainingScreen />,
// 					},
// 					{
// 						path: ROUTES.UPDATE_WORKOUT,
// 						element: <UpdateTrainingScreen />,
// 					},
// 					{
// 						path: ROUTES.NEW_TRAINING,
// 						element: <NewTrainingScreen />,
// 					},
// 				],
// 			},
// 		],
// 	},
// ]);

const router = createBrowserRouter(routes);

export function RouterStack() {
	return (
		<RouterProvider router={router} />
		// <BrowserRouter>
		// 	<Routes>
		// 		<Route path="*" element={<>Error page</>} />
		// 		<Route element={<AuthGuard isPrivate={false} />}>
		// 			<Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />
		// 			<Route path={ROUTES.SIGNIN} element={<SignInScreen />} />
		// 			<Route
		// 				path={ROUTES.CONFIRMATION_ACCOUNT}
		// 				element={<ConfirmationAccountScreen />}
		// 			/>
		// 			<Route
		// 				path={ROUTES.VERIFICATION}
		// 				element={<VerificationCodeScreen />}
		// 			/>
		// 		</Route>
		// 		<Route element={<AuthGuard isPrivate={true} />}>
		// 			<Route element={<DashboardLayout />}>
		// 				<Route path={ROUTES.DASHBOARD} element={<DashboardScreen />} />
		// 				<Route path={ROUTES.ATHLETES} element={<AthletesScreen />} />
		// 				<Route path={ROUTES.NEW_ATHLETE} element={<NewAthleteScreen />} />
		// 				<Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
		// 				<Route path={ROUTES.EXERCISES} element={<ExercisesScreen />} />
		// 				<Route
		// 					path={ROUTES.ATHLETE_MORE_INFO}
		// 					element={<TrainingScreen />}
		// 				/>
		// 				<Route
		// 					path={ROUTES.UPDATE_WORKOUT}
		// 					element={<UpdateTrainingScreen />}
		// 				/>
		// 				<Route path={ROUTES.NEW_TRAINING} element={<NewTrainingScreen />} />
		// 			</Route>
		// 		</Route>
		// 	</Routes>
		// </BrowserRouter>
	);
}
