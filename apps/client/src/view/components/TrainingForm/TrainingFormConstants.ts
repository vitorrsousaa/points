export const restTimer = [
	"Off",
	"00:30",
	"01:00",
	"01:30",
	"02:00",
	"02:30",
	"03:00",
	"03:30",
	"04:00",
	"04:30",
	"05:00",
	"05:30",
	"06:00",
	"06:30",
	"07:00",
];

export const typeOfSets: {
	value: "W" | "T";
	color: string;
	label: string;
}[] = [
	{
		value: "W",
		color: "#eeaa00",
		label: "Warm up",
	},
	{
		value: "T",
		color: "#35baff",
		label: "Trabalho",
	},
];

export const defaultVolume = {
	B: { sets: 0, load: 0 },
	S: { sets: 0, load: 0 },
	D: { sets: 0, load: 0 },
};
