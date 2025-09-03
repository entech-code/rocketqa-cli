# 📦 Publishing Pandatest to npm

This guide will walk you through the process of publishing pandatest to npm to make it publicly available.

## 🚀 Prerequisites

### 1. npm Account
- Create an account at [npmjs.com](https://www.npmjs.com/)
- Verify your email address
- Enable two-factor authentication (recommended)

### 2. Node.js 20+
- Ensure you have Node.js 20+ installed
- pandatest requires Node.js 20+ due to cucumber-js requirements

### 3. Git Repository
- Have your code in a Git repository
- Update the repository URL in `package.json` to point to your actual repo

## 🔧 Preparation Steps

### 1. Update Repository Information

Edit `package.json` and update these fields with your actual information:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/pandatest.git"
  },
  "author": "YOUR_NAME",
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/pandatest/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/pandatest#readme"
}
```

### 2. Test the Package Locally

```bash
# Test the package
npm test

# Check what will be published
npm pack --dry-run
```

### 3. Login to npm

```bash
npm login
# Enter your username, password, and email
```

## 📤 Publishing Steps

### 1. First Time Publishing

```bash
# Publish the package
npm publish

# This will publish pandatest@1.0.0
```

### 2. Subsequent Updates

```bash
# Update version (patch, minor, or major)
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.1 → 1.1.0
npm version major  # 1.1.0 → 2.0.0

# Publish the new version
npm publish
```

### 3. Publishing Options

```bash
# Publish with specific tag
npm publish --tag beta

# Publish as public (default)
npm publish --access public

# Publish as scoped package (if you want @username/pandatest)
npm publish --access public --scope @username
```

## 🏷️ Version Management

### Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor** (1.0.1 → 1.1.0): New features, backward compatible
- **Major** (1.1.0 → 2.0.0): Breaking changes

### Automatic Versioning

```bash
# Use standard-version for automatic changelog and versioning
npm install -g standard-version

# Generate new version and changelog
standard-version

# This will:
# 1. Update version in package.json
# 2. Create/update CHANGELOG.md
# 3. Create git tag
# 4. Commit changes
```

## 🔍 Verification

### 1. Check npm Registry

Visit: https://www.npmjs.com/package/pandatest

### 2. Test Installation

```bash
# Test in a new directory
mkdir test-pandatest
cd test-pandatest

# Create features folder
mkdir features
echo 'Feature: Test' > features/test.feature

# Test pandatest
npx pandatest test
```

### 3. Check Package Contents

```bash
# See what's in the published package
npm view pandatest
npm pack pandatest
tar -tzf pandatest-1.0.0.tgz
```

## 🚨 Common Issues & Solutions

### 1. Package Name Already Taken

If `pandatest` is already taken, consider:
- `@username/pandatest` (scoped package)
- `pandatest-cli`
- `pandatest-runner`
- `cucumber-pandatest`

### 2. Permission Errors

```bash
# Check if you're logged in
npm whoami

# Re-login if needed
npm logout
npm login
```

### 3. Version Conflicts

```bash
# Check current version
npm view pandatest version

# Force update if needed
npm version patch --force
```

## 📋 Post-Publishing Checklist

- [ ] Package is visible on npmjs.com
- [ ] README.md displays correctly
- [ ] Package can be installed with `npm install pandatest`
- [ ] Tool works with `npx pandatest test`
- [ ] All files are included/excluded correctly
- [ ] Dependencies are correct
- [ ] License is properly set

## 🌟 Marketing Your Package

### 1. Update README
- Add badges for npm version, downloads, etc.
- Include usage examples
- Add screenshots if applicable

### 2. Social Media
- Share on Twitter, LinkedIn, etc.
- Post in relevant communities (Reddit, Discord, etc.)
- Write blog posts about the tool

### 3. GitHub
- Create a proper GitHub repository
- Add issues and pull request templates
- Enable GitHub Discussions

## 🔄 Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Respond to issues and PRs
- Release new versions regularly

### Monitoring
```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Update packages
npm update
```

## 📚 Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Best Practices](https://docs.npmjs.com/best-practices)
- [Package.json Reference](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

---

**Good luck with publishing pandatest! 🚀**

Once published, users worldwide will be able to run:
```bash
npx pandatest test
```
