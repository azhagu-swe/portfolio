interface Skill {
  name: string;
  icon: string;
  level: string;
  tutorialSlug?: string; 
}

export const SKILLS_DATA: {
  header: {
    title: string;
    subtitle: string;
  };
  skills: Skill[]; 
} = {
  header: {
    title: "My Skills",
    subtitle: "A showcase of my expertise and the tools I excel at.",
  },
  skills: [
    {
      name: "Java",
      icon: "logos:java",
      level: "Advanced",
      tutorialSlug: "java-beginner",
    },
    {
      name: "Spring Boot",
      icon: "simple-icons:springboot",
      level: "Advanced",
      tutorialSlug: "spring-beginner",
    },
    {
      name: "React.js",
      icon: "logos:react",
      level: "Advanced",
      tutorialSlug: "react-beginner",
    },
    {
      name: "Next.js",
      icon: "logos:nextjs-icon",
      level: "Intermediate",
      tutorialSlug: "nextjs-beginner",
    },
    {
      name: "PostgreSQL",
      icon: "logos:postgresql",
      level: "Advanced",
      tutorialSlug: "sql-beginner",
    },
    {
      name: "System Design",
      icon: "mdi:developer-board",
      level: "Intermediate",
      tutorialSlug: "system-design",
    },
    {
      name: "Data Structures & Algorithms",
      icon: "mdi:graph-outline",
      level: "Intermediate",
      tutorialSlug: "dsa-beginner",
    },
    {
      name: "JavaScript",
      icon: "logos:javascript",
      level: "Intermediate",
      tutorialSlug: "javascript-beginner",
    },
    {
      name: "TypeScript",
      icon: "logos:typescript-icon",
      level: "Intermediate",
    },
    {
      name: "Redis",
      icon: "logos:redis",
      level: "Intermediate",
    },
    {
      name: "RabbitMQ",
      icon: "logos:rabbitmq-icon",
      level: "Intermediate",
    },
    {
      name: "MUI",
      icon: "logos:material-ui",
      level: "Advanced",
    },
    {
      name: "Git",
      icon: "logos:git-icon",
      level: "Advanced",
    },
    {
      name: "Mapbox",
      icon: "logos:mapbox-icon",
      level: "Intermediate",
    },
    {
      name: "RESTful APIs",
      icon: "mdi:api",
      level: "Advanced",
    },
  ],
};
