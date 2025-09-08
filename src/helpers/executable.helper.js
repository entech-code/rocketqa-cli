const path = require('path');

/**
 * Resolves the path to the cucumber-js executable regardless of installation context (local, global, npx)
 * @param {string} projectRoot - The root directory of the project to start resolution from
 * @returns {string} The absolute path to the cucumber-js executable
 * @throws {Error} if cucumber cannot be found
 */
function resolveCucumberExecutable(projectRoot) {
  try {
    // Try to resolve the cucumber package first, then find its bin directory
    const cucumberPkg = require.resolve('@cucumber/cucumber/package.json', {
      paths: [projectRoot],
    });
    const cucumberDir = path.dirname(cucumberPkg);
    return path.join(cucumberDir, 'bin', 'cucumber.js');
  } catch (error) {
    // Fallback to resolving from current location
    try {
      const cucumberPkg = require.resolve('@cucumber/cucumber/package.json');
      const cucumberDir = path.dirname(cucumberPkg);
      return path.join(cucumberDir, 'bin', 'cucumber.js');
    } catch (fallbackError) {
      throw new Error(
        `Could not find @cucumber/cucumber. Please ensure dependencies are installed. Original error: ${error.message}, Fallback error: ${fallbackError.message}`,
      );
    }
  }
}

/**
 * Resolves the path to the playwright CLI executable regardless of installation context (local, global, npx)
 * @param {string} projectRoot - The root directory of the project to start resolution from
 * @returns {string} The absolute path to the playwright CLI executable
 * @throws {Error} if playwright cannot be found
 */
function resolvePlaywrightExecutable(projectRoot) {
  try {
    // Try to resolve the playwright package first, then find its CLI
    const playwrightPkg = require.resolve('@playwright/test/package.json', {
      paths: [projectRoot],
    });
    const playwrightDir = path.dirname(playwrightPkg);
    return path.join(playwrightDir, 'cli.js');
  } catch (error) {
    // Fallback to resolving from current location
    try {
      const playwrightPkg = require.resolve('@playwright/test/package.json');
      const playwrightDir = path.dirname(playwrightPkg);
      return path.join(playwrightDir, 'cli.js');
    } catch (fallbackError) {
      throw new Error(
        `Could not find @playwright/test. Please ensure dependencies are installed. Original error: ${error.message}, Fallback error: ${fallbackError.message}`,
      );
    }
  }
}

module.exports = {
  resolveCucumberExecutable,
  resolvePlaywrightExecutable,
};
