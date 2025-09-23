# Test Structure Guidelines

This document provides guidelines for organizing tests in the portfolio application following industry best practices.

**⚠️ Current Status: Incomplete Implementation**
Many components and modules lack tests. See [TEST_IMPROVEMENTS_SUMMARY.md](TEST_IMPROVEMENTS_SUMMARY.md) for a comprehensive improvement plan.

## Folder Structure Principles

### 1. **Colocation Principle**
Tests should be colocated with the source code they test to:
- Improve discoverability
- Reduce context switching
- Make it easier to maintain tests when code changes
- Enable better code organization

### 2. **Consistent Naming**
All test files should follow a consistent naming pattern:
- Source file: `ComponentName.tsx` → Test file: `ComponentName.test.tsx`
- Source file: `hookName.ts` → Test file: `hookName.test.ts`
- Source file: `utilityName.ts` → Test file: `utilityName.test.ts`

## Directory Structure

### Current Structure (Partially Implemented)
```
src/
├── components/
│   ├── about/
│   │   ├── __tests__/
│   │   │   └── AboutSection.test.tsx (exists)
│   │   │   └── .gitkeep (others)
│   │   ├── AboutSection.tsx
│   │   ├── CustomizeCard.tsx
│   │   ├── SkillCard.tsx
│   │   └── index.ts
│   ├── blog/
│   │   ├── __tests__/
│   │   │   └── .gitkeep (all)
│   │   ├── AudioPlayer.tsx
│   │   ├── BlogCard.tsx
│   │   ├── PostHeader.tsx
│   │   ├── PostSidebar.tsx
│   │   ├── ReadingProgressBar.tsx
│   │   ├── RelatedPosts.tsx
│   │   └── index.ts
│   ├── common/
│   │   ├── __tests__/
│   │   │   ├── GlobalErrorBoundary.test.tsx (exists)
│   │   │   └── SkipNavigation.test.tsx (exists)
│   │   ├── AppBarTop.tsx
│   │   ├── Footer.tsx
│   │   ├── GlobalErrorBoundary.tsx
│   │   ├── Layout.tsx
│   │   ├── SideDrawer.tsx
│   │   ├── SkipNavigation.tsx
│   │   ├── StatusPage.tsx
│   │   └── index.ts
│   ├── home/
│   │   ├── __tests__/
│   │   │   └── .gitkeep (all)
│   │   ├── CallToAction.tsx
│   │   ├── ContentPreview.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsPreview.tsx
│   │   ├── SkillsShowcase.tsx
│   │   ├── VisitorsCounter.tsx
│   │   └── index.ts
│   ├── mdx/
│   │   ├── __tests__/
│   │   │   └── .gitkeep (all)
│   │   ├── ChartJSBlock.tsx
│   │   ├── CodeBlock.tsx
│   │   └── index.ts
│   ├── projects/
│   │   ├── __tests__/
│   │   │   └── .gitkeep (all)
│   │   ├── ProjectCard.tsx
│   │   └── index.ts
│   ├── style/
│   │   ├── __tests__/
│   │   │   └── .gitkeep (all)
│   │   ├── blog/
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   ├── CustomizeBox.tsx
│   │   ├── CustomizeTooltip.tsx
│   │   └── index.ts
│   └── tutorial/
│       ├── __tests__/
│       │   └── .gitkeep (all)
│       ├── TutorialCard.tsx
│       └── index.ts
├── context/
│   ├── __tests__/
│   │   ├── ThemeContext.test.tsx (exists but needs more tests)
│   │   └── VisitorContext.test.tsx (exists)
│   ├── ThemeContext.tsx
│   └── VisitorContext.tsx
├── hooks/
│   ├── __tests__/
│   │   ├── useErrorHandler.test.ts (exists)
│   │   └── useTouchDevice.test.ts (exists but partial)
│   ├── useErrorHandler.ts
│   ├── useTouchDevice.ts
│   └── index.ts
├── lib/
│   ├── blog.ts
│   ├── projects.ts
│   └── tutorials.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── 404.tsx
│   ├── error.tsx
│   ├── index.tsx
│   ├── about/
│   │   └── index.tsx
│   ├── blog/
│   │   ├── [slug].tsx
│   │   └── index.tsx
│   └── ... (other page directories)
├── services/
│   ├── __tests__/
│   │   └── errorMonitoring.test.ts (exists)
│   └── errorMonitoring.ts
├── styles/
│   ├── globals.css
│   └── theme.ts
└── utils/
    ├── __tests__/
    │   ├── animationConfig.test.ts (exists)
    │   ├── constants.test.ts (exists)
    │   ├── errorHandler.test.ts (exists)
    │   ├── heroData.test.ts (exists)
    │   └── aboutData.test.ts (exists)
    ├── aboutData.ts
    ├── animationConfig.ts
    ├── constants.ts
    ├── contactData.ts
    ├── drawerData.ts
    ├── errorHandler.ts
    ├── experienceData.ts
    ├── heroData.ts
    ├── index.ts
    ├── skillData.ts
    ├── socialLinks.ts
    └── ...
```

