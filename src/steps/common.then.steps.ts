import { PandaTestWorld } from '../pandaTestWorld';
import { waitForPageFullyLoaded } from '../helpers/page.helper';
import { config } from '../config';
import { retry, retryUntilTruthy } from '../helpers/retry.helper';
import { parseLocator } from '../helpers/locator.helper';
import { expect } from '@playwright/test';
import { Then } from '@cucumber/cucumber';

Then('{locator} is visible', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });
  });

  expect(await page.locator(parseLocator(selector)).isVisible()).toBeTruthy();
});

Then(
  '{locator} is visible in frame {locator}',
  async function (this: PandaTestWorld, selector: string, frameSelector: string) {
    const page = this.page!;

    await retry(async () => {
      await page.frameLocator(parseLocator(frameSelector)).locator(parseLocator(selector)).waitFor({
        state: 'visible',
        timeout: config.locatorTimeout,
      });
    });

    expect(
      await page
        .frameLocator(parseLocator(frameSelector))
        .locator(parseLocator(selector))
        .isVisible(),
    ).toBeTruthy();
  },
);

Then('{locator} is not visible', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;
  expect(await page.locator(parseLocator(selector)).isVisible()).toBeFalsy();
});

Then('{locator} is hidden', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'hidden',
      timeout: config.locatorTimeout,
    });
  });

  expect(await page.locator(parseLocator(selector)).isHidden()).toBeTruthy();
});

Then('{locator} is checked', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });

    if (
      (await page.locator(parseLocator(selector)).isChecked({
        timeout: config.locatorTimeout,
      })) !== true
    ) {
      throw new Error(`Locator ${parseLocator(selector)} is not checked`);
    }
  });

  expect(await page.locator(parseLocator(selector)).isChecked()).toBeTruthy();
});

Then('{locator} is editable', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });

    if (
      (await page.locator(parseLocator(selector)).isEditable({
        timeout: config.locatorTimeout,
      })) !== true
    ) {
      throw new Error(`Locator ${parseLocator(selector)} is not editable`);
    }
  });

  expect(await page.locator(parseLocator(selector)).isEditable()).toBeTruthy();
});

Then('{locator} is enabled', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });

    if (
      (await page.locator(parseLocator(selector)).isEnabled({
        timeout: config.locatorTimeout,
      })) !== true
    ) {
      throw new Error(`Locator ${parseLocator(selector)} is not enabled`);
    }
  });

  expect(await page.locator(parseLocator(selector)).isEnabled()).toBeTruthy();
});

Then('{locator} is disabled', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });

    if (
      (await page.locator(parseLocator(selector)).isDisabled({
        timeout: config.locatorTimeout,
      })) !== true
    ) {
      throw new Error(`Locator ${parseLocator(selector)} is not disabled`);
    }
  });

  expect(await page.locator(parseLocator(selector)).isDisabled()).toBeTruthy();
});

Then('{locator} is empty', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).waitFor({
      state: 'visible',
      timeout: config.locatorTimeout,
    });

    if (
      (
        await page.locator(parseLocator(selector)).textContent({
          timeout: config.locatorTimeout,
        })
      ).trim() !== ''
    ) {
      throw new Error(`Text at locator ${parseLocator(selector)} is not empty`);
    }
  });

  expect((await page.locator(parseLocator(selector)).textContent()).trim() === '');
});

Then(
  '{locator} contains text {string}',
  async function (this: PandaTestWorld, selector: string, value: string) {
    const page = this.page!;

    await retry(async () => {
      await page.locator(parseLocator(selector)).waitFor({
        state: 'visible',
        timeout: config.locatorTimeout,
      });

      const text = await page.locator(parseLocator(selector)).textContent({
        timeout: config.locatorTimeout,
      });

      if (text.includes(value) === false) {
        throw new Error(
          `Text at locator ${parseLocator(selector)} does not includes ${value}; text is '${text}'`,
        );
      }
    });

    await expect(page.locator(parseLocator(selector))).toContainText(value);
  },
);

Then(
  'text field {locator} contains {string}',
  async function (this: PandaTestWorld, selector: string, value: string) {
    const page = this.page!;

    await retry(async () => {
      await page.locator(parseLocator(selector)).waitFor({
        state: 'visible',
        timeout: config.locatorTimeout,
      });
    });

    const text = await page.locator(parseLocator(selector)).inputValue({
      timeout: config.locatorTimeout,
    });

    if (text.includes(value) === false) {
      throw new Error(
        `Text at locator ${parseLocator(selector)} does not includes ${value}; text is '${text}'`,
      );
    }

    expect(text).toContain(value);
  },
);

Then('there are {int} tabs', async function (this: PandaTestWorld, tabsCount: number) {
  const page = this.page!;
  waitForPageFullyLoaded(page);
  return await retryUntilTruthy(() => this.context.pages().length === tabsCount);
});
