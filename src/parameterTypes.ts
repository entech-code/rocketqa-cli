import { defineParameterType } from '@cucumber/cucumber';

// Define custom parameter type for locators
// This will match various locator patterns like CSS selectors, XPath, text content, etc.
// The regex requires the parameter to start with $ (e.g., $locator)
defineParameterType({
  name: 'locator',
  regexp: /\$[^\s]+/,
  transformer: (locator: string) => {
    // Remove the $ prefix, return the locator content
    // It will be processed by PagesParser.parseSelector later
    return locator.slice(1);
  },
  useForSnippets: true,
  preferForRegexpMatch: false,
});

// Define custom parameter type for scenario names or descriptions
// This will match scenario names, descriptions, or any text that represents a scenario context
// The regex requires the parameter to be surrounded with {} (e.g., {scenario})
defineParameterType({
  name: 'scenario',
  regexp: /\{[^}]+\}/,
  transformer: (scenario: string) => {
    // Remove the {} brackets, return the scenario content
    return scenario.slice(1, -1);
  },
  useForSnippets: true,
  preferForRegexpMatch: false,
});
