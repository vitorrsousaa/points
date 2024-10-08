import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles.css";

const poppins = Poppins({
	weight: ["200", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Grypp",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="pt-BR" className="scroll-smooth">
			<link rel="icon" type="image/svg+xml" href="/vite.svg" />
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
