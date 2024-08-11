export type Exercise = {
	id: string;
	name: string;
	equipment: "Barra" | "Halter" | "Maquina";
	muscleGroup: string;
	target: "D" | "S" | "B" | null;
};
