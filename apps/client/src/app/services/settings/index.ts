import { getSettings } from "./getSettings";
import { updateSettings } from "./updateSettings";

export function settingsService() {
	return {
		getSettings,
		updateSettings,
	};
}