## Test Organization Guidelines

### 1. **Component Tests**
- Place in `__tests__` directory within the same component folder
- Test rendering, props, user interactions, and accessibility
- Use React Testing Library best practices

### 2. **Hook Tests**
- Place in `__tests__` directory within the hooks folder
- Test initial state, state updates, and side effects
- Use `renderHook` from React Testing Library

### 3. **Context Tests**
- Place in `__tests__` directory within the context folder
- Test provider and consumer behavior
- Test state management and updates

### 4. **Service Tests**
- Place in `__tests__` directory within the services folder
- Test API interactions and service behavior
- Mock external dependencies appropriately

### 5. **Utility Tests**
- Place in `__tests__` directory within the utils folder
- Test pure functions and utility methods
- Cover edge cases and error conditions

### 6. **Library Tests**
- Place in `__tests__` directory within the lib folder
- Test data processing and business logic
- Mock file system operations when needed

### 7. **Page Tests**
- Place in `__tests__` directory within the pages folder
- Test page rendering and data fetching
- Test error states and loading states

## File Naming Conventions

### Test Files
1. **Component tests**: `ComponentName.test.tsx`
2. **Hook tests**: `useHookName.test.ts`
3. **Context tests**: `ContextName.test.tsx`
4. **Service tests**: `serviceName.test.ts`
5. **Utility tests**: `utilityName.test.ts`
6. **Library tests**: `libraryName.test.ts`
7. **Page tests**: `pageName.test.tsx`

### Test Descriptions
1. **Top-level describe**: Use the name of the component/hook/utility being tested
2. **Nested describes**: Group related functionality (e.g., "when props are provided", "user interactions")
3. **Individual tests**: Use clear, descriptive names that explain the expected behavior

## Best Practices

### 1. **AAA Pattern**
Structure tests using Arrange-Act-Assert:
```javascript
it('should render correctly', () => {
  // Arrange
  const props = { /* test props */ };
  
  // Act
  render(<Component {...props} />);
  
  // Assert
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### 2. **Test Isolation**
- Each test should be independent
- Use beforeEach/afterEach for setup/teardown
- Reset mocks between tests

### 3. **Mocking Strategy**
- Mock external dependencies (API calls, browser APIs)
- Use factory functions for complex mock objects
- Mock at the module level when appropriate

### 4. **Accessibility Testing**
- Test ARIA attributes
- Verify keyboard navigation
- Check screen reader compatibility

## Current Issues and Gaps

### 1. **Incomplete Test Coverage**
- Many components lack any tests
- Several utilities are untested
- Pages have no test coverage
- Context providers need more comprehensive tests

### 2. **Inconsistent Implementation**
- Some directories have tests, others only have `.gitkeep`
- Test quality varies between existing tests
- Missing integration tests between components

### 3. **Documentation vs Implementation Gap**
- Documentation states 80% coverage goal but actual is ~10%
- Test structure guidelines don't reflect current reality

## Improvement Plan

See [TEST_IMPROVEMENTS_SUMMARY.md](TEST_IMPROVEMENTS_SUMMARY.md) for a detailed 5-phase plan to address all testing gaps and improve the overall quality of the test suite.

This structure provides a roadmap for achieving maintainable and scalable testing in the portfolio application.