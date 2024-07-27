import path from "node:path";
// @ts-ignore
import configShared from "@shared/vitest-presets/node/vitest.config";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineProject, mergeConfig } from "vitest/config";

export default mergeConfig(
	configShared,
	defineProject({
		test: {
			globals: true,
			alias: {
				"@application/*": path.resolve(__dirname, "./src/app"),
				"@server/*": path.resolve(__dirname, "./src/server"),
				"@core/*": path.resolve(__dirname, "./src/core"),
				"@factories/*": path.resolve(__dirname, "./src/factories"),
			},
			exclude: ["**/*.test.ts", "**/src/server/tests/**"],
		},
		plugins: [tsConfigPaths()],
	}),
);
