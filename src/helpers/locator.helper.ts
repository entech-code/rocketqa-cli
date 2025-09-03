import YAML from 'yaml';
import fs from 'fs';

const locatorsFilePath = process.env.LOCATORS_PATH || './locators.yml';

// Cache for parsed locators to avoid repeated file reads
let locatorsCache: any = null;
let lastModifiedTime: number = 0;

/**
 * Get nested value from object using dot notation
 * Supports multi-level nesting like 'page.section.element'
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Load and cache locators from YAML file
 * Invalidates cache if file has been modified
 */
function loadLocators(): any {
  try {
    const stats = fs.statSync(locatorsFilePath);
    const currentModifiedTime = stats.mtime.getTime();

    // Check if cache is valid (file hasn't been modified)
    if (locatorsCache && currentModifiedTime <= lastModifiedTime) {
      return locatorsCache;
    }

    // Load and parse the file
    const file = fs.readFileSync(locatorsFilePath, 'utf8');
    const parsedLocators = YAML.parse(file);

    // Update cache
    locatorsCache = parsedLocators;
    lastModifiedTime = currentModifiedTime;

    return parsedLocators;
  } catch (error) {
    console.error(`Error loading locators file: ${error}`);
    return {};
  }
}

/**
 * Clear the locators cache
 * Useful for testing or when you need to force reload
 */
export function clearLocatorsCache(): void {
  locatorsCache = null;
  lastModifiedTime = 0;
}

/**
 * Parse locator with caching and multi-level support
 * Supports nested structures like 'page.section.element'
 */
export function parseLocator(selector: string): string {
  const pages = loadLocators();

  let actualSelector = selector;

  try {
    // Try to find the selector in the parsed YAML structure
    const foundSelector = getNestedValue(pages, selector);

    if (foundSelector !== undefined) {
      actualSelector = foundSelector;
    } else {
      console.log(`Locator '${selector}' not found in ${locatorsFilePath}`);
    }
  } catch (error) {
    console.log(`Error parsing locator '${selector}': ${error}`);
  }

  return actualSelector;
}

/**
 * Get all available locators (useful for debugging or validation)
 */
export function getAllLocators(): any {
  return loadLocators();
}

/**
 * Check if a specific locator exists
 */
export function hasLocator(selector: string): boolean {
  const pages = loadLocators();
  return getNestedValue(pages, selector) !== undefined;
}
