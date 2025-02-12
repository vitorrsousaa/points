// @ts-ignore
import configShared from "@shared/vitest-presets/browser/vitest.config";
import { defineProject, mergeConfig } from "vitest/config";

export default mergeConfig(
	configShared,
	defineProject({
		test: {
			// globals: true,
		},
	}),
);
