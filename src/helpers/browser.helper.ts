import { config } from '../config';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import type { Browser, Page } from '@playwright/test';

setDefaultTimeout(120_000);

let sharedBrowser: Browser | undefined;

export async function getBrowser(): Promise<Browser> {
  if (sharedBrowser) {
    return sharedBrowser;
  }

  const options = config.browserOptions;
  const existingCdpPort = process.env.PLAYWRIGHT_CDP_PORT;

  // If an existing CDP port is provided, connect to that browser process
  if (existingCdpPort) {
    if (config.browser === 'firefox') {
      sharedBrowser = await firefox.connectOverCDP('http://localhost:' + existingCdpPort);
    } else if (config.browser === 'webkit') {
      sharedBrowser = await webkit.connectOverCDP('http://localhost:' + existingCdpPort);
    } else {
      sharedBrowser = await chromium.connectOverCDP('http://localhost:' + existingCdpPort);
    }
    return sharedBrowser;
  }

  const CDP_PORT = '9222';
  const combinedOptions = {
    ...options,
    args: ['--remote-debugging-port=' + CDP_PORT],
  };
  // Otherwise, start a browser server and expose its WS endpoint for reuse
  if (config.browser === 'firefox') {
    await firefox.launchServer(combinedOptions);
    sharedBrowser = await firefox.connectOverCDP('http://localhost:' + CDP_PORT);
  } else if (config.browser === 'webkit') {
    await webkit.launchServer(combinedOptions);
    sharedBrowser = await webkit.connectOverCDP('http://localhost:' + CDP_PORT);
  } else {
    await chromium.launchServer(combinedOptions);
    sharedBrowser = await chromium.connectOverCDP('http://localhost:' + CDP_PORT);
  }
  process.env.PLAYWRIGHT_CDP_PORT = CDP_PORT;

  return sharedBrowser;
}

export type BrowserContext = {
  page: Page;
  context: BrowserContext;
  browser: Browser;
};

export async function getFullBrowserContext() {
  const browser = await getBrowser();
  const context =
    process.env.IS_CHILD_CUCUMBER && browser.contexts().length > 0
      ? browser.contexts()[0]
      : await browser.newContext();
  const page =
    process.env.IS_CHILD_CUCUMBER && context.pages().length > 0
      ? context.pages()[0]
      : await context.newPage();

  return {
    page,
    context,
    browser,
  };
}
