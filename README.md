# 🚀 Pandatest

> **Universal Gherkin testing tool that works in any project with a features folder**

[![npm version](https://badge.fury.io/js/pandatest.svg)](https://badge.fury.io/js/pandatest)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pandatest is a zero-configuration, universal testing tool that can run your Gherkin tests in any project without setup or dependencies. Just create a `features` folder and start testing!

## ✨ Features

- 🎯 **Zero Setup**: Works in any project with a features folder
- 🔍 **Flexible Execution**: Run all tests, specific files, or filtered by tags
- 🚀 **Universal**: Use the same command anywhere
- 📦 **No Dependencies**: Tools downloaded automatically via npx
- 🏷️ **Tag Support**: Filter tests by @tags, names, or regex patterns
- 🌐 **Glob Patterns**: Target specific feature files with glob syntax
- 💻 **Developer Friendly**: Simple, memorable commands
- 🎭 **Custom Parameter Types**: Built-in `{locator}` and `{scenario}` parameter types for better step definitions

## 🚀 Quick Start

### 1. Create a Features Folder

```bash
mkdir my-project
cd my-project
mkdir features
```

### 2. Add Your Feature Files

```gherkin
# features/login.feature
Feature: Search
  Scenario: Search returns right results
    Given I am on "google" page
    When type "best automatino tools" into "google.searchTextBox"
    And click on "google.SearchButton"
    Then "pandatest" is visible
```

### 3. Run Tests

```bash
npx pandatest test
```

**That's it!** No package.json, no dependencies, no setup required.

## 📚 Usage Examples

### Basic Commands

```bash
# Run all tests
npx pandatest test

# Run specific feature files
npx pandatest test features/smoke/*.feature
npx pandatest test features/common/login.feature

# Run tests with specific tags
npx pandatest test --tags @smoke
npx pandatest test --tags "not @slow"

# Run tests with specific names
npx pandatest test --name "User can login"

# Run tests matching regex pattern
npx pandatest test --grep "login|auth"

# Combine options
npx pandatest test features/smoke/*.feature --tags @critical
```

### Advanced Filtering

```bash
# Run only critical smoke tests
npx pandatest test --tags "@smoke and @critical"

# Skip slow tests
npx pandatest test --tags "not @slow"

# Run tests with specific names containing "login"
npx pandatest test --grep ".*login.*"

# Target specific directories
npx pandatest test features/api/**/*.feature
```

## 🏗️ Project Structure

### Minimal Project
```
my-project/
├── features/
│   ├── login.feature
│   └── smoke/
│       └── check_pages.feature
└── (Nothing else 😉)
```

### With Locators (Optional)
```
my-project/
├── features/
│   ├── login.feature
│   └── smoke/
│       └── check_pages.feature
├── locators.yml          # Page object locators
└── (No package.json needed!)
```


## 🔧 How It Works

1. **Detects features folder**: Automatically finds your test files
2. **Processes arguments**: Handles custom paths, tags, names, and patterns
3. **Executes tests**: Runs your tests with the specified options
4. **Zero configuration**: Works immediately without setup

## 📍 Locators and Page Objects

Pandatest supports a `locators.yml` file for organizing page object locators. This file allows you to:

- **Centralize selectors**: Keep all element locators in one place
- **Use readable names**: Reference elements with descriptive names like `loginPage.emailField`
- **Maintain consistency**: Update selectors in one location
- **Improve readability**: Make step definitions more human-readable

### Example locators.yml
```yaml
loginPage:
  emailField: "#ui-sign-in-email-input"
  passwordField: "#ui-sign-in-password-input"
  submitButton: "//button[@type='submit']"

navBar:
  dashboardItem: "//span[text()='Dashboard']"
  contactsItem: "//span[text()='Contacts']"
```

### Using Locators in Steps
```gherkin
When I fill in "user@example.com" into "loginPage.emailField"
And I fill in "password123" into "loginPage.passwordField"
And I click on "loginPage.submitButton"
```

The `{locator}` parameter type automatically resolves these references from your `locators.yml` file.

## 📋 Requirements

- **Node.js**: 20+ (LTS recommended)
- **Features folder**: Contains your .feature files
- **Internet connection**: For downloading tools on first run

## 📁 File Structure

### Required Files
- `features/` - Directory containing your `.feature` files

### Optional Files
- `locators.yml` - Page object locators for better test maintainability
- `src/` - Custom step definitions and support files (if needed)

## 🌟 Use Cases

- **Quick Testing**: Test any project without setup
- **Team Collaboration**: Anyone can run tests without installing dependencies
- **CI/CD**: Works in any build environment
- **Demo Projects**: Show Gherkin tests without complex setup
- **Learning**: Start testing immediately
- **Legacy Projects**: Add testing to existing projects
- **Microservices**: Test multiple services with the same tool

## 🚀 Getting Started

### For New Projects

```bash
# Create project
mkdir my-test-project
cd my-test-project

# Create features folder
mkdir features

# Add feature file
echo 'Feature: Test
  Scenario: Basic test
    Given I have a test
    When I run it
    Then it should work' > features/test.feature

# Run tests
npx pandatest test
```

### For Existing Projects

```bash
# Just add a features folder
mkdir features

# Add your .feature files
# Then run:
npx pandatest test
```

## 🔍 Command Reference

### Test Command
```bash
npx pandatest test [options]

Options:
  [path]           Path to specific feature files (glob format supported)
  --tags <tags>    Run scenarios with specific tags
  --name <name>    Run scenarios with specific names
  --grep <pattern> Run scenarios matching regex pattern

Examples:
  npx pandatest test                           # Run all tests
  npx pandatest test features/smoke/*.feature  # Run smoke tests
  npx pandatest test --tags @critical          # Run critical tests
  npx pandatest test --help                    # Show help
```

### Steps Command
```bash
npx pandatest steps [options]

Options:
  --format <format>  Output format (json, table) (default: "json")

Examples:
  npx pandatest steps                    # List all steps in JSON format
  npx pandatest steps --format table    # List all steps in table format
  npx pandatest steps --help            # Show help
```

The `steps` command scans all `src/**/*.steps.ts` files in your project and consolidates all step definitions by type:
- **Given** steps (setup/preconditions)
- **When** steps (actions/events)  
- **Then** steps (assertions/verifications)

The output provides a unified list of all available steps across all files, making it easy to see what step definitions are available in your project.

This is useful for:
- Documentation generation
- Step definition discovery
- Team collaboration
- Test maintenance

#### Example Output
```json
{
  "given": [
    "A cat fact is recieved",
    "on {string} page"
  ],
  "when": [
    "fill in {string} with {string}",
    "click on {locator}",
    "type {string} into {string}"
  ],
  "then": [
    "{string} is visible",
    "{string} contains text {string}",
    "Snapshot {string}"
  ]
}
```

## 🎭 Custom Parameter Types

Pandatest includes two custom parameter types that make your step definitions more readable and maintainable:

### {locator} Parameter Type

The `{locator}` parameter type handles various element locator formats and can reference locators defined in your `locators.yml` file:

```gherkin
When I click on {#submit-button}
And I wait for {.success-message} to be visible
And I verify {xpath://button[contains(text(),'Save')]} contains text "Save"
And I click on {loginPage.submitButton}  # References locators.yml
```

**Supported formats:**
- **Named locators**: `{pageName.elementName}` (resolved from `locators.yml`)
- CSS Selectors: `{css:.class-name}`, `{#id-name}`
- XPath: `{xpath://button[contains(text(),'Save')]}`
- Text Content: `{text:Welcome message}`
- ID Selectors: `{id:main-content}`
- Plain Selectors: `{any-selector}` (must be surrounded by curly braces)

**Named locators** are automatically resolved from your `locators.yml` file, making your step definitions more readable and maintainable.

### {scenario} Parameter Type

The `{scenario}` parameter type references scenario context:

```gherkin
Given I am in the {scenario} scenario
When I perform {scenario} action on {locator}
Then the {scenario} should be completed successfully
```

### Benefits

- **Readability**: More human-readable step definitions
- **Maintainability**: Easier to update locator patterns
- **Flexibility**: Support for multiple locator formats
- **Reusability**: Steps can be reused across scenarios
- **Type Safety**: Full TypeScript support

For detailed usage examples, see [PARAMETER_TYPES_README.md](PARAMETER_TYPES_README.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [Cucumber.js](https://cucumber.io/docs/cucumber/)
- Inspired by the need for universal testing tools
- Made possible by the npx ecosystem

---

**Made with ❤️ for the testing community**

*Pandatest - Universal Cucumber testing made simple*
