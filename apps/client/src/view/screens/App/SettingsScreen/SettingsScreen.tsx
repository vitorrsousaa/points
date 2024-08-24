import {
	HeaderScreen,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@shared/ui";
import { MyAccountTab, SettingsTab } from "./components";

export function SettingsScreen() {
	return (
		<>
			<Tabs defaultValue="my-account">
				<HeaderScreen title="Configurações" />

				<TabsList defaultValue="my-account" className="mb-6 w-full">
					<TabsTrigger value="my-account" className="w-full">
						Minha Conta
					</TabsTrigger>
					<TabsTrigger value="preferences" className="w-full">
						Preferências
					</TabsTrigger>
				</TabsList>

				<TabsContent value="my-account">
					<MyAccountTab />
				</TabsContent>

				<TabsContent value="preferences">
					<SettingsTab />
				</TabsContent>
			</Tabs>
		</>
	);
}
