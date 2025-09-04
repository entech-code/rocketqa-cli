#!/usr/bin/env node

const { cwd } = require('process');
const { Command } = require('commander');
const { handleStepsCommand } = require('./src/commands/steps.command');
const { handleTestCommand } = require('./src/commands/test.command');
const { handleInitCommand } = require('./src/commands/init.command');
const { handleInstallCommand } = require('./src/commands/install.command');

// Check Node.js version (cucumber-js requires Node.js 20+)
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 20) {
  console.error('❌ Node.js version requirement not met');
  console.log(`Current version: ${nodeVersion}`);
  console.log('Required version: Node.js 20+');
  console.log('\nPlease upgrade Node.js to version 20 or higher to use pandatest.');
  console.log('You can download it from: https://nodejs.org/');
  process.exit(1);
}

// Create commander program
const program = new Command();

program
  .name('pandatest')
  .description('🚀 Pandatest - Cucumber Playwright Test Runner')
  .version('1.0.0');

program
  .command('steps')
  .description('List all step definitions from src/**/*.steps.ts files')
  .option('--format <format>', 'Output format (json, table)', 'json')
  .action(handleStepsCommand);

program
  .command('init')
  .description(
    'Initialize a new Pandatest project with features folder, example feature, and locators.yml',
  )
  .action(handleInitCommand);

program.command('install').description('Install Playwright browsers').action(handleInstallCommand);

program
  .command('test')
  .description('Run cucumber tests')
  .argument(
    '[path]',
    'Path to specific feature files (glob format supported)',
    'features/**/*.feature',
  )
  .option('--no-headless', 'No headless mode where browser is visible')
  .option('--tags <tags>', 'Run scenarios with specific tags')
  .option('--name <name>', 'Run scenarios with specific names')
  .option('--grep <pattern>', 'Run scenarios matching regex pattern')
  .option('--keep', 'Keep browser alive after tests are complete')
  .option('--website-url <URL>', 'Website URL for the tests')
  .action(handleTestCommand);

// Parse arguments
program.parse();
