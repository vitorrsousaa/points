import { Outlet } from "react-router-dom";
import { Sidebar } from "./components";

export function DashboardLayout() {
	return (
		<div className="bg-muted/10 p-2">
			<div className="">
				<Sidebar />

				<div className="sm:pl-[280px] sm:py-4 flex min-h-screen w-full flex-col">
					<main className="p-4 sm:px-6 sm:py-0 min-h-screen max-w-4xl w-full m-auto">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
