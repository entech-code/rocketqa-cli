const fs = require('fs');
const path = require('path');

// Function to find all .steps.ts files
function findStepFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findStepFiles(fullPath));
    } else if (item.endsWith('.steps.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to parse step definitions from a file
function parseStepDefinitions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const steps = {
      file: path.relative(path.join(__dirname, '..'), filePath),
      when: [],
      given: [],
      then: [],
    };

    // Parse When steps
    const whenMatches = content.match(/When\s*\(\s*['"`]([^'"`]+)['"`]/g);
    if (whenMatches) {
      steps.when = whenMatches.map((match) => {
        const stepText = match.match(/When\s*\(\s*['"`]([^'"`]+)['"`]/)[1];
        return stepText;
      });
    }

    // Parse Given steps
    const givenMatches = content.match(/Given\s*\(\s*['"`]([^'"`]+)['"`]/g);
    if (givenMatches) {
      steps.given = givenMatches.map((match) => {
        const stepText = match.match(/Given\s*\(\s*['"`]([^'"`]+)['"`]/)[1];
        return stepText;
      });
    }

    // Parse Then steps
    const thenMatches = content.match(/Then\s*\(\s*['"`]([^'"`]+)['"`]/g);
    if (thenMatches) {
      steps.then = thenMatches.map((match) => {
        const stepText = match.match(/Then\s*\(\s*['"`]([^'"`]+)['"`]/)[1];
        return stepText;
      });
    }

    return steps;
  } catch (error) {
    return {
      file: path.relative(path.join(__dirname, '..'), filePath),
      error: error.message,
      when: [],
      given: [],
      then: [],
    };
  }
}

// Main steps command handler
function handleStepsCommand(options) {
  // Use package's src directory instead of current working directory
  const srcDir = path.join(__dirname, '..');

  if (!fs.existsSync(srcDir)) {
    console.error('❌ No "src" folder found in the package directory.');
    process.exit(1);
  }

  const stepFiles = findStepFiles(srcDir);

  if (stepFiles.length === 0) {
    console.error('❌ No .steps.ts files found in the src directory.');
    process.exit(1);
  }

  console.log(`✅ Found ${stepFiles.length} step definition file(s)`);

  const allSteps = stepFiles.map(parseStepDefinitions);

  // Consolidate all steps by type
  const consolidatedSteps = {
    given: [],
    when: [],
    then: [],
  };

  allSteps.forEach((fileSteps) => {
    if (fileSteps.error) {
      console.warn(`⚠️  Warning: Error parsing ${fileSteps.file}: ${fileSteps.error}`);
      return;
    }

    consolidatedSteps.given.push(...fileSteps.given);
    consolidatedSteps.when.push(...fileSteps.when);
    consolidatedSteps.then.push(...fileSteps.then);
  });

  if (options.format === 'json') {
    console.log(JSON.stringify(consolidatedSteps, null, 2));
  } else if (options.format === 'table') {
    console.log('\n📋 Step Definitions Summary:');
    console.log('='.repeat(80));

    if (consolidatedSteps.given.length > 0) {
      console.log('\n📝 Given Steps:');
      consolidatedSteps.given.forEach((step) => console.log(`  - ${step}`));
    }

    if (consolidatedSteps.when.length > 0) {
      console.log('\n📝 When Steps:');
      consolidatedSteps.when.forEach((step) => console.log(`  - ${step}`));
    }

    if (consolidatedSteps.then.length > 0) {
      console.log('\n📝 Then Steps:');
      consolidatedSteps.then.forEach((step) => console.log(`  - ${step}`));
    }
  }
}

module.exports = {
  handleStepsCommand,
  findStepFiles,
  parseStepDefinitions,
};
