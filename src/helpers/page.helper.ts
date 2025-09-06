import { Page } from '@playwright/test';

export async function waitForPageFullyLoaded(page: Page, options?: { timeout?: number }) {
  await Promise.allSettled([
    page.waitForLoadState('domcontentloaded', options === undefined ? { timeout: 15000 } : options),
    page.waitForLoadState('networkidle', options),
    page.waitForLoadState('load', options),
  ]);
}
