# SPFx webparts

1. React Class component vs React Functional Component inside SPFx
2. Microsoft Graph API ---> when you deploy it will request permissions package-json --> isolated webparts
3. sp-http to Create List, Get, Post
4. sp-http to Create subsite, Post
5. propertyPane pages, groups, icon,

## SPFx Testing

### Vitest

```shell
// newer versions of vitest has nothing to do with SPFx

npm i -D vitest@0.34.6 @vitest/ui@0.34.6 @vitest/coverage-v8@0.34.6 vite-tsconfig-paths@3.6.0

// version will depend on react

npm i -D @vitejs/plugin-react@1.3.2 @testing-library/react@12.1.5 jsdom@19.0.0 @testing-library/jest-dom@5.16.5 @testing-library/user-event@14.4.3

npm i -D @vitejs/plugin-react@1.3.2 @testing-library/react@12.1.5 jsdom@19.0.0 @testing-library/jest-dom@5.16.5 @testing-library/user-event@14.4.3

```

package.json

```json
"test": "vitest",
"test:ui": "vitest --ui",
"coverage": "vitest run --coverage"
```

## Jest

```shell

npm i -D  @types/jest@27.4.1 ts-jest@27.1.4 jest@27.5.1 @testing-library/react@12.1.5 @testing-library/jest-dom@5.16.4
```

in tsconfig.json

```json
"types": ["@testing-library/jest-dom", "vitest/globals"],
```

create vitest.config.js

```js
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

```

in setupTests.ts

```ts
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

afterEach(() => {
	cleanup();
});

```
