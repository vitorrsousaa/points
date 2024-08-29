import { Label, RenderIf, RenderIfElse, Skeleton } from "@shared/ui";

interface SectionProps {
	title: string;
	description?: string;
	numChildrens?: number;
	isLoading?: boolean;
	children: React.ReactNode;
}

interface SectionItemProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function Section({
	title,
	description,
	numChildrens,
	isLoading,
	children,
}: SectionProps) {
	return (
		<div>
			<div className="mb-4">
				<h3 className="text-lg font-medium">{title}</h3>

				<RenderIf
					condition={!!description}
					render={
						<span className="text-muted-foreground text-sm">{description}</span>
					}
				/>
			</div>

			<div className="space-y-5 w-full py-6 mb-6 border-y">
				<RenderIfElse
					condition={!!isLoading}
					ifRender={Array.from({ length: numChildrens! }).map(() => (
						<Skeleton key={Math.random()} className="h-24 w-full" />
					))}
					elseRender={children}
				/>
			</div>
		</div>
	);
}

export function SectionItem({
	title,
	description,
	children,
}: SectionItemProps) {
	return (
		<div className="w-full grid grid-cols-2 items-center max-md:grid-cols-1 gap-y-6">
			<div className="max-w-[320px]">
				<Label>{title}</Label>

				{description && (
					<p className="text-[0.8rem] text-muted-foreground">{description}</p>
				)}
			</div>

			{children}
		</div>
	);
}
