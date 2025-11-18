# Low-Level Design (LLD) - Portfolio Application

## Overview

This document provides a detailed low-level design of the portfolio application, focusing on component implementations, data structures, and internal logic.

## Component Architecture

### 1. Experience Section Component

#### Class/Component Diagram

```mermaid
classDiagram
    class ExperienceSection {
        -experienceData: Array~ExperienceItem~
        -theme: Theme
        +render(): JSX.Element
        +handleAnimation(): void
    }
    
    class ExperienceItem {
        +year: string
        +title: string
        +company: string
        +responsibilities: string[]
        +icon: JSX.Element
    }
    
    ExperienceSection --> ExperienceItem : contains
```

#### Component Implementation Details

```mermaid
graph TD
    A[ExperienceSection Component] --> B[Fetch EXPERIENCE_DATA]
    B --> C[Map roles to experience items]
    C --> D[Render timeline layout]
    D --> E[For each role, render:]
    E --> F[Year/Duration badge]
    E --> G[Job title]
    E --> H[Company name]
    E --> I[Responsibility points with bullet points]
    I --> J[Animated entry using framer-motion]
```

### 2. Data Flow for Experience Section

```mermaid
sequenceDiagram
    participant C as ExperienceSection
    participant D as experienceData.ts
    participant T as Template
    
    C->>D: Import EXPERIENCE_DATA
    D-->>C: Return {header, roles, achievements, skills}
    C->>C: Transform roles to experience items
    C->>T: Render with Material-UI components
    T-->>C: Apply framer-motion animations
```

## Data Structures

### 1. Experience Data Structure

```typescript
interface ExperienceRole {
  title: string;
  company: string;
  duration: string; // e.g. "Aug 2022 – Oct 2025"
  location: string;
  responsibilities: string[]; // HTML strings with <strong> tags
  techStack: string[];
}

interface ExperienceData {
  header: {
    title: string;
    subtitle: string;
  };
  roles: ExperienceRole[];
  achievements: string[];
  skills: string[];
}
```

### 2. Component State Management

```mermaid
stateDiagram-v2
    [*] --> Mounted
    Mounted --> FetchData: Component mounts
    FetchData --> TransformData: Data received
    TransformData --> RenderUI: Data transformed
    RenderUI --> Animate: UI rendered
    Animate --> [*]: Component visible
```

## Implementation Details

### 1. Experience Section Component

```mermaid
flowchart TD
    A[ExperienceSection] --> B[useTheme hook for theme]
    A --> C[Import EXPERIENCE_DATA]
    B --> D[Define container variants]
    C --> D
    D --> E[Define item variants]
    E --> F[Render container with motion.div]
    F --> G[Map through EXPERIENCE_DATA.roles]
    G --> H[Create experience item for each role]
    H --> I[Render timeline with proper positioning]
    I --> J[For each item render Paper component]
    J --> K[Display year, title, company, and responsibilities]
    K --> L[Render responsibilities as bullet points]
    L --> M[Apply hover effects and animations]
```

### 2. Data Transformation Logic

The component performs the following transformations:

```typescript
// Input: EXPERIENCE_DATA.roles (array of ExperienceRole)
// Output: experienceData (array of items for UI)

const experienceData = [
  ...EXPERIENCE_DATA.roles.map(role => ({
    year: role.duration,           // duration becomes year
    title: role.title,             // job title
    company: role.company,         // company name
    responsibilities: role.responsibilities, // array of responsibilities
    icon: <Work />                // fixed icon for work experience
  }))
];
```

## UI/UX Implementation

### 1. Timeline Layout

```mermaid
graph LR
    A[Container with left padding] --> B[Vertical gradient line]
    B --> C[Position indicators at specific points]
    C --> D[Experience item boxes positioned to the right]
    D --> E[Each box has a circular icon on the left]
    E --> F[Content area with job details]
```

### 2. Responsive Design Strategy

```mermaid
graph TD
    A[Responsive Breakpoints] --> B{xs: 0px}
    A --> C{sm: 600px}
    A --> D{md: 960px}
    A --> E{lg: 1280px}
    
    B --> F[Mobile-first approach]
    C --> F
    D --> G[Desktop optimizations]
    E --> G
```

## Animation System

### 1. Framer Motion Implementation

```mermaid
stateDiagram-v2
    [*] --> Hidden: Initial state
    Hidden --> Visible: Animate based on viewport
    Visible --> Staggered: Animate children with delay
    Staggered --> Complete: All animations finished
    Complete --> [*]: Ready for interaction
```

### 2. Animation Variants

```typescript
// Container Variants
containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Item Variants
itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}
```

## Styling Implementation

### 1. Material-UI Component Styling

```mermaid
graph TD
    A[Material-UI Components] --> B[Box for layout containers]
    A --> C[Typography for text elements]
    A --> D[Paper for experience cards]
    A --> E[Icons for visual elements]
    
    B --> F[Flex properties: display, flexDirection, alignItems]
    C --> G[Typography variants: h3, h5, h6, body1]
    D --> H[Elevation and border radius styling]
    E --> I[Icon size based on breakpoints]
```

### 2. Theme Integration

```mermaid
graph LR
    A[useTheme Hook] --> B[Primary Color]
    A --> C[Secondary Color]
    A --> D[Mode (light/dark)]
    
    B --> E[Gradient generation]
    C --> E
    D --> F[Background colors]
    D --> G[Text colors]
```

## Error Handling and Edge Cases

### 1. Data Availability

```mermaid
flowchart TD
    A[ExperienceSection Mounts] --> B{EXPERIENCE_DATA Available?}
    B -->|Yes| C[Process and Display Data]
    B -->|No| D[Render Fallback UI]
    C --> E[Animate Components]
    D --> F[Display Error Message]
```

### 2. Responsive Behavior

```mermaid
sequenceDiagram
    participant W as Window
    participant C as Component
    participant M as Material-UI
    
    W->>C: Resize event
    C->>M: Request responsive props
    M-->>C: Return breakpoint-appropriate values
    C->>C: Re-render with new dimensions
```

## Performance Optimizations

### 1. Rendering Strategy

```mermaid
graph TD
    A[Experience Data] --> B[Lazy Loading]
    A --> C[Virtual Scrolling]
    A --> D[Component Memoization]
    
    B --> E[Load components as needed]
    C --> F[Render only visible items]
    D --> G[Prevent unnecessary re-renders]
```

### 2. Memory Management

- Use React.memo for components with stable props
- Clean up event listeners when components unmount
- Optimize SVG icons with proper sizing

## Testing Strategy

### 1. Component Testing

```mermaid
graph LR
    A[Test Suite] --> B[Unit Tests]
    A --> C[Integration Tests]
    A --> D[Snapshot Tests]
    
    B --> E[Test component rendering]
    C --> F[Test data flow]
    D --> G[Test UI structure]
```

### 2. Specific Test Cases

- Test experience data rendering
- Verify animation behavior
- Validate responsive layouts
- Check accessibility features