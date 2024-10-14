import { useGetSettings, useUpdateSettings } from "@/hooks/settings";
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
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Section, SectionItem } from ".";

export function SettingsTab() {
	const { setTheme, theme } = useTheme();

	const { settings, isLoading, isError } = useGetSettings();

	const { execute: updateSettings } = useUpdateSettings();

	const handleUpdateEmailToCreateWorkoutReview = useCallback(
		async (value: "enable" | "disable") => {
			const newSettings = {
				...settings,
				preferencesEmail: {
					...settings?.preferencesEmail,
					createWorkoutReview: value === "enable",
				},
			};

			await updateSettings(newSettings);

			toast.success("Preferências atualizadas");
		},
		[updateSettings, settings],
	);

	return (
		<>
			<Section
				title="Aparência"
				description="Personalize a aparência da sua aplicação."
			>
				<SectionItem
					title="Tema"
					description="Ajuste conforme sua preferência."
				>
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
								<SelectItem value="system">Sistema</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</SectionItem>
			</Section>

			<Section
				title="Notificações"
				description="Gerencie suas preferências de notificação."
			>
				<SectionItem
					title="Notificações para revisões de treino"
					description="Ative para receber e-mails quando novas revisões de treino forem criadas"
				>
					<Select
						onValueChange={(event: string) =>
							handleUpdateEmailToCreateWorkoutReview(
								event as "enable" | "disable",
							)
						}
						value={
							settings?.preferencesEmail?.createWorkoutReview
								? "enable"
								: "disable"
						}
						disabled={isError}
					>
						<SelectTrigger loading={isLoading}>
							<SelectValue placeholder="Selecione o tema" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="enable">Habilitado</SelectItem>
								<SelectItem value="disable">Desabilitado</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</SectionItem>
			</Section>
		</>
	);
}
