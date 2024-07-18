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
	PersonIcon,
	PlusCircledIcon,
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
} as const;

export function Icon(props: IconProps) {
	const { name, className } = props;
	const RadixIcon = icons[name];

	return <RadixIcon className={className} />;
}
