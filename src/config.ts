import { setDefaultTimeout } from '@cucumber/cucumber';
import { LaunchOptions } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(120_000);

const browserOptions: LaunchOptions = {
  slowMo: 500,
  headless: process.env.HEADLESS !== 'false',
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  websiteUrl: process.env.WEBSITE_URL,
  locatorTimeout: 10000,
};
