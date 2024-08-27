import "./styles.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

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
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
