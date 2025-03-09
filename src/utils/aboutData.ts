// aboutData.ts
export const PROFILE =(basePath: string) =>( {
  name: "Alagappan",
  role: "Java Specialist | Full Stack Developer",
  intro:
    "Full Stack Developer with 2.5 years of professional experience. My expertise lies in crafting scalable, secure, and user-friendly applications. 🎯 Armed with a Master's degree in Computer Applications, I thrive on tackling complex challenges and delivering innovative tech solutions. 🚀 Let's build something remarkable together!",
  avatar:  `${basePath}/image/profile.jpg`,
});

export const SKILLS_DATA = [
  {
    title: "Backend Systems",
    skills: "Java, Spring Boot, Hibernate, Redis, RabbitMQ, REST APIs, Microservices",
  },
  {
    title: "Frontend Development",
    skills: "HTML, CSS, JavaScript, Next.js, React, TypeScript, Redux, Material-UI, Responsive Design",
},
  {
    title: "Databases",
    skills: "PostgreSQL, MySQL, Query Optimization, Database Schema Design",
  },
  {
    title: "Core Fundamentals",
    skills: "OOP, Data Structures, System Design, Algorithm Optimization, Debugging",
  },
  {
    title: "Tools & Platforms",
    skills: "Git, Ubuntu, Windows, IntelliJ IDEA, VS Code, pgAdmin, Postman",
  },
];

export const CERTIFICATIONS_DATA = (basePath: string) => [
  {
    description: "FullStack Java Development",
    img: `${basePath}/image/Java-Full-Stack-skillup.png`,
  },
  {
    description: "Java Certificate Course",
    img: `${basePath}/image/java-certificate.jpg`,
  },
  {
    description: "Advanced C++",
    img: `${basePath}/image/c++ certificate.jpg`,
  },
];

export const ACHIEVEMENTS_DATA = (basePath: string) => [
  {
    description:
      "🏆 2nd Prize in Debugging Competition - Exceptional debugging in a competitive contest.",
    img: `${basePath}/image/Debuggin-2nd-Prize.jpg`,
  },
];

export const PARTICIPATIONS_DATA = (basePath: string) => [
  {
    description:
      "🏅 National Level Workshop: Web Application Frameworks (Struts, Spring, Hibernate) - Anna University, Trichy.",
    img: `${basePath}/image/AnnaUniversity-2.jpg`,
  },
  {
    description:
      "🏅 National Level Seminar: Skill-Based Jobs & Employment Opportunities - Anna University, Trichy.",
    img: `${basePath}/image/AnnaUniversity-1.jpg`,
  },
  {
    description:
      "🏅 State Level Workshop: Recent Trends in ICT - H.H. The Rajah's College, Pudukkottai.",
    img: `${basePath}/image/HHRC.jpg`,
  },
];
