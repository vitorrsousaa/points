import {
	HeaderScreen,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@shared/ui";
import { MyAccountTab, SettingsTab, SupportTab } from "./components";

import { SentryHandler } from "@/libs/SentryHandler";
import { useEffect } from "react";

export function SettingsScreen() {
	const { viewPage } = SentryHandler();

	useEffect(() => {
		viewPage("user_view", "jane");
	}, []);

	return (
		<>
			<Tabs defaultValue="my-account">
				<HeaderScreen
					title="Configurações"
					description="Gerencie seu perfil e preferências aqui."
				/>

				<TabsList defaultValue="my-account" className="mb-6 w-full">
					<TabsTrigger value="my-account" className="w-full">
						Minha Conta
					</TabsTrigger>

					<TabsTrigger value="preferences" className="w-full">
						Preferências
					</TabsTrigger>

					<TabsTrigger value="support" className="w-full">
						Suporte
					</TabsTrigger>
				</TabsList>

				<TabsContent value="my-account">
					<MyAccountTab />
				</TabsContent>

				<TabsContent value="preferences">
					<SettingsTab />
				</TabsContent>

				<TabsContent value="support">
					<SupportTab />
				</TabsContent>
			</Tabs>
		</>
	);
}
