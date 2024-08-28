import { type Mocked, vi } from "vitest";
import {
	type IResendCodeInput,
	type IResendCodeService,
	ResendCodeService,
} from "./service";

describe("Service:ResendCode", () => {
	// let service: IResendCodeService;
	// const inputData: IResendCodeInput = {
	// 	name: 'John Doe'
	// }

	// beforeEach(() => {
	// 	service = new ResendCodeService();
	// });

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should correct", async () => {
		// Arrange

		// Act
		// await service.execute(inputData);

		// Assert
		expect(true).toBe(true);
	});
});
