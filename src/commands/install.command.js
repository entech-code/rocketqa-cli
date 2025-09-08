const { execSync } = require('child_process');
const path = require('path');
const { resolvePlaywrightExecutable } = require('../helpers/executable.helper');

async function handleInstallCommand() {
  console.log('📥 Installing Playwright browsers...\n');

  try {
    const projectRoot = path.join(__dirname, '..', '..');

    // Use helper to resolve playwright CLI regardless of installation context (local, global, npx)
    let playwrightPath;
    try {
      playwrightPath = resolvePlaywrightExecutable(projectRoot);
    } catch (error) {
      console.error(
        '❌ Could not find @playwright/test. Please ensure dependencies are installed.',
      );
      console.error('Error:', error.message);
      process.exit(1);
    }

    console.log(`🎭 Using playwright CLI at: ${playwrightPath}`);
    execSync(`node "${playwrightPath}" install`, { stdio: 'inherit' });
    console.log('\n✅ Playwright browsers installed successfully!');
    console.log('\n🎯 You can now run your tests with: rocketqa test');
  } catch (error) {
    console.error('\n❌ Failed to install Playwright browsers');
    console.error('Error:', error.message);
    console.log('\n💡 You can try installing manually with: npx playwright install');
    process.exit(1);
  }
}

module.exports = { handleInstallCommand };
