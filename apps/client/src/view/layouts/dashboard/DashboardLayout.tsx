import { Button, Icon, Sheet, SheetContent, SheetTrigger } from "@shared/ui";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components";

export function DashboardLayout() {
	return (
		<div className="bg-muted/10 p-2">
			<div className="max-sm:hidden block">
				<Sidebar />
			</div>

			<Sheet>
				<SheetTrigger className="sm:hidden flex">
					<Button variant="ghost">
						<Icon name="hamburger" className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Sidebar />
				</SheetContent>
			</Sheet>

			<div className="sm:pl-[280px] sm:py-4 flex min-h-screen w-full flex-col">
				<main className="p-4 sm:px-6 sm:py-0 min-h-screen max-w-4xl w-full m-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
