# Test Structure Guidelines

This document provides guidelines for organizing tests in the portfolio application following industry best practices.

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

### Current Structure
```
src/
├── components/
│   ├── about/
│   │   ├── __tests__/
│   │   │   └── .gitkeep
│   │   ├── AboutSection.tsx
│   │   ├── CustomizeCard.tsx
│   │   ├── SkillCard.tsx
│   │   └── index.ts
│   ├── blog/
│   │   ├── __tests__/
│   │   │   └── .gitkeep
│   │   ├── AudioPlayer.tsx
│   │   ├── BlogCard.tsx
│   │   ├── PostHeader.tsx
│   │   ├── PostSidebar.tsx
│   │   ├── ReadingProgressBar.tsx
│   │   ├── RelatedPosts.tsx
│   │   └── index.ts
│   ├── common/
│   │   ├── __tests__/
│   │   │   ├── GlobalErrorBoundary.test.tsx
│   │   │   └── SkipNavigation.test.tsx
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
│   │   │   └── .gitkeep
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
│   │   │   └── .gitkeep
│   │   ├── ChartJSBlock.tsx
│   │   ├── CodeBlock.tsx
│   │   └── index.ts
│   ├── projects/
│   │   ├── __tests__/
│   │   │   └── .gitkeep
│   │   ├── ProjectCard.tsx
│   │   └── index.ts
│   ├── style/
│   │   ├── __tests__/
│   │   │   └── .gitkeep
│   │   ├── blog/
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   ├── CustomizeBox.tsx
│   │   ├── CustomizeTooltip.tsx
│   │   └── index.ts
│   └── tutorial/
│       ├── __tests__/
│       │   └── .gitkeep
│       ├── TutorialCard.tsx
│       └── index.ts
├── context/
│   ├── __tests__/
│   │   ├── ThemeContext.test.tsx
│   │   └── VisitorContext.test.tsx
│   ├── ThemeContext.tsx
│   └── VisitorContext.tsx
├── hooks/
│   ├── __tests__/
│   │   └── useErrorHandler.test.ts
│   ├── useErrorHandler.ts
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
│   │   └── errorMonitoring.test.ts
│   └── errorMonitoring.ts
├── styles/
│   ├── globals.css
│   └── theme.ts
└── utils/
    ├── __tests__/
    │   ├── animationConfig.test.ts
    │   ├── constants.test.ts
    │   ├── errorHandler.test.ts
    │   └── heroData.test.ts
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

## File Naming Conventions

### Test Files
1. **Component tests**: `ComponentName.test.tsx`
2. **Hook tests**: `useHookName.test.ts`
3. **Context tests**: `ContextName.test.tsx`
4. **Service tests**: `serviceName.test.ts`
5. **Utility tests**: `utilityName.test.ts`
6. **Library tests**: `libraryName.test.ts`

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

## Future Improvements

### 1. **Add Missing Tests**
- Create tests for components currently without test files
- Add tests for utility functions
- Implement integration tests for complex interactions

### 2. **Enhance Existing Tests**
- Add more edge case coverage
- Improve accessibility testing
- Add performance testing where appropriate

### 3. **Organize by Feature**
Consider organizing tests by feature rather than by type for larger applications:
```
features/
├── authentication/
│   ├── components/
│   │   └── __tests__/
│   ├── hooks/
│   │   └── __tests__/
│   └── services/
│       └── __tests__/
└── dashboard/
    ├── components/
    │   └── __tests__/
    └── ...
```

This structure provides a solid foundation for maintainable and scalable testing in the portfolio application.