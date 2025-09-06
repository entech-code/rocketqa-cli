import { PandaTestWorld } from '../pandaTestWorld';
import { When } from '@cucumber/cucumber';
import { spawn } from 'child_process';

When('run scenario {scenario}', async function (this: PandaTestWorld, scenarioName: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      'npx',
      [
        'cucumber-js',
        process.env.FEATURES_PATH,
        '--config',
        'cucumber.mjs',
        '--name',
        scenarioName,
        '--exit',
      ],
      {
        cwd: process.cwd(),
        env: { ...process.env, IS_CHILD_CUCUMBER: '1' },
      },
    );

    // child.stdout.on('data', (data) => {
    //   console.log(`Nested scenario: ${data}`);
    // });
    // child.stderr.on('data', (data: Buffer) => {
    //   console.error(`Nested scenario: ${String(data)}`);
    // });
    child.on('close', (code: number) => {
      if (code === 0) resolve();
      else reject(new Error(`Nested scenario failed with exit code ${code}: ${scenarioName}`));
    });

    // In case the parent scenario gets aborted, ensure child is cleaned up
    const terminateChild = () => {
      try {
        child.kill();
      } catch {
        /* empty */
      }
    };
    process.once('exit', terminateChild);
    process.once('SIGINT', terminateChild);
    process.once('SIGTERM', terminateChild);
  });
});
