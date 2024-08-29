import { Button } from "@shared/ui";
import { Link } from "react-router-dom";
import { Section, SectionItem } from ".";

export function SupportTab() {
	// const { CANNY_URL } = import.meta.env;

	return (
		<Section
			title="Suporte"
			description="Fale conosco, solicite novas funcionalidades e resolva seus problemas."
		>
			<SectionItem
				title="Fale conosco"
				description="Entre em contato conosco para resolver qualquer coisa."
			>
				<Button className="md:max-w-[280px] w-full ml-auto justify-start p-0">
					<Link
						to="https://chat.whatsapp.com/JA4cJu1wNMyIVKyAuH1xcJ"
						className="px-4 w-full h-full flex items-center justify-center"
						target="_blank"
					>
						Entrar em contato
					</Link>
				</Button>
			</SectionItem>

			<SectionItem
				title="Novas funcionalidades"
				description="Sente falta de algo? Solicite para nós."
			>
				<Button className="md:max-w-[280px] w-full ml-auto justify-start p-0">
					<Link
						to="https://grypp.canny.io/funcionalidades"
						className="px-4 w-full h-full flex items-center justify-center"
						target="_blank"
					>
						Solicitar funcionalidade
					</Link>
				</Button>
			</SectionItem>
		</Section>
	);
}
