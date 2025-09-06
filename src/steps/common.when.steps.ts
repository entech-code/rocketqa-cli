import { PandaTestWorld } from '../pandaTestWorld';
import { waitForPageFullyLoaded } from '../helpers/page.helper';
import { parseLocator } from '../helpers/locator.helper';
import { config } from '../config';
import { retry } from '../helpers/retry.helper';
import { When } from '@cucumber/cucumber';

When('navigate to {string}', async function (this: PandaTestWorld, url: string) {
  await this.page?.goto(url);
});

When(
  'enter {string} into {locator} field',
  async function (this: PandaTestWorld, selector: string, value: string) {
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

    await page.locator(parseLocator(selector)).fill(value);
  },
);

When('clear {locator} field', async function (this: PandaTestWorld, selector: string) {
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

  await page.locator(parseLocator(selector)).clear();
});

When(
  'type {string} into {locator} field',
  async function (this: PandaTestWorld, value: string, selector: string) {
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

    await page.locator(parseLocator(selector)).type(value, { timeout: 60000 });
  },
);

When('hover over {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).hover({
      timeout: config.locatorTimeout,
    });
  });
});

When('switch to tab {int}', async function (this: PandaTestWorld, pageIndex: number) {
  this.page = this.context.pages()[pageIndex];
});

When('close tab {int}', async function (this: PandaTestWorld, pageIndex: number) {
  await this.context.pages()[pageIndex].close();
});

When('click {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;
  await retry(async () => {
    await page.locator(parseLocator(selector)).click({
      timeout: config.locatorTimeout,
    });
  });
});

When(
  'click {locator} if {locator} is visible',
  //Word must contain value true or false
  async function (this: PandaTestWorld, locatorToClick: string, locatorToCheckVisibility: string) {
    const page = this.page!;
    const elementToCheck = page.locator(parseLocator(locatorToCheckVisibility));
    const isElementVisible = await elementToCheck.isVisible();

    if (isElementVisible) {
      const targetElement = page.locator(parseLocator(locatorToClick));
      await retry(async () => {
        await targetElement.click({
          timeout: config.locatorTimeout,
        });
      });
    }
  },
);

When('force click {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;
  await retry(async () => {
    await page.locator(parseLocator(selector)).click({
      timeout: config.locatorTimeout,
      force: true,
    });
  });
});

When(
  'click {locator} within frame {locator}',
  async function (this: PandaTestWorld, selector: string, frameSelector: string) {
    const page = this.page!;
    await retry(async () => {
      await page.frameLocator(parseLocator(frameSelector)).locator(parseLocator(selector)).click({
        timeout: config.locatorTimeout,
      });
    });
  },
);

When('right-click {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).click({
      button: 'right',
      timeout: config.locatorTimeout,
    });
  });
});

When('middle-click {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).click({
      button: 'middle',
      timeout: config.locatorTimeout,
    });
  });
});

When('press {string} key', async function (this: PandaTestWorld, key: string) {
  const page = this.page!;
  await page.keyboard.press(key);
});

When('double-click {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).dblclick({
      timeout: config.locatorTimeout,
    });
  });
});

When('check {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).check({
      timeout: config.locatorTimeout,
    });
  });
});

When('uncheck {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).uncheck({
      timeout: config.locatorTimeout,
    });
  });
});

When('clear {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).clear({
      timeout: config.locatorTimeout,
    });
  });
});

When('move mouse to {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;
  const bndBox = await page.locator(parseLocator(selector)).boundingBox();
  await page.mouse.move(bndBox.x + bndBox.width / 2, bndBox.y + bndBox.height / 2, { steps: 10 });
});

When(
  'scroll mouse wheel X {int} and Y {int}',
  async function (this: PandaTestWorld, X: number, Y: number) {
    const page = this.page!;
    await page.mouse.wheel(X, Y);
  },
);

When('focus on {locator}', async function (this: PandaTestWorld, selector: string) {
  const page = this.page!;

  await retry(async () => {
    await page.locator(parseLocator(selector)).focus({
      timeout: config.locatorTimeout,
    });
  });
});

When('the DOM is fully loaded', async function (this: PandaTestWorld) {
  const page = this.page!;

  await retry(async () => {
    await waitForPageFullyLoaded(page, {
      timeout: config.locatorTimeout,
    });
  });
  await page.waitForTimeout(1000);
});

When('wait {int} milliseconds', async function (this: PandaTestWorld, delayInMS: number) {
  await this.page!.waitForTimeout(delayInMS);
});

When('hold down {string} key', async function (this: PandaTestWorld, key: string) {
  await this.page!.keyboard.down(key);
});

When('press complex key combination {string}', async function (this: PandaTestWorld, key: string) {
  await this.page!.keyboard.press(key);
});

When('release {string} key', async function (this: PandaTestWorld, key: string) {
  await this.page!.keyboard.up(key);
});
