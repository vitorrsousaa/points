import {
	Faq,
	Features,
	Footer,
	Header,
	Hero,
	Pricing,
	ReafirmValueSection,
	Reviews,
} from "./components";

export default function Store(): JSX.Element {
	return (
		<>
			<Header />

			<main className="flex min-h-screen flex-col items-center justify-between mx-auto gap-14 md:gap-20 ">
				<Hero />

				<Reviews />

				<section className="flex flex-col gap-20 px-6 md:px-8">
					<Features />
				</section>

				<Pricing />

				<section className="flex flex-col gap-20 px-6 md:px-8">
					<Faq />

					<ReafirmValueSection />
				</section>
			</main>

			<Footer />
		</>
	);
}
