export type Exercise = {
	id: string;
	name: string;
	equipment: "Barra" | "Halter" | "Maquina";
	primaryMuscle: string;
	secondaryMuscle: string | null;
	target: "D" | "S" | "B" | null;
};
