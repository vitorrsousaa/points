import {
	Faq,
	Features,
	Footer,
	Hero,
	Pricing,
	ReafirmValueSection,
	Reviews,
} from "./components";

export default function Store(): JSX.Element {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-between mx-auto gap-20 ">
				<Hero />

				<Reviews />

				<section className="max-w-[85rem] flex flex-col gap-20 px-4 sm:px-6 lg:px-8">
					<Features />
				</section>

				<Pricing />

				<section className="max-w-[85rem] flex flex-col gap-20 px-4 sm:px-6 lg:px-8">
					<Faq />

					<ReafirmValueSection />
				</section>
			</main>

			<Footer />
		</>
	);
}
