import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	useTheme,
	type Theme,
} from "@shared/ui";
import { Section, SectionItem } from ".";

export function SettingsTab() {
	const { setTheme, theme } = useTheme();

	return (
		<Section
			title="Aparência"
			description="Personalize a aparência da sua aplicação."
		>
			<SectionItem title="Tema" description="Ajuste conforme sua preferência.">
				<Select
					onValueChange={(event: string) => setTheme(event as Theme)}
					value={theme}
				>
					<SelectTrigger>
						<SelectValue placeholder="Selecione o tema" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="light">Claro</SelectItem>
							<SelectItem value="dark">Escuro</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</SectionItem>
		</Section>
	);
}
