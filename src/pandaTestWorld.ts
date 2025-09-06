import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import {
  BrowserContext,
  Page,
  APIRequestContext,
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
} from '@playwright/test';

export class PandaTestWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);
  }

  context?: BrowserContext;
  page?: Page;
  browser?: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setWorldConstructor(PandaTestWorld);
