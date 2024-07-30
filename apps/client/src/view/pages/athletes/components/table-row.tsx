import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";

import { useNavigate } from "@/hooks/navigate";
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
	Tooltip,
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
				status === "error" &&
					"bg-destructive/10 border-2 border-destructive/50 rounded-sm",
			)}
		>
			{children}
		</UITableRow>
	);
}

export function TableAvailableAthlete({ isActive }: { isActive: boolean }) {
	return (
		<TableCell className="hidden md:table-cell">
			<Badge variant={isActive ? "default" : "secondary"}>
				{isActive ? "Ativo" : "Inativo"}
			</Badge>
		</TableCell>
	);
}

export function TableActions({
	status,
	athleteId,
}: {
	status?: "pending" | "error";
	athleteId: string;
}) {
	const { navigate } = useNavigate();

	return (
		<TableCell className="hidden min-[540px]:flex text-center justify-center h-12 items-center">
			{status === "error" ? (
				<Tooltip content="Erro ao carregar">
					<Button aria-haspopup="true" size="icon" variant="ghost">
						<Icon name="crossCircled" className="text-primary w-5 h-5" />
						<span className="sr-only">Error</span>
					</Button>
				</Tooltip>
			) : status === "pending" ? (
				<Spinner className="w-5 h-5" />
			) : (
				<div className="space-x-2">
					<Tooltip content="Ver treino">
						<Button
							aria-haspopup="true"
							size="icon"
							variant="ghost"
							onClick={() =>
								navigate("TRAINING", {
									replace: { athleteId },
								})
							}
						>
							<Icon name="lightning" className="h-4 w-4" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</Tooltip>
					<DropdownMenu>
						<Tooltip content="Ações">
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup="true" size="icon" variant="ghost">
									<Icon name="dots" className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
						</Tooltip>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>

							<Link to={ROUTES.ATHLETES}>
								<DropdownMenuItem>Editar</DropdownMenuItem>
							</Link>

							<DropdownMenuItem>Deletar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</TableCell>
	);
}
