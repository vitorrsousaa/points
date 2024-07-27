import type { IAuthProvider } from "@application/providers/auth";
import { type Mocked, vi } from "vitest";
import {
	type ISigninInput,
	type ISigninService,
	SigninService,
} from "./service";

describe("Service:Signin", () => {
	let service: ISigninService;
	let mockedAuthProvider: Mocked<IAuthProvider>;

	const inputData: ISigninInput = {
		email: "email@email.com",
		password: "123456789",
	};

	beforeEach(() => {
		mockedAuthProvider = {
			signin: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		mockedAuthProvider.signin.mockResolvedValue({
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});

		service = new SigninService(mockedAuthProvider);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should call signin service with the correct parameters", async () => {
		// Arrange

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAuthProvider.signin).toHaveBeenCalledWith(
			inputData.email,
			inputData.password,
		);
	});
	it("Should return correct methods of provider", async () => {
		// Arrange

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});
	});
});
