# Testing Structure and Naming Conventions

This document outlines the proper testing structure and naming conventions for the portfolio application.

## Recommended Test Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── __tests__/
│   │   │   ├── ComponentName.test.tsx
│   │   │   └── ComponentName.spec.tsx
│   │   ├── ComponentName.tsx
│   │   └── index.ts
│   ├── home/
│   │   ├── __tests__/
│   │   │   └── ComponentName.test.tsx
│   │   └── ComponentName.tsx
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   ├── useHookName.test.ts
│   │   └── useHookName.spec.ts
│   ├── useHookName.ts
│   └── index.ts
├── context/
│   ├── __tests__/
│   │   ├── ContextName.test.tsx
│   │   └── ContextName.spec.tsx
│   ├── ContextName.tsx
│   └── index.ts
├── services/
│   ├── __tests__/
│   │   ├── serviceName.test.ts
│   │   └── serviceName.spec.ts
│   ├── serviceName.ts
│   └── index.ts
├── utils/
│   ├── __tests__/
│   │   ├── utilityName.test.ts
│   │   └── utilityName.spec.ts
│   ├── utilityName.ts
│   └── index.ts
├── lib/
│   ├── __tests__/
│   │   ├── libraryName.test.ts
│   │   └── libraryName.spec.ts
│   └── libraryName.ts
└── pages/
    ├── __tests__/
    │   ├── pageName.test.tsx
    │   └── pageName.spec.tsx
    └── pageName.tsx
```

## Current Implementation

The current implementation follows a good pattern with `__tests__` directories colocated with the source files:

```
src/
├── components/
│   ├── common/
│   │   ├── __tests__/
│   │   │   ├── GlobalErrorBoundary.test.tsx
│   │   │   └── SkipNavigation.test.tsx
│   │   ├── GlobalErrorBoundary.tsx
│   │   └── SkipNavigation.tsx
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   └── useErrorHandler.test.ts
│   ├── useErrorHandler.ts
│   └── index.ts
├── context/
│   ├── __tests__/
│   │   └── VisitorContext.test.ts
│   ├── VisitorContext.tsx
│   └── ThemeContext.tsx
├── services/
│   ├── __tests__/
│   │   └── errorMonitoring.test.ts
│   ├── errorMonitoring.ts
│   └── index.ts
└── utils/
    ├── __tests__/
    │   ├── animationConfig.test.ts
    │   ├── constants.test.ts
    │   ├── errorHandler.test.ts
    │   └── heroData.test.ts
    ├── animationConfig.ts
    ├── constants.ts
    ├── errorHandler.ts
    └── heroData.ts
```

## Naming Conventions

### Test Files
1. **File naming**: Use the same name as the source file with `.test.ts` or `.test.tsx` extension
2. **Examples**:
   - `GlobalErrorBoundary.tsx` → `GlobalErrorBoundary.test.tsx`
   - `useErrorHandler.ts` → `useErrorHandler.test.ts`
   - `constants.ts` → `constants.test.ts`

### Test Descriptions
1. **Describe blocks**: Use the component/hook/utility name
   - `describe('GlobalErrorBoundary', () => { ... })`
   - `describe('useErrorHandler', () => { ... })`
   - `describe('Constants', () => { ... })`

2. **Test cases**: Use descriptive names that explain what is being tested
   - `it('should render children when there is no error', () => { ... })`
   - `it('should handle an error correctly', () => { ... })`
   - `it('should have correct API endpoints', () => { ... })`

## Test Organization

### Unit Tests
- Test individual functions and utilities in isolation
- Mock external dependencies
- Focus on a single unit of functionality

### Component Tests
- Test component rendering
- Test props handling
- Test user interactions
- Test accessibility features

### Integration Tests
- Test how multiple units work together
- Test context providers and consumers
- Test complex component interactions

### Best Practices

1. **Colocation**: Keep tests close to the code they test
2. **Clear structure**: Organize tests with logical describe/it blocks
3. **Descriptive names**: Use clear, readable test names
4. **Proper setup/teardown**: Use beforeEach/afterEach for test setup
5. **Mocking**: Mock external dependencies appropriately
6. **Accessibility**: Test accessibility features
7. **Edge cases**: Test boundary conditions and error cases

## Example Test Structure

```typescript
// Component test example
describe('ComponentName', () => {
  // Setup that runs before each test
  beforeEach(() => {
    // Reset mocks
    // Setup test data
  });

  // Teardown that runs after each test
  afterEach(() => {
    // Cleanup
  });

  // Group related tests
  describe('when props are provided', () => {
    it('should render correctly with default props', () => {
      // Test implementation
    });

    it('should handle prop changes correctly', () => {
      // Test implementation
    });
  });

  describe('when user interacts', () => {
    it('should handle click events', () => {
      // Test implementation
    });

    it('should handle keyboard events', () => {
      // Test implementation
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      // Test implementation
    });

    it('should be keyboard navigable', () => {
      // Test implementation
    });
  });
});
```

## Test File Extensions

- **.test.ts**: For TypeScript files without JSX
- **.test.tsx**: For TypeScript files with JSX
- **.spec.ts**: Alternative to .test.ts (less common in this project)
- **.spec.tsx**: Alternative to .test.tsx (less common in this project)

## Mocking Strategy

1. **Jest mocks**: Use `jest.mock()` for module mocking
2. **Manual mocks**: Place in `__mocks__` directory at project root
3. **Factory functions**: Use for complex mock objects
4. **Spy functions**: Use `jest.spyOn()` for monitoring function calls

## Continuous Integration

Tests should be organized to run efficiently in CI:
1. **Unit tests**: Fast, run first
2. **Integration tests**: Slower, run after unit tests
3. **E2E tests**: Slowest, run in specific environments

This structure ensures maintainability, scalability, and clarity in the testing approach.