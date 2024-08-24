import { log } from "@shared/logger";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Features } from "./components/Features";
import { Faq } from "./components/Faq";
import { Pricing } from "./components/Pricing";

export default function Store(): JSX.Element {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Hero />

			<Features />

			<Pricing />

			<Faq />

			<Footer />
		</main>
	);
}
