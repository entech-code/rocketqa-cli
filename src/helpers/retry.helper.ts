import retry from 'async-retry';

const controller = new AbortController();

process.once('SIGINT', () => {
  controller.abort(new Error('SIGINT received'));
});

async function retryFunction(run: () => Promise<void>): Promise<void> {
  try {
    await retry(
      async (bail) => {
        // Check if we should bail due to SIGINT
        if (controller.signal.aborted) {
          bail(controller.signal.reason);
          return;
        }

        await run();
      },
      {
        retries: 10,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: Infinity,
        randomize: true,
        onRetry: (error: Error) => {
          console.log(`Attempt failed: ${error.message}`);
        },
      },
    );
  } catch (error) {
    console.log('Retry stopped due to:', error);
  }
}

async function retryUntilTruthy(run: () => boolean): Promise<void> {
  try {
    await retry(
      async (bail) => {
        // Check if we should bail due to SIGINT
        if (controller.signal.aborted) {
          bail(controller.signal.reason);
          return;
        }

        const result = run();
        if (!result) {
          throw new Error('Result is not truthy');
        }
        return result;
      },
      {
        retries: 10,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: Infinity,
        randomize: true,
        onRetry: (error: Error) => {
          console.log(`Attempt failed: ${error.message}`);
        },
      },
    );
  } catch (error) {
    console.log('Retry stopped due to:', error);
  }
}

export { retryFunction as retry, retryUntilTruthy };
