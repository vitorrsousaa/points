import { ROUTES } from "@/config/routes";
import { Button, Icon, Input } from "@shared/ui";
import { Link } from "react-router-dom";

export function AthleteTableHeader() {
	return (
		<div className="w-full flex items-center justify-end gap-2">
			{/* <DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="h-9 gap-1">
						<Icon name="filter" className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Filtro
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Categoria</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu> */}

			<div className="flex items-center gap-2">
				<Input
					className="h-9 w-72 border bg-transparent"
					placeholder="Busque pelo nome..."
					type="text"
				/>

				<Link to={ROUTES.NEW_ATHLETE}>
					<Button size="sm" className="h-9 gap-1">
						<Icon name="plusCircle" className="h-5 w-5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Adicionar atleta
						</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
