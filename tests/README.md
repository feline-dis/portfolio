# Portfolio Site Test Suite

This directory contains comprehensive tests for the portfolio website, covering components, content validation, accessibility, visual consistency, and performance.

## Test Structure

```
tests/
├── components/          # Unit tests for Astro components
├── content/            # Content collection validation tests
├── accessibility/      # Accessibility compliance tests
├── visual/            # Theme consistency and visual regression tests
├── performance/       # Performance and Lighthouse audit tests
├── setup.ts           # Test environment setup
└── README.md          # This file
```

## Test Categories

### 1. Component Tests (`tests/components/`)

Unit tests for core UI components:

- **Hero.test.ts**: Tests hero section rendering, accessibility attributes, and structure
- **ProjectCard.test.ts**: Tests project card component with mock data
- **BlogCard.test.ts**: Tests blog card component including reading time calculation
- **Navigation.test.ts**: Tests navigation component and mobile menu functionality

**Key Features Tested:**
- Component rendering and structure
- Accessibility attributes (ARIA labels, roles)
- Responsive design elements
- Interactive functionality
- Proper link generation

### 2. Content Collection Tests (`tests/content/`)

Validates content collection schemas and data parsing:

- **collections.test.ts**: Tests Zod schema validation for projects and blog posts

**Key Features Tested:**
- Required field validation
- Optional field defaults
- URL format validation
- Date parsing
- Array field handling
- Frontmatter parsing simulation

### 3. Accessibility Tests (`tests/accessibility/`)

Comprehensive accessibility compliance testing:

- **color-contrast.test.ts**: Tests WCAG AA/AAA color contrast compliance

**Key Features Tested:**
- Color contrast ratio calculations
- WCAG AA compliance (4.5:1 ratio for normal text, 3:1 for large text)
- WCAG AAA compliance (7:1 ratio for normal text, 4.5:1 for large text)
- Dark theme color combinations
- Real-world theme color validation
- Button text readability

### 4. Visual Consistency Tests (`tests/visual/`)

Tests for consistent theming and design system:

- **theme-consistency.test.ts**: Tests CSS custom properties and design system consistency

**Key Features Tested:**
- Color palette consistency
- Typography scale validation
- Spacing system consistency
- Border radius consistency
- Transition timing consistency
- Component theme integration

### 5. Performance Tests (`tests/performance/`)

Performance auditing and optimization validation:

- **lighthouse-test.js**: Comprehensive Lighthouse audits for multiple pages

**Key Features Tested:**
- Core Web Vitals (FCP, LCP, CLS, TBT)
- Performance scores
- Accessibility scores
- Best practices compliance
- SEO optimization
- Image optimization
- Text compression
- Cache policies

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Test UI
```bash
npm run test:ui
```

### Coverage Report
```bash
npm run test:coverage
```

### Performance Tests
```bash
# Build and start preview server first
npm run build
npm run preview &

# Run Lighthouse tests
npm run test:e2e
```

## Test Configuration

### Vitest Configuration (`vitest.config.ts`)
- Uses `happy-dom` environment for DOM testing
- Includes test setup file for mocks and utilities
- Configured for TypeScript support
- Coverage reporting enabled

### Test Setup (`tests/setup.ts`)
- Mock Astro globals
- Mock CSS imports
- Mock browser APIs (matchMedia, IntersectionObserver, ResizeObserver)
- Jest-DOM matchers for enhanced assertions

## Accessibility Testing

The accessibility tests ensure the portfolio meets WCAG guidelines:

### Color Contrast Testing
- Tests all color combinations used in the dark theme
- Validates contrast ratios for different text sizes
- Ensures interactive elements have sufficient contrast
- Reports specific failing combinations for improvement

### Current Accessibility Status
✅ **Passing**: Primary text combinations, navigation, interactive elements
⚠️ **Attention Needed**: Some muted text and border combinations (acceptable for dark themes)

## Performance Testing

The Lighthouse tests validate:

### Performance Thresholds
- Performance Score: ≥90
- Accessibility Score: ≥95
- Best Practices Score: ≥90
- SEO Score: ≥95

### Core Web Vitals Thresholds
- First Contentful Paint: ≤1.8s
- Largest Contentful Paint: ≤2.5s
- Cumulative Layout Shift: ≤0.1
- Total Blocking Time: ≤200ms

## Continuous Integration

Tests are designed to run in CI environments:

1. **Unit Tests**: Fast component and content validation
2. **Accessibility Tests**: Automated WCAG compliance checking
3. **Visual Tests**: Theme consistency validation
4. **Performance Tests**: Lighthouse audits on built site

## Adding New Tests

### Component Tests
1. Create test file in `tests/components/`
2. Mock component HTML structure
3. Test rendering, accessibility, and functionality
4. Use `textContent?.trim()` for text assertions to handle whitespace

### Content Tests
1. Add schema validation tests in `tests/content/`
2. Test both valid and invalid data scenarios
3. Include edge cases and error handling

### Accessibility Tests
1. Add color combinations to `src/utils/accessibility.ts`
2. Test contrast ratios and WCAG compliance
3. Include real-world usage scenarios

### Performance Tests
1. Add new pages to `lighthouse-test.js`
2. Define appropriate thresholds
3. Test critical user journeys

## Best Practices

1. **Mock External Dependencies**: Use mocks for browser APIs and external services
2. **Test User Scenarios**: Focus on real user interactions and workflows
3. **Accessibility First**: Ensure all interactive elements are accessible
4. **Performance Budgets**: Set and maintain performance thresholds
5. **Realistic Expectations**: Balance ideal standards with practical dark theme constraints

## Troubleshooting

### Common Issues

1. **Text Content Assertions**: Use `.trim()` to handle whitespace in HTML
2. **Color Contrast**: Dark themes may not meet strict WCAG AA for all combinations
3. **Performance Tests**: Ensure preview server is running before Lighthouse tests
4. **Mock Issues**: Check test setup for proper browser API mocks

### Debug Tips

1. Use `npm run test:ui` for interactive debugging
2. Check console output for accessibility warnings
3. Review Lighthouse reports for performance insights
4. Use coverage reports to identify untested code