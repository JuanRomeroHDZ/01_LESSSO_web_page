import { expect, test } from "@playwright/test";

const formEnabled = process.env.TEST_FORM_ENABLED === "1";

test("navegación, tema y contacto conservan su funcionamiento", async ({ page, isMobile }) => {
  test.skip(formEnabled, "Prueba de la configuración pública predeterminada");
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (/hydrated but some attributes|hydration failed/i.test(message.text())) errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/LESSSO.*Tijuana/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('#contacto a[href^="mailto:"]')).toHaveAttribute("href", /contacto@lessso\.com/);
  await expect(page.locator("form")).toHaveCount(0);
  await page.getByRole("button", { name: /Cambiar a Modo Oscuro/ }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
    await expect(page.getByRole("button", { name: "Cerrar menú de navegación" })).toHaveAttribute("aria-expanded", "true");
  }
  await page.getByRole("link", { name: "Ciberseguridad", exact: true }).first().click();
  await expect(page).toHaveURL(/\/cybersecurity$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator('#contacto a[href^="mailto:"]')).toBeAttached();
  expect(errors).toEqual([]);
});

test("las rutas ocultas no se publican", async ({ request }) => {
  test.skip(formEnabled, "Las páginas legales se activan solo para probar el formulario");
  for (const path of ["/privacidad", "/terminos", "/cookies", "/software", "/infrastructure", "/proximamente", "/cybersecurity/penetration-testing"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("https://lessso.example/sitemap.xml");
});

test("pantallas pequeñas y movimiento reducido", async ({ page }) => {
  test.skip(formEnabled, "Prueba de la configuración pública predeterminada");
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Abrir menú de navegación" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await expect(page.locator("svg animate")).toHaveCount(0);
  await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
  await page.getByRole("link", { name: "Nosotros", exact: true }).first().click();
  await expect(page.getByRole("button", { name: "Abrir menú de navegación" })).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("el formulario futuro valida y envía sin perder datos de empresa", async ({ page }) => {
  test.skip(!formEnabled, "Prueba opcional del formulario futuro");
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/v1/leads", async route => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
      return;
    }
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ success: true, data: { cooldownSeconds: 90 } }) });
  });
  await page.goto("/#contacto");
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.getByText(/nombre completo debe tener/i)).toBeVisible();
  await page.getByRole("tab", { name: /Empresa/ }).click();
  await page.getByLabel("Nombre Completo").fill("Ana O'Connor");
  await page.getByLabel("Correo Electrónico Corporativo").fill("ana@example.com");
  await page.getByLabel("Teléfono / WhatsApp").fill("6642276711");
  await page.getByLabel("Área de Interés Principal").selectOption({ label: "Ciberseguridad" });
  await page.getByLabel("Nombre de la Organización").fill("Empresa de prueba");
  await page.getByLabel("Detalles del Proyecto o Necesidad").fill("Necesitamos revisar la seguridad de nuestra aplicación web.");
  await page.locator("#termsAccepted").check({ force: true });
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.getByText("Consulta enviada")).toBeVisible();
  expect(payload).toMatchObject({ entityType: "COMPANY", companyName: "Empresa de prueba", email: "ana@example.com", fullName: "Ana O'Connor" });
});

test("el formulario informa un límite sin afirmar que se envió", async ({ page }) => {
  test.skip(!formEnabled, "Prueba opcional del formulario futuro");
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get: () => { throw new Error("Storage blocked"); } });
  });
  await page.route("**/api/v1/leads", async route => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
      return;
    }
    await route.fulfill({ status: 429, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ success: false, message: "Por favor espere antes de enviar nuevamente.", remainingSeconds: 17 }) });
  });
  await page.goto("/#contacto");
  await page.getByLabel("Nombre Completo").fill("Ana Pérez");
  await page.getByLabel("Correo Electrónico Corporativo").fill("ana@example.com");
  await page.getByLabel("Teléfono / WhatsApp").fill("6642276711");
  await page.getByLabel("Área de Interés Principal").selectOption({ label: "Ciberseguridad" });
  await page.getByLabel("Detalles del Proyecto o Necesidad").fill("Necesitamos revisar la seguridad de nuestra aplicación web.");
  await page.locator("#termsAccepted").check({ force: true });
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Por favor espere" })).toBeVisible();
  await expect(page.getByText("Consulta enviada")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Enviar consulta" })).toBeDisabled();
});


test("volver a persona limpia los campos de empresa que ya no se muestran", async ({ page }) => {
  test.skip(!formEnabled, "Prueba opcional del formulario futuro");
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/v1/leads", async route => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
      return;
    }
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ success: true, data: { cooldownSeconds: 90 } }) });
  });
  await page.goto("/#contacto");
  await page.getByRole("tab", { name: /Empresa/ }).click();
  await page.getByLabel("Puesto o Cargo").fill("<script>incorrecto</script>");
  await page.getByRole("tab", { name: /Persona/ }).click();
  await page.getByLabel("Nombre Completo").fill("Ana Pérez");
  await page.getByLabel("Correo Electrónico Corporativo").fill("ana@example.com");
  await page.getByLabel("Teléfono / WhatsApp").fill("6642276711");
  await page.getByLabel("Área de Interés Principal").selectOption({ label: "Ciberseguridad" });
  await page.getByLabel("Detalles del Proyecto o Necesidad").fill("Necesitamos revisar la seguridad de nuestra aplicación web.");
  await page.locator("#termsAccepted").check({ force: true });
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.getByText("Consulta enviada")).toBeVisible();
  expect(payload).toMatchObject({ entityType: "PERSON" });
  expect(payload).not.toHaveProperty("jobTitle");
});
