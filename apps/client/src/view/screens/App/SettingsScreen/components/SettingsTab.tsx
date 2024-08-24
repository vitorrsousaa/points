import {
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	type Theme,
	useTheme,
} from "@shared/ui";

export function SettingsTab() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="w-full">
			<div className="w-full grid grid-cols-2 items-center">
				<div>
					<Label>Aparência</Label>
					<p className="text-[0.8rem] text-muted-foreground">
						Personalize a aparência da sua aplicação.
					</p>
				</div>

				<Select
					onValueChange={(event: string) => setTheme(event as Theme)}
					value={theme}
				>
					<SelectTrigger>
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
		</div>
	);
}
