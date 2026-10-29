import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Browser storage must be read after hydration to match the server-rendered page.
  { rules: { "react-hooks/set-state-in-effect": "off" } },
  globalIgnores([".next/**", ".next-test/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
]);
