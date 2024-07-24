import { ROUTES } from "@/config/routes";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@shared/ui";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MobSidebar, Sidebar } from "./components/sidebar";

export function DashboardLayout() {
	const { pathname } = useLocation();

	const path = capitalizeFirstLetter(
		`${pathname.split("/")[1]}${
			pathname.split("/")[2] ? `/${pathname.split("/")[2]}` : ""
		}`,
	);

	return (
		<div>
			<Sidebar />
			<div className="sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="sm:hidden">
								<Icon name="hamburger" className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<MobSidebar />
						</SheetContent>
					</Sheet>
					<Breadcrumb className="hidden md:flex">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to="">Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<BreadcrumbPage>{capitalizeFirstLetter(path)}</BreadcrumbPage>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="overflow-hidden rounded-full ml-auto"
							>
								<Icon name="person" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to={ROUTES.SETTINGS}>Configurações</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								// onClick={signout}
								className="hover:cursor-pointer"
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
			</div>
			<div className="sm:pl-14 sm:py-4 flex min-h-screen w-full flex-col bg-muted/40">
				<main className="p-4 sm:px-6 sm:py-0 min-h-screen">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
