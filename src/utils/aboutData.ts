export const PROFILE = (basePath: string) => ({
  name: "Alagappan P", 
  role: "Software Developer | Full Stack Engineer", 
  intro:
    "I build scalable, high-performance applications that solve real-world problems. With expertise in Java, Spring Boot, and modern web technologies, I transform complex requirements into elegant, efficient solutions. Experienced with AI tools like Qwen CLI and Google's Gemini CLI for enhanced development workflows. Let's create something amazing together!",
  avatar: `${basePath}/image/profile.jpg`,
});

export const SKILLS_DATA = [
  {
    title: "Languages",
    skills: "Java (Core 8+), SQL, JavaScript, HTML, CSS, TypeScript", 
  },
  {
    title: "Frameworks & Technologies",
    skills: "Spring Boot, Spring MVC, Spring Data JPA, Hibernate, RESTful APIs, Microservices, RabbitMQ, Redis, React.js, Next.js",
  },
  {
    title: "Databases",
    skills: "PostgreSQL, MySQL",
  },
  {
    title: "Tools & Platforms",
    skills: "Git, IntelliJ IDEA, VS Code, Maven, Docker (Basic), Windows, Ubuntu, Qwen CLI, Google Gemini CLI", 
  },
  {
    title: "AI & Development Tools",
    skills: "Qwen CLI for code generation and optimization, Google Gemini CLI for AI-assisted development, Prompt Engineering",
  },
];

export const CERTIFICATIONS_DATA = (basePath: string) => [
  {
    description: "Full Stack Java Development - Simplilearn, 2022", 
    img: `${basePath}/image/Java-Full-Stack-skillup.png`,
  },
  {
    description: "Java Certification Course - Simplilearn, 2022",
    img: `${basePath}/image/java-certificate.jpg`,
  },
  {
    description: "ChatGPT Advanced Course - Simplilearn, 2025",
    img: `${basePath}/image/chat_gpt_advanced_cert.jpg`,
  },
  {
    description: "Introduction to Prompt Engineering - Simplilearn, 2025", 
    img: `${basePath}/image/prompt_engineer_cert.jpg`, 
  },
];

export const ACHIEVEMENTS_DATA = (basePath: string) => [
  {
    description:
      "🏆 Secured Second Prize in a Debugging Competition at National College, Trichy.",
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