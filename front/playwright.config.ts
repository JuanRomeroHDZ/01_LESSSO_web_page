import { defineConfig, devices } from "@playwright/test";

const formEnabled = process.env.TEST_FORM_ENABLED === "1";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: "npm run dev -- --webpack --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      LESSSO_TEST_BUILD: "1",
      NEXT_PUBLIC_CONTACT_FORM_ENABLED: formEnabled ? "true" : "false",
      NEXT_PUBLIC_LEGAL_PAGES_ENABLED: formEnabled ? "true" : "false",
      NEXT_PUBLIC_BACKEND_URL: "https://api.test.invalid",
      NEXT_PUBLIC_SITE_URL: "https://lessso.example",
    },
  },
});
