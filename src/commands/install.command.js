const { execSync } = require('child_process');
const path = require('path');

async function handleInstallCommand() {
  console.log('📥 Installing Playwright browsers...\n');

  try {
    const projectRoot = path.join(__dirname, '..', '..');
    const playwrightPath = path.join(projectRoot, 'node_modules', '@playwright', 'test', 'cli.js');
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
