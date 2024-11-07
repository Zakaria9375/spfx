// vitest.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugin: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./tests/setupTests.ts"],
		coverage: {
			enabled: true,
			provider: "v8",
			reportsDirectory: "./tests/coverage",
			reporter: ["html"],
		},
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
		},
	},
});
