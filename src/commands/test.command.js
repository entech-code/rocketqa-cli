#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { cwd } = require('process');
const { resolveCucumberExecutable } = require('../helpers/executable.helper');

function handleTestCommand(featurePath, options) {
  let cucumberArgs = [];

  // Build cucumber arguments from options
  if (options.tags) {
    cucumberArgs.push('--tags', options.tags);
  }
  if (options.name) {
    cucumberArgs.push('--name', options.name);
  }

  // If no specific path is provided, check if features folder exists
  if (featurePath === 'features/**/*.feature') {
    if (!fs.existsSync('features')) {
      console.error('❌ No "features" folder found in the current directory.');
      console.log(
        'Please create a "features" folder with your .feature files and run the command again.',
      );
      console.log('\nExample structure:');
      console.log('  features/');
      console.log('    login.feature');
      console.log('    smoke/');
      console.log('      check_pages.feature');
      process.exit(1);
    }

    // Check if there are any .feature files in the default features folder
    const findFeatureFiles = (dir) => {
      const files = [];
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...findFeatureFiles(fullPath));
        } else if (item.endsWith('.feature')) {
          files.push(fullPath);
        }
      }

      return files;
    };

    const featureFiles = findFeatureFiles('features');
    if (featureFiles.length === 0) {
      console.error('❌ No .feature files found in the features folder.');
      console.log(
        'Please add some .feature files to the features folder and run the command again.',
      );
      process.exit(1);
    }

    console.log(`✅ Found ${featureFiles.length} feature file(s) in the features folder`);
    console.log('Feature files:', featureFiles.map((f) => path.relative('features', f)).join(', '));
  } else {
    console.log(`🎯 Using custom feature path: ${featurePath}`);
  }

  // Run tests with npx
  console.log('🚀 Running cucumber tests...');

  featurePath = options.grep
    ? path.join(process.cwd(), `**/*${options.grep}*`)
    : path.join(process.cwd(), featurePath);

  const keep = options.keep && !options['headless'];
  // Build the final cucumber arguments
  const finalArgs = [featurePath, '-c', 'cucumber.mjs', keep ? '' : '--exit', ...cucumberArgs];

  console.log(
    'Command:',
    'node',
    'node_modules/@cucumber/cucumber/bin/cucumber-js',
    finalArgs.join(' '),
  );

  const projectRoot = path.join(__dirname, '..', '..');
  // Add debugging information
  console.log(`📁 Package root: ${projectRoot}`);
  console.log(`📁 Current working directory: ${process.cwd()}`);
  console.log(`📁 Website URL: ${options.websiteUrl}`);
  console.log(`📁 Feature path: ${featurePath}`);

  // Use helper to resolve cucumber executable regardless of installation context (local, global, npx)
  let cucumberPath;
  try {
    cucumberPath = resolveCucumberExecutable(projectRoot);
  } catch (error) {
    console.error(
      '❌ Could not find @cucumber/cucumber. Please ensure dependencies are installed.',
    );
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log(`🥒 Using cucumber-js at: ${cucumberPath}`);
  const child = spawn('node', [cucumberPath, ...finalArgs], {
    stdio: 'inherit',
    cwd: projectRoot, // Set working directory to package root
    env: {
      ...process.env,
      BASE_PATH: cwd(),
      LOCATORS_PATH: cwd() + '/locators.yml',
      FEATURES_PATH: cwd() + '/features/**/*.feature',
      HEADLESS: options['headless'] ? 'true' : 'false',
      KEEP: keep ? 'true' : 'false',
      WEBSITE_URL: options.websiteUrl,
    },
  });

  child.on('close', (code) => {
    process.exit(code);
  });

  child.on('error', (error) => {
    console.error(`❌ Failed to run tests: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { handleTestCommand };
