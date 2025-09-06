const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

async function handleInitCommand() {
  console.log('🚀 Initializing new RocketMQ project...\n');

  try {
    // Get project name from user
    const projectName = await promptForProjectName();

    // Store the original working directory before changing
    const originalWorkingDir = process.cwd();

    // Create project directory
    const projectDir = path.join(originalWorkingDir, projectName);
    console.log(`📁 Creating project directory: ${projectName}`);
    await fs.ensureDir(projectDir);

    // Change to project directory
    process.chdir(projectDir);

    // Copy example folder structure
    console.log('📁 Copying template folder structure...');
    // Use the directory of this file (the package directory) for the template source
    await copyTemplateStructure(path.join(__dirname, '..', '..'));

    console.log('\n✅ Project initialization complete!');
    console.log(`\n📁 Project created in: ${projectDir}`);
    console.log('\n📚 Next steps:');
    console.log(`1. cd ${projectName}`);
    console.log('2. Install Playwright browsers: rocketmq install');
    console.log('3. Run your tests with: rocketmq test');
    console.log('4. List available steps with: rocketmq steps');
    console.log('5. Check the features/ directory for your test scenarios');
    console.log('6. Update locators.yml with your page elements');
  } catch (error) {
    console.error('❌ Error during initialization:', error.message);
    process.exit(1);
  }
}

async function copyTemplateStructure(originalWorkingDir) {
  // Get the path to the example directory from the original working directory
  const exampleSourcePath = path.join(originalWorkingDir, 'template');
  const targetPath = process.cwd();

  try {
    // Copy the entire example directory structure
    await fs.copy(exampleSourcePath, targetPath, {
      filter: (src) => {
        // Skip .DS_Store files
        return !src.includes('.DS_Store');
      },
    });

    console.log('✅ Template folder structure copied successfully');
    console.log('📁 Created directories: features/');
    console.log('📝 Created files: locators.yml, features/search.feature, features/shared.feature');
  } catch (error) {
    console.error('❌ Error copying template structure:', error.message);
    throw error;
  }
}

async function promptForProjectName() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('📝 Enter project name: ', (answer) => {
      rl.close();

      if (!answer || answer.trim() === '') {
        console.log('⚠️  Project name cannot be empty. Using default name "rocketmq-project"');
        resolve('rocketmq-project');
      } else {
        // Clean the project name (remove special characters, spaces, etc.)
        const cleanName = answer
          .trim()
          .replace(/[^a-zA-Z0-9-_]/g, '-')
          .toLowerCase();
        if (cleanName !== answer.trim()) {
          console.log(`ℹ️  Project name cleaned to: ${cleanName}`);
        }
        resolve(cleanName);
      }
    });
  });
}

module.exports = { handleInitCommand };
