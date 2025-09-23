# Application Structure and Organization

This document outlines the structure and organization of the portfolio application.

## Directory Structure

```
src/
├── components/
│   ├── common/          # Shared layout components (AppBar, Footer, etc.)
│   ├── home/            # Homepage-specific components
│   ├── ui/              # Reusable UI components
│   ├── blog-page/       # Blog-related components
│   ├── project-page/    # Project-related components
│   ├── tutorial-page/   # Tutorial-related components
│   ├── about-page/      # About page components
│   ├── style/           # Styling utilities
│   ├── mdx/             # MDX components
│   └── index.ts         # Component exports
├── content/             # Content files (posts, projects, tutorials)
│   ├── posts/           # Blog post content
│   ├── projects/        # Project content
│   └── tutorials/       # Tutorial content
├── pages/               # Next.js pages
├── lib/                 # Utility libraries and data processing
├── services/            # External service integrations
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── utils/               # Utility functions
```

## Naming Conventions

1. **Directories**: All directory names use kebab-case
2. **Page-specific directories**: Suffixed with `-page` (e.g., `blog-page`, `project-page`)
3. **Reusable component directories**: No suffix (e.g., `ui`, `common`)
4. **Files**: Use PascalCase for components, camelCase for utilities

## Component Organization

### Reusable Components (`ui/`)
- Components that can be used across multiple pages
- Should not have page-specific logic
- Examples: Cards, Buttons, Form elements

### Page-specific Components
- Components that are specific to a particular page or section
- Organized in directories with `-page` suffix
- May contain page-specific logic

### Common Components (`common/`)
- Layout components used across the entire application
- Examples: Header, Footer, Layout wrappers

## Content Organization

Content files (posts, projects, tutorials) are stored in the `content/` directory with consistent naming:

- `content/posts/` - Blog posts in MDX format
- `content/projects/` - Project descriptions in MDX format
- `content/tutorials/` - Tutorial content in MDX format

This structure keeps content separate from code while maintaining consistency.