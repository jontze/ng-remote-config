import { test, expect } from '@playwright/test';

test('has feature config file present and valid JSON', async ({ request }) => {
  const response = await request.get('/assets/features.json');

  expect(response.status()).toBe(200);

  const responseBody = await response.text();
  expect(() => JSON.parse(responseBody)).not.toThrow();

  const json = JSON.parse(responseBody);
  expect(json).toHaveProperty('isFeatureEnabled');
});