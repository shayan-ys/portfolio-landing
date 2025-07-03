# Accessibility Testing Guide

This project uses multiple tools and methods to ensure accessibility compliance and provide an inclusive user experience.

## Tools Used

### 1. Runtime Testing with Axe-Core

- **@axe-core/react**: Automatically runs accessibility checks in development mode
- Outputs violations to the browser console
- Only runs in development mode to avoid performance impact in production

### 2. Static Analysis with ESLint

- **eslint-plugin-jsx-a11y**: Catches accessibility issues during development
- Integrated into the ESLint configuration
- Runs automatically in your IDE and during linting

### 3. Automated Auditing with Lighthouse CI

- **@lhci/cli**: Runs Lighthouse accessibility audits
- Configured to ensure minimum accessibility score of 90%
- Can be integrated into CI/CD pipeline

## Available Scripts

### Development

```bash
# Run accessibility linting checks
npm run a11y:dev

# Run all accessibility tests (lint + build + audit)
npm run a11y:test

# Run only linting with zero warnings tolerance
npm run a11y:lint
```

### CI/CD Integration

```bash
# Run Lighthouse CI with configuration
npm run a11y:lighthouse-ci

# Run standalone Lighthouse audit
npm run a11y:lighthouse
```

## Usage

### During Development

1. **Real-time feedback**: Axe-core will automatically log accessibility violations to the browser console
2. **IDE integration**: ESLint will show accessibility warnings/errors in your editor
3. **Pre-commit checks**: Run `npm run a11y:dev` before committing

### Before Deployment

1. Run `npm run a11y:test` to ensure all accessibility checks pass
2. Review any violations in the Lighthouse report
3. Fix issues before merging to main branch

## Configuration Files

### ESLint Configuration (`.eslintrc.json`)

- Includes jsx-a11y plugin with recommended rules
- Configured for Next.js Link components
- Enforces ARIA best practices

### Lighthouse CI Configuration (`lighthouserc.json`)

- Accessibility score minimum: 90%
- Runs 3 times for consistent results
- Configured for local development server

## Common Issues Fixed

### 1. Inappropriate ARIA Roles

- **Issue**: `<span role="link">` - spans should not have link roles
- **Fix**: Remove inappropriate role attributes from non-interactive elements

### 2. Missing Alternative Text

- **Issue**: Images without alt attributes
- **Fix**: Add descriptive alt text for informative images, empty alt for decorative images

### 3. Color Contrast Issues

- **Issue**: Text not meeting WCAG contrast ratios
- **Fix**: Ensure 4.5:1 contrast for normal text, 3:1 for large text

### 4. Keyboard Navigation

- **Issue**: Elements not accessible via keyboard
- **Fix**: Ensure proper tab order and keyboard event handlers

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe-core Rule Descriptions](https://dequeuniversity.com/rules/axe/)
- [ESLint JSX A11Y Plugin Rules](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#supported-rules)
- [Lighthouse Accessibility Audit](https://web.dev/lighthouse-accessibility/)

## Best Practices

1. **Test with real users**: Automated tools catch ~30% of accessibility issues
2. **Use semantic HTML**: Proper HTML elements provide built-in accessibility
3. **Test with keyboard only**: Ensure all functionality works without a mouse
4. **Test with screen readers**: Use NVDA, JAWS, or VoiceOver for testing
5. **Check color contrast**: Use tools like WebAIM's contrast checker
6. **Provide alternative text**: For images, videos, and other media
7. **Use proper heading structure**: Logical h1-h6 hierarchy
8. **Ensure focus management**: Visible focus indicators and logical tab order

## Troubleshooting

### Axe-core not showing violations

- Check browser console in development mode
- Ensure the AccessibilityProvider is properly imported
- Verify React dev tools are enabled

### ESLint not catching issues

- Ensure jsx-a11y plugin is properly configured
- Check file extensions in ESLint configuration
- Verify IDE ESLint extension is enabled

### Lighthouse CI failing

- Check server is running on correct port
- Verify lighthouserc.json configuration
- Ensure build completes successfully

## Maintenance

- Update dependencies regularly for latest accessibility rules
- Review and update minimum score thresholds as needed
- Add new accessibility rules as they become available
- Monitor for new accessibility standards and guidelines
