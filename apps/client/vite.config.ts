import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
	},
	resolve: {
		alias: {
			"@/pages": path.resolve(__dirname, "./src/view/pages"),
			"@/components": path.resolve(__dirname, "./src/view/components"),
			"@/utils": path.resolve(__dirname, "./src/app/utils"),
			"@/services": path.resolve(__dirname, "./src/app/services"),
			"@/hooks": path.resolve(__dirname, "./src/app/hooks"),
			"@/contexts": path.resolve(__dirname, "./src/app/contexts"),
			"@/config": path.resolve(__dirname, "./src/app/config"),
			"@/libs": path.resolve(__dirname, "./src/app/libs"),
			"@/layouts": path.resolve(__dirname, "./src/view/layouts"),
			"@/ui": path.resolve(__dirname, "./src/view/ui"),
			"@/entities": path.resolve(__dirname, "./src/app/entities"),
		},
	},
});
