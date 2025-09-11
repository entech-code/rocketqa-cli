import { config } from './config';
import type { PandaTestWorld } from './pandaTestWorld';
import { After, Before } from '@cucumber/cucumber';
import type { ChromiumBrowser, FirefoxBrowser, WebKitBrowser } from '@playwright/test';
import { getFullBrowserContext } from './helpers/browser.helper';

Before(async function (this: PandaTestWorld) {
  // Try to find an existing context, otherwise create a new one
  const { page, context, browser } = await getFullBrowserContext();
  this.browser = browser as ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
  this.context = context;
  this.page = page;

  if (!process.env.IS_CHILD_CUCUMBER && config.websiteUrl) {
    try {
      await page.goto(config.websiteUrl);
    } catch {
      // ignore navigation errors for optional startup URL
    }
  }
});

After(async function (this: PandaTestWorld) {
  if (process.env.IS_CHILD_CUCUMBER) {
    console.log('skipping closing browser');
    return;
  }

  if (!(process.env.KEEP === 'true' && process.env.HEADLESS === 'false')) {
    try {
      await this.context?.close();
    } catch {
      // ignore
    }
  }
  this.page = undefined;
  this.context = undefined;
});
