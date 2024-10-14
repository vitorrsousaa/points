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
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="pt-BR" className="scroll-smooth">
			<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			<body className={FONT_FAMILY.className}>{children}</body>
		</html>
	);
}
