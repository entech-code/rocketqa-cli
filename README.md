# <img src="assets/icon.png" alt="RocketQA Logo" width="30" height="30"> RocketQA

[![npm version](https://badge.fury.io/js/rocketqa.svg)](https://badge.fury.io/js/rocketqa) [![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Documentation | API reference

RocketQA is a universal testing tool that works in any project with a features folder. Write your tests using only natural language - no coding required! It offers a comprehensive set of pre-built steps for creating any web e2e test, enabling **universal**, **zero-setup**, **reliable** and **fast** testing.

| Features | Status | Description |
|----------|--------|-------------|
| Zero Configuration | ✅ | Works in any project with a features folder |
| Natural Language | ✅ | Write tests using only natural language - no coding required |
| Pre-built Steps | ✅ | Comprehensive step library for web e2e testing |
| Web Testing | ✅ | Reliable web application testing |
| Universal Tool | ✅ | No dependencies, runs via npx |

Zero-setup execution is supported for all projects.

## Requirements

- **Node.js**: 20 or higher (LTS recommended)
- **Features folder**: Contains your .feature files
- **locators.yml**: Required for page object patterns

## Installation

RocketQA requires Node.js 20 or higher. If you don't have it installed, you can install it using:

**macOS/Linux:**

```bash
# Install Node.js 20 using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Windows:**

```powershell
# Install Node.js 20 using nvm-windows (recommended)
# Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
# Or use Chocolatey:
choco install nvm
nvm install 20
nvm use 20

# Or download directly from https://nodejs.org/
```

RocketQA has its own test runner, we call it RocketQA Test.

### Using init command

The easiest way to get started with RocketQA Test is to run the init command.

```bash
# Run from your project's root directory
npx rocketqa init
```

This will create a configuration file, add example features, create a locators.yml file, and set up your first test. You can now jump directly to writing tests.

### Manually

Create features folder and locators file.

```bash
# Or create a new project
mkdir my-project && cd my-project

# Create features folder
mkdir features

# Create locators.yml file
touch locators.yml

# Add your .feature files
toach features/login.feature
```

## Examples

To learn how to run these RocketQA Test examples, check out our getting started docs.

### Basic feature test

This snippet shows how to use named locators from your `locators.yml` file for better maintainability.

```gherkin
# features/search.feature
Feature: Blogs
  Scenario: Open Blog Page
    When navigate to "http://www.pandaflow.io/"
    And click $navbar.blog
    Then $blogPage.firstBlogPostCard is visible
```

### Nested scenarios

```gherkin
# features/login.feature
Feature: Blogs
  Scenario: User can login with valid credentials
    When run scenario {Open Blog Page}
    And click $blogPage.blogPost1
    Then $blogPostPage.header contains text "About RocketQA"
```

### Locators.yml example

In your `locators.yml` file, you can define CSS selectors or XPath expressions to identify elements on your web pages. This allows you to reference elements by name in your feature files, making your tests more readable and maintainable.

You can organize locators in a simple or deeply nested structure, depending on your application's complexity. Here are some examples:

**Simple structure:**


```yaml
navbar:
  blog: "(//a[@href='/blog'])[1]"
  home: "(//a[@href='/'])[1]"

blogPage:
  firstBlogPostCard: "(//*[contains(@class,'blog-post-card')])[1]"
```

### Running tests

This code snippet shows how to run tests with specific tags and filtering options.

```bash
# Runs all tests
npx rocketqa test 

# Run tests with specific tags
npx rocketqa test --tags @smoke
npx rocketqa test --tags "not @slow"

# Run tests with specific names
npx rocketqa test --name "Open Blog Page"

# Run tests matching regex pattern
npx rocketqa test --grep "blogs|login"

# Combine options
npx rocketqa test features/smoke/*.feature --tags @critical
```

### Step discovery

This snippet shows how to discover all available step definitions in your project.

```bash
# List all steps in JSON format
npx rocketqa steps

# List all steps in table format
npx rocketqa steps --format table
```

### Step Discovery

Use the `npx rocketqa steps` command to see all available steps in your project:

```bash
# List all available steps
npx rocketqa steps

# View steps in table format
npx rocketqa steps --format table
```

This command scans your project and displays all available Given, When, and Then steps, making it easy to discover what's available for your tests.

## Resources

- Documentation
- API reference
- Contribution guide
- Changelog

## About

RocketQA is a universal testing tool that works in any project with a features folder. It allows testing web applications with zero configuration.

### Topics

javascript testing automation web test test-automation testing-tools end-to-end-testing e2e-testing rocketqa universal-tool

### License

MIT License