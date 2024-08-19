import { ROUTES } from "@/config/routes";
import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	Input,
} from "@shared/ui";
import { Link } from "react-router-dom";

export function TableHeader() {
	return (
		<div className="ml-auto flex items-center gap-2">
			<Input
				className="h-9 w-72"
				placeholder="Pesquise pelo nome do atleta"
				type="text"
			/>

			<DropdownMenu>
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
			</DropdownMenu>

			<Link to={ROUTES.NEW_ATHLETE}>
				<Button size="sm" className="h-9 gap-1">
					<Icon name="plusCircle" className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Adicionar atleta
					</span>
				</Button>
			</Link>
		</div>
	);
}
