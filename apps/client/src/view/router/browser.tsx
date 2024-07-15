import { ROUTES } from "@/config/routes";
import { Home } from "@/pages/Home";
import { Signup } from "@/pages/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route path="/" element={<Home />} />
				<Route path={ROUTES.SIGNUP} element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}
