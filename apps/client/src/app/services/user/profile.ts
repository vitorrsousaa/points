import type { UserProps } from "src/app/types";
import { httpClient } from "../httpClient";

export async function profile() {
	const { data } = await httpClient.get<UserProps>("/auth/profile");

	return data;
}
