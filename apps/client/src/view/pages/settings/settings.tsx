import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	type Theme,
	cn,
	useTheme,
} from "@shared/ui";

export function Settings() {
	const { setTheme, theme } = useTheme();
	return (
		<div className={"flex w-full flex-col justify-between sm:flex-row "}>
			<div className={cn("mb-6 sm:mb-0 sm:w-72")}>
				<h2 className={cn("text-sm font-medium")}>Aparência</h2>
				<small className="font-medium text-gray-500">
					Personalize a aparência da sua aplicação.
				</small>
			</div>
			<Select
				onValueChange={(event: string) => setTheme(event as Theme)}
				value={theme}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Selecione o tema" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
