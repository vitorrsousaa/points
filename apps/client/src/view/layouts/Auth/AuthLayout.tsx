import { Outlet } from "react-router-dom";

export function AuthLayout() {
	return (
		<div className="w-full h-full lg:grid lg:grid-cols-[420px_1fr] sm:min-h-[760px] max-md:px-6">
			<Outlet />
		</div>
	);
}
