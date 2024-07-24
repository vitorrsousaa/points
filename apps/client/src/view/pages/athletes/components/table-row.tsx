import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";

import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	Spinner,
	TableCell,
	TableRow as UITableRow,
	cn,
} from "@shared/ui";
import type { ReactNode } from "react";

interface TableRowProps {
	children: ReactNode;
	status?: "pending" | "error";
}

export function TableRowAthlete({ children, status }: TableRowProps) {
	return (
		<UITableRow
			className={cn(
				"h-12 align-middle",
				status === "error" && "bg-destructive/10 hover:bg-destructive/20",
			)}
		>
			{children}
		</UITableRow>
	);
}

export function TableAvailableAthlete({
	isAvailable,
}: { isAvailable: boolean }) {
	return (
		<TableCell className="hidden md:table-cell">
			<Badge variant={isAvailable ? "default" : "secondary"}>
				{isAvailable ? "Ativo" : "Inativo"}
			</Badge>
		</TableCell>
	);
}

export function TableActions({
	status,
	productId,
}: {
	status?: "pending" | "error";
	productId: string;
}) {
	console.log(productId);
	return (
		<TableCell className="hidden min-[540px]:flex text-center justify-center h-12 items-center">
			{status === "error" ? (
				<Icon name="crossCircled" className="text-destructive w-5 h-5" />
			) : status === "pending" ? (
				<Spinner className="w-5 h-5" />
			) : (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<Icon name="dots" className="h-4 w-4" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<Link to={ROUTES.ATHLETES}>
								<DropdownMenuItem>Editar</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>Deletar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
		</TableCell>
	);
}
