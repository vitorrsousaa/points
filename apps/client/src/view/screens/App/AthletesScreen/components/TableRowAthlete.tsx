import type { Athlete } from "@/entitites/athlete";
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
	RenderIf,
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
				"h-20 align-middle",
				status === "error" &&
					"bg-destructive/10 border-2 border-destructive/50 rounded-sm",
			)}
		>
			{children}
		</UITableRow>
	);
}

export function TableAvailableAthlete({
	isActive,
	className,
}: { isActive: boolean; className?: string }) {
	return (
		<Badge variant={isActive ? "default" : "secondary"} className={className}>
			{isActive ? "Ativo" : "Inativo"}
		</Badge>
	);
}

export function TableActions({
	status,
	athlete,
	className,
}: {
	status?: "pending" | "error";
	athlete: Athlete;
	className?: string;
}) {
	const { navigate } = useNavigate();

	return (
		<TableCell className={cn("text-center items-center h-20", className)}>
			<RenderIf
				condition={status === "error"}
				render={
					<Tooltip content="Erro ao carregar">
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<Icon name="crossCircled" className="text-primary w-5 h-5" />
							<span className="sr-only">Error</span>
						</Button>
					</Tooltip>
				}
			/>

			<RenderIf
				condition={status === "pending"}
				render={<Spinner className="w-5 h-5" />}
			/>

			<RenderIf
				condition={status !== "pending" && status !== "error"}
				render={
					<div className="space-x-2">
						<Tooltip content="Ver treino">
							<Button
								aria-haspopup="true"
								size="icon"
								variant="ghost"
								onClick={() =>
									navigate("ATHLETE_MORE_INFO", {
										replace: { athleteId: athlete.id },
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

								<DropdownMenuItem
									onClick={() =>
										navigate("UPDATE_ATHLETE", {
											replace: { athleteId: athlete.id },
											state: { athlete },
										})
									}
								>
									Editar
								</DropdownMenuItem>

								<DropdownMenuItem>Deletar</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				}
			/>
		</TableCell>
	);
}
