export function generateRandomPassword() {
	const SIZE = 12;
	const UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const LOWER_LETTERS = "abcdefghijklmnopqrstuvwxyz";
	const SPECIALS = "!@#$%&*_+<>?";
	const NUMBERS = "0123456789";

	const getRandomCharacter = (caracteres: string) =>
		caracteres[Math.floor(Math.random() * caracteres.length)];

	// Inicializa a senha com pelo menos um caractere de cada tipo
	const password = [
		getRandomCharacter(UPPER_LETTERS),
		getRandomCharacter(LOWER_LETTERS),
		getRandomCharacter(SPECIALS),
		getRandomCharacter(NUMBERS),
	];

	// Preenche o restante da password com caracteres aleatórios de todos os tipos
	const allCharacters = UPPER_LETTERS + LOWER_LETTERS + SPECIALS + NUMBERS;
	for (let i = password.length; i < SIZE; i++) {
		password.push(getRandomCharacter(allCharacters));
	}

	// Embaralha a password
	const newPassword = password.sort(() => Math.random() - 0.5).join("");

	return newPassword;
}
