import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/config/routes";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Avatar,
	AvatarFallback,
	Button,
	Icon,
	Popover,
	PopoverContent,
	PopoverTrigger,
	type IconProps,
} from "@shared/ui";
import { useSidebar } from "./useSidebar";

interface NavSectionsProps {
	label: string;
	items: NavItemsProps[];
}

interface NavItemsProps {
	href: string;
	icon: IconProps["name"];
	label: string;
}

const NAV_ITEMS: NavSectionsProps[] = [
	{
		label: "Geral",
		items: [
			{
				href: ROUTES.DASHBOARD,
				icon: "home",
				label: "Página Inicial",
			},
		],
	},
	{
		label: "Meu Time",
		items: [
			{
				href: ROUTES.ATHLETES,
				icon: "person",
				label: "Atletas",
			},
		],
	},
];

export function Sidebar() {
	const { email, name, signout } = useSidebar();

	const { pathname } = useLocation();

	return (
		<aside className="flex fixed sm:min-w-[280px] inset-y-2 left-2 z-10 w-fit flex-col sm:rounded-xl sm:border p-4 sm:bg-muted/30">
			<nav className="flex flex-col gap-4 px-2 pt-1 w-full">
				<span className="text-lg font-semibold">GRYPP</span>

				<div className="w-full flex flex-col gap-6">
					{NAV_ITEMS.map((section) => (
						<div className="w-full flex flex-col" key={section.label}>
							<span className="text-muted-foreground text-sm mb-2">
								{section.label}
							</span>

							<div className="w-full">
								{section.items.map((item) => (
									<Button
										key={item.label}
										variant="ghost"
										className={`w-full p-0 ${
											pathname === item.href
												? "bg-accent text-accent-foreground"
												: ""
										}`}
									>
										<Link
											to={item.href}
											className="w-full flex items-center gap-2 px-4 py-2"
										>
											<Icon name={item.icon} />
											{item.label}
										</Link>
									</Button>
								))}
							</div>
						</div>
					))}
				</div>
			</nav>

			<Popover>
				<PopoverTrigger className="transition-colors hover:bg-accent border w-full mt-auto flex items-center gap-2 p-2 rounded-xl">
					<Avatar className="border rounded-full">
						<AvatarFallback className="rounded-none">
							{name?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start">
						<span className="font-semibold text-sm">{name}</span>
						<small className="text-muted-foreground text-xs">{email}</small>
					</div>

					<Icon name="double_arrow" className="ml-auto w-5 h-5" />
				</PopoverTrigger>

				<PopoverContent
					sideOffset={16}
					className="bg-card p-2 gap-1 flex flex-col shadow-none rounded-xl w-[246px]"
				>
					<Button variant="ghost" className="justify-start p-0">
						<Link
							to={ROUTES.SETTINGS}
							className="px-4 w-full h-full flex items-center justify-start font-normal"
						>
							Minha conta
						</Link>
					</Button>

					<AlertDialog>
						<AlertDialogTrigger>
							<Button
								variant="ghost"
								className="justify-start px-4 font-normal w-full"
							>
								Sair
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Você deseja realmente sair?</AlertDialogTitle>
								<AlertDialogDescription>
									Caso sair, esperamos ver você novamente em breve, até mais!!
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction onClick={signout}>Sair</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</PopoverContent>
			</Popover>
		</aside>
	);
}

export function MobSidebar() {
	const { email, name, signout } = useSidebar();

	const { pathname } = useLocation();

	return (
		<aside className="min-w-[280px] inset-y-2 left-2 z-10 w-fit flex-col sm:flex p-4 bg-muted/30">
			<nav className="flex flex-col gap-4 px-2 pt-1 w-full">
				<span className="text-lg font-semibold">GRYPP</span>

				<div className="w-full flex flex-col gap-6">
					{NAV_ITEMS.map((section) => (
						<div className="w-full flex flex-col" key={section.label}>
							<span className="text-muted-foreground text-sm mb-2">
								{section.label}
							</span>

							<div className="w-full">
								{section.items.map((item) => (
									<Button
										key={item.label}
										variant="ghost"
										className={`w-full p-0 ${
											pathname === item.href
												? "bg-accent text-accent-foreground"
												: ""
										}`}
									>
										<Link
											to={item.href}
											className="w-full flex items-center gap-2 px-4 py-2"
										>
											<Icon name={item.icon} />
											{item.label}
										</Link>
									</Button>
								))}
							</div>
						</div>
					))}
				</div>
			</nav>

			<Popover>
				<PopoverTrigger className="transition-colors hover:bg-accent border w-full mt-auto flex items-center gap-2 p-2 rounded-xl">
					<Avatar className="border rounded-full">
						<AvatarFallback className="rounded-none">
							{name?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start">
						<span className="font-semibold text-sm">{name}</span>
						<small className="text-muted-foreground text-xs">{email}</small>
					</div>

					<Icon name="double_arrow" className="ml-auto w-5 h-5" />
				</PopoverTrigger>

				<PopoverContent
					sideOffset={16}
					className="bg-card p-2 gap-1 flex flex-col shadow-none rounded-xl w-[246px]"
				>
					<Button variant="ghost" className="justify-start p-0">
						<Link
							to={ROUTES.SETTINGS}
							className="px-4 w-full h-full flex items-center justify-start font-normal"
						>
							Minha conta
						</Link>
					</Button>

					<AlertDialog>
						<AlertDialogTrigger>
							<Button
								variant="ghost"
								className="justify-start px-4 font-normal w-full"
							>
								Sair
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Você deseja realmente sair?</AlertDialogTitle>
								<AlertDialogDescription>
									Caso sair, esperamos ver você novamente em breve, até mais!!
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction onClick={signout}>Sair</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</PopoverContent>
			</Popover>
		</aside>
	);
}
