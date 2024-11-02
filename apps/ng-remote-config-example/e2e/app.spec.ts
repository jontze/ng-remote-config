import { test, expect } from '@playwright/test';

test('Has Browser Tab Title', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('NG-Remote-Config Example');
});

test('Has Title', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h1').innerText()).toContain(
    'NG-Remote-Config Example'
  );
});

test("Has JSON Viewer for 'config.json'", async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h2').first().innerText()).toContain('Config');
  await expect(page.locator('app-editor').first()).toBeVisible();
});

test('Has same config as in config.json', async ({ page, request }) => {
  const response = await request.get('/assets/config.json');
  expect(response.status()).toBe(200);

  const configJson = await response.json();
  const configString = JSON.stringify(configJson, null, 2); // Formatting similar to the JSON pipe

  await page.goto('/');

  const renderedJson = await page.locator('pre').first().textContent();

  expect(renderedJson?.trim()).toBe(configString);
});

test("Has JSON Viewer for 'features.json'", async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h2').last().innerText()).toContain(
    'Feature Flags'
  );
  await expect(page.locator('app-editor').last()).toBeVisible();
});

test('Has same config as in features.json', async ({ page, request }) => {
  const response = await request.get('/assets/features.json');
  expect(response.status()).toBe(200);

  const configJson = await response.json();
  const configString = JSON.stringify(configJson, null, 2); // Formatting similar to the JSON pipe

  await page.goto('/');

  const renderedJson = await page.locator('pre').last().textContent();

  expect(renderedJson?.trim()).toBe(configString);
});
