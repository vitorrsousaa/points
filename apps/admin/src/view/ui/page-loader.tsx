import { Spinner } from "@shared/ui";

interface PageLoaderProps {
	isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
	if (!isLoading) return null;

	return (
		<div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-primary">
			<div className="flex flex-col items-center gap-4">
				{/* <Logo className="text-3xl text-white" /> */}

				<Spinner className="fill-zinc-800 h-10 w-10" />
			</div>
		</div>
	);
}
