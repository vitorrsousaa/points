import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IAuthProvider } from "@application/providers/auth";
import type { UnwrapPromise } from "@application/utils/types";
import { type Mocked, vi } from "vitest";
import {
	type ISigninInput,
	type ISigninService,
	SigninService,
} from "./service";

describe("Service:Signin", () => {
	let service: ISigninService;
	let mockedAuthProvider: Mocked<IAuthProvider>;
	let mockedUserRepository: Mocked<IUserRepository>;
	let mockedAthleteRepository: Mocked<IAthleteRepository>;

	const inputData: ISigninInput = {
		email: "email@email.com",
		password: "123456789",
	};

	beforeEach(() => {
		mockedAuthProvider = {
			signin: vi.fn(),
		} as unknown as Mocked<IAuthProvider>;

		mockedUserRepository = {
			getByEmail: vi.fn(),
		} as unknown as Mocked<IUserRepository>;

		mockedAthleteRepository = {
			getById: vi.fn(),
		} as unknown as Mocked<IAthleteRepository>;

		mockedAuthProvider.signin.mockResolvedValue({
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});

		service = new SigninService(
			mockedAuthProvider,
			mockedUserRepository,
			mockedAthleteRepository,
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should throw error when user not exists", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue(undefined);

		// Act
		// await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Invalid Credentials",
		);
	});
	it("Should return correct methods of provider when user not is athlete", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue({
			id: "user123",
			role: ["COACH"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getByEmail"]>>);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});
	});
	it("Should throw error when user is athlete but not is found on athlete repository", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue({
			id: "user123",
			role: ["ATHLETE"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getByEmail"]>>);
		mockedAthleteRepository.getById.mockResolvedValue(null);

		// Act
		// const result = await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Invalid Credentials",
		);
	});
	it("Should throw error when user is athlete but is not active", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue({
			id: "user123",
			role: ["ATHLETE"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getByEmail"]>>);
		mockedAthleteRepository.getById.mockResolvedValue({
			isActive: false,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		// const result = await service.execute(inputData);

		// Assert
		await expect(service.execute(inputData)).rejects.toThrow(
			"Athlete not active",
		);
	});
	it("Should call signin service with the correct parameters when user is athlete and active", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue({
			id: "user123",
			role: ["ATHLETE"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getByEmail"]>>);
		mockedAthleteRepository.getById.mockResolvedValue({
			isActive: true,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		await service.execute(inputData);

		// Assert
		expect(mockedAuthProvider.signin).toHaveBeenCalledWith(
			inputData.email,
			inputData.password,
		);
	});
	it("Should return correct methods of provider when user is athlete and active", async () => {
		// Arrange
		mockedUserRepository.getByEmail.mockResolvedValue({
			id: "user123",
			role: ["ATHLETE"],
		} as unknown as UnwrapPromise<ReturnType<IUserRepository["getByEmail"]>>);
		mockedAthleteRepository.getById.mockResolvedValue({
			isActive: true,
		} as unknown as UnwrapPromise<ReturnType<IAthleteRepository["getById"]>>);

		// Act
		const result = await service.execute(inputData);

		// Assert
		expect(result).toEqual({
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});
	});
});
