import {
	CaretSortIcon,
	CrossCircledIcon,
	DotsHorizontalIcon,
	FileIcon,
	GearIcon,
	GroupIcon,
	HamburgerMenuIcon,
	HomeIcon,
	InstagramLogoIcon,
	LayersIcon,
	LightningBoltIcon,
	PersonIcon,
	PlusCircledIcon,
	ReaderIcon,
	TrashIcon,
} from "@radix-ui/react-icons";

interface IconProps {
	name: keyof typeof icons;
	className?: string;
}

const icons = {
	hamburger: HamburgerMenuIcon,
	instagram: InstagramLogoIcon,
	plusCircle: PlusCircledIcon,
	file: FileIcon,
	dots: DotsHorizontalIcon,
	settings: GearIcon,
	person: PersonIcon,
	group: GroupIcon,
	home: HomeIcon,
	layers: LayersIcon,
	double_arrow: CaretSortIcon,
	crossCircled: CrossCircledIcon,
	trash: TrashIcon,
	filter: ListFilter,
	reader: ReaderIcon,
	lightning: LightningBoltIcon,
} as const;

export function Icon(props: IconProps) {
	const { name, className } = props;
	const RadixIcon = icons[name];

	return <RadixIcon className={className} />;
}

function ListFilter(props: { className?: string }) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={props.className}
		>
			<path d="M3 6h18" />
			<path d="M7 12h10" />
			<path d="M10 18h4" />
		</svg>
	);
}
