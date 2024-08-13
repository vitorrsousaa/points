import { seedExercises } from "./exercise";

async function runSeed() {
	console.log("Running seed");
	const url = "https://6lm5kscc2m.execute-api.us-east-1.amazonaws.com/exercise";

	// biome-ignore lint/complexity/noForEach: <explanation>
	seedExercises.forEach(async (exercise) => {
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exercise),
		});
	});

	console.log("Seed done");
}

runSeed();
