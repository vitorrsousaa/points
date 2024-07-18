import { ROUTES } from "@/config/routes";
import { Home } from "@/pages/Home";
import { ConfirmationAccount } from "@/pages/confirmation-account";
import { Signin } from "@/pages/signin";
import { Signup } from "@/pages/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route path="/" element={<Home />} />
				<Route path={ROUTES.SIGNUP} element={<Signup />} />
				<Route path={ROUTES.SIGNIN} element={<Signin />} />
				<Route
					path={ROUTES.CONFIRMATION_ACCOUNT}
					element={<ConfirmationAccount />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
