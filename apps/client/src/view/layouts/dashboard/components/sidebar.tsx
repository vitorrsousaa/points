import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/config/routes";
import {
	Icon,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	cn,
} from "@shared/ui";

const navItems = [
	{
		href: ROUTES.PRODUCTS,
		icon: <Icon name="layers" className="h-5 w-5" />,
		label: "Produtos",
	},
	{
		href: ROUTES.SIGNIN,
		icon: <Icon name="layers" className="h-5 w-5" />,
		label: "Categorias",
	},
	{
		href: ROUTES.ATHLETES,
		icon: <Icon name="person" className="h-5 w-5" />,
		label: "Atletas",
	},
];

export function Sidebar() {
	const { pathname } = useLocation();

	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<Link
					to={ROUTES.SIGNIN}
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Icon
						name="home"
						className="h-4 w-4 transition-all group-hover:scale-110"
					/>

					<span className="sr-only">Lale pratas</span>
				</Link>

				{navItems.map((item) => (
					<TooltipProvider key={`${item.href}-${item.label}`}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to={item.href}
									className={cn(
										"flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
										pathname === item.href &&
											"bg-accent text-accent-foreground",
									)}
								>
									{item.icon}
									<span className="sr-only">{item.label}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">{item.label}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to={ROUTES.SIGNIN}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Icon name="settings" className="h-5 w-5" />
								<span className="sr-only">Configurações</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Configurações</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	);
}

export function MobSidebar() {
	const { pathname } = useLocation();

	return (
		<nav className="grid gap-6 text-lg font-medium">
			<Link
				to=""
				className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
			>
				<Icon
					name="home"
					className="h-4 w-4 transition-all group-hover:scale-110"
				/>

				<span className="sr-only">Lale pratas</span>
			</Link>

			{navItems.map((item) => (
				<Link
					to={item.href}
					className={cn(
						"flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground",
						pathname === item.href && "text-foreground",
					)}
					key={`${item.href}-${item.label}`}
				>
					{item.icon}
					<small>{item.label}</small>
				</Link>
			))}

			<Link
				to=""
				className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
			>
				<Icon name="settings" className="h-5 w-5" />
				<small>Configurações</small>
			</Link>
		</nav>
	);
}
