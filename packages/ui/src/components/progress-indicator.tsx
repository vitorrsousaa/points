type ProgressIndicatorProps = {
	total: number;
	currentIndex: number;
};

export function ProgressIndicator({
	total,
	currentIndex,
	// ...boxProps
}: ProgressIndicatorProps) {
	return (
		<div className="flex items-center gap-2 w-full justify-center">
			{Array.from({ length: total }).map((_, index) => (
				<div
					key={index}
					className={`h-[8px] rounded-full flex-1 ${index === currentIndex ? "bg-primary" : "bg-gray-400"}`}
				/>
			))}
		</div>
	);
}
