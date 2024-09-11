import type { UserProps } from "@/entitites/User";
import { httpClient } from "../httpClient";

export async function profile() {
	const { data } = await httpClient.get<UserProps>("/auth/profile");

	return data;
}
