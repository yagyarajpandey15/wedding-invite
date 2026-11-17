import { test, expect } from '@playwright/test';

/**
 * Basic e2e test to verify Playwright setup
 */
test.describe('Wedding Invitation App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Wedding Invitation/);
  });

  test('should display wedding invitation content', async ({ page }) => {
    await page.goto('/');
    
    // Verify main heading is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});
