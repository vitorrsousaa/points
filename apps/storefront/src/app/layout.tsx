import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./styles.css";

const FONT_FAMILY = DM_Sans({
	fallback: ["Inter", "sans-serif"],
	preload: true,
	weight: ["200", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GRYPP | Organize Alunos e Treinos",
	description: "Uma nova plataforma simplificada para acompanhamentos. Organize alunos, personalize treinos, colete feedbacks, tudo em um só lugar.",
	keywords: ["aplicativo de personal trainer", "site personal trainer", "app de personal trainer", "melhor app para personal trainer", "powerlifting", "site para montar treino de musculação", "site de treinos"],
	authors: [{ name: "GRYPP", url: "https://grypp.com.br" }],
	openGraph: {
		title: "GRYPP | Organize Alunos e Treinos",
		siteName: "GRYPP | Organize Alunos e Treinos",
		description: "Uma nova plataforma simplificada para acompanhamentos. Organize alunos, personalize treinos, colete feedbacks, tudo em um só lugar.",
		type: "website",
		url: "http://grypp.com.br",
		locale: "pt_BR",
		images: [{
			url: "https://grypp.com.br/dash.png",
			alt: "GRYPP | Organize Alunos e Treinos",
		}],
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="pt-BR" className="scroll-smooth">
			<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta charSet="UTF-8" />

			<body className={FONT_FAMILY.className}>{children}</body>
		</html>
	);
}
