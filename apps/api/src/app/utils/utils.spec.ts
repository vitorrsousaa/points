import { getDateInTheLastMonth } from "./date";

describe("Utils", () => {
	describe("date", () => {
		describe("getDateInTheLastMonth", () => {
			beforeAll(() => {
				vi.useFakeTimers().setSystemTime(new Date(2024, 7, 15));
			});

			afterAll(() => {
				vi.useRealTimers();
			});

			it("should return December 31, 2023 when current month is January 2024", () => {
				// Arrange
				vi.setSystemTime(new Date(2024, 0, 15));
				// Act
				const result = getDateInTheLastMonth();
				// Assert
				expect(result).toEqual(new Date(2023, 11, 15));
			});
			it("should return June 30, 2024 when current month is July 2024", () => {
				vi.setSystemTime(new Date(2024, 6, 15)); // Julho
				const result = getDateInTheLastMonth();
				expect(result).toEqual(new Date(2024, 5, 15)); // Junho, ajustado para o dia 15
			});

			it("should handle days exceeding last month days correctly (e.g., 31 in March)", () => {
				vi.setSystemTime(new Date(2024, 2, 31)); // Março
				const result = getDateInTheLastMonth();
				expect(result).toEqual(new Date(2024, 1, 29)); // Fevereiro (ano bissexto, dia máximo é 29)
			});

			it("should handle end of year transition correctly with day adjustment", () => {
				vi.setSystemTime(new Date(2024, 0, 31)); // Janeiro
				const result = getDateInTheLastMonth();
				expect(result).toEqual(new Date(2023, 11, 31)); // Dezembro do ano anterior, ajustado para o dia 31
			});

			it("should handle end of month transition correctly with day adjustment", () => {
				vi.setSystemTime(new Date(2024, 4, 31)); // Maio
				const result = getDateInTheLastMonth();
				expect(result).toEqual(new Date(2024, 3, 30)); // Abril (o último dia é 30)
			});
		});
	});
});
