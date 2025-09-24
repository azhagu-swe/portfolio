# Testing Strategy

This document outlines the testing strategy for the portfolio application.

## Current Status

**⚠️ Testing Implementation Incomplete**: The project currently has significant gaps in test coverage. Only 12 out of many components and modules have tests, with overall coverage at approximately 10% across all metrics, far below the target of 80%.

## Testing Frameworks

- **Jest**: JavaScript testing framework for unit and integration tests
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: Custom jest matchers for DOM assertions
- **@testing-library/user-event**: For simulating user interactions

## Test Structure

Tests are organized in `__tests__` directories colocated with the components they test:

```
src/
├── components/
│   ├── common/
│   │   ├── SkipNavigation.tsx
│   │   └── __tests__/
│   │       └── SkipNavigation.test.tsx
│   └── ...
├── hooks/
│   ├── useErrorHandler.ts
│   └── __tests__/
│       └── useErrorHandler.test.ts
└── utils/
    ├── errorHandler.ts
    └── __tests__/
        └── errorHandler.test.ts
```

For detailed guidelines on test structure and organization, see [TEST_STRUCTURE_GUIDELINES.md](TEST_STRUCTURE_GUIDELINES.md).

## Test Commands

- `npm run test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

## Test Categories

### Unit Tests
Test individual functions and utilities in isolation.

### Component Tests
Test React components rendering and basic interactions.

### Integration Tests
Test how multiple units work together.

### End-to-End Tests (Planned)
Test user workflows from start to finish.

## Current Test Coverage

**Overall Coverage: ~10%**
- Statements: 9.88%
- Branches: 7.08%
- Functions: 10.1%
- Lines: 8.95%

### Well-tested Areas
1. Utilities (aboutData, heroData, animationConfig, constants)
2. Error handling (errorHandler, useErrorHandler)
3. Some context (VisitorContext)
4. Some components (SkipNavigation, GlobalErrorBoundary)
5. Services (errorMonitoring)

### Poorly-tested Areas (Needs Improvement)
1. Most UI Components (Blog, Projects, Home sections)
2. Pages (all page components lack tests)
3. Context providers (ThemeContext)
4. Hooks (useResponsive, useTouchDevice partially tested)
5. Libraries (blog, projects, tutorials data processing)
6. Styles and themes

## Test Coverage Goals

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Writing Tests

### Component Tests
- Test rendering with different props
- Test user interactions
- Test accessibility attributes
- Use proper selectors (role, text, labels)

### Hook Tests
- Test initial state
- Test state updates
- Test side effects
- Use `act()` for state changes

### Utility Tests
- Test all code paths
- Test edge cases
- Mock external dependencies

## Mocking Strategy

- Mock external APIs and services
- Mock browser APIs when needed
- Use factory functions for complex mocks
- Keep mocks as simple as possible

## Continuous Integration

Tests are run automatically in CI pipeline on every pull request.

## Improvement Plan

See [TEST_IMPROVEMENTS_SUMMARY.md](TEST_IMPROVEMENTS_SUMMARY.md) for a detailed plan to improve test coverage and implementation.