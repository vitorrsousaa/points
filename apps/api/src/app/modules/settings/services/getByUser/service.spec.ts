import { type Mocked, vi } from "vitest";
import {
	GetByUserService,
	type IGetByUserInput,
	type IGetByUserService,
} from "./service";

describe("Service:GetByUser", () => {
	// let service: IGetByUserService;
	// const inputData: IGetByUserInput = {
	// 	name: "John Doe",
	// };

	// beforeEach(() => {
	// 	service = new GetByUserService();
	// });

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act

		// Assert
		expect(true).toBe(true);
	});
});
