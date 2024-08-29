import { Input } from "@shared/ui";
import { Section, SectionItem } from "..";
import { useMyAccountTab } from "./useMyAccountTab";

export function MyAccountTab() {
	const { name, email, isLoading } = useMyAccountTab();

	return (
		<Section
			title="Perfil"
			description="Veja aqui as informações relacionadas a sua conta."
			isLoading={isLoading}
			numChildrens={2}
		>
			<SectionItem
				title="Nome"
				description="O nome não pode ser alterado depois de definido inicialmente."
			>
				<Input value={name} aria-disabled disabled />
			</SectionItem>

			<SectionItem
				title="Email"
				description="O email não pode ser alterado depois de definido inicialmente."
			>
				<Input value={email} aria-disabled disabled />
			</SectionItem>
		</Section>
	);
}
