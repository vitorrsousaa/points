interface HeaderScreenProps {
	title: string;
	description?: string;
}

export function HeaderScreen({ title, description }: HeaderScreenProps) {
	return (
		<div className="flex flex-col gap-1 mb-6">
			<h2 className="text-2xl font-bold tracking-tight">{title}</h2>
			{description && (
				<span className="text-muted-foreground text-sm sm:text-md">
					{description}
				</span>
			)}
		</div>
	);
}
