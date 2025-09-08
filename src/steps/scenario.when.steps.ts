import { PandaTestWorld } from '../pandaTestWorld';
import { When } from '@cucumber/cucumber';
import { spawn } from 'child_process';
import * as path from 'path';
import { resolveCucumberExecutable } from '../helpers/executable.helper';

When('run scenario {scenario}', async function (this: PandaTestWorld, scenarioName: string) {
  await new Promise<void>((resolve, reject) => {
    const projectRoot = path.join(__dirname, '..', '..');

    // Use helper to resolve cucumber executable regardless of installation context
    let cucumberPath: string;
    try {
      cucumberPath = resolveCucumberExecutable(projectRoot);
    } catch (error) {
      reject(new Error(`Could not find @cucumber/cucumber: ${(error as Error).message}`));
      return;
    }

    const child = spawn(
      'node',
      [
        cucumberPath,
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
