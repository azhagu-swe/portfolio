// aboutData.ts
export const PROFILE = (basePath: string) => ({
  name: "Alagappan P", //
  role: "Java FullStack Developer", //
  intro:
    "A Full Stack Developer with professional experience in building scalable and secure applications using Java and Spring Boot. Armed with a Master's degree in Computer Science, I enjoy tackling complex challenges and delivering innovative tech solutions. Let's build something remarkable together!",
  avatar: `${basePath}/image/profile.jpg`,
});

export const SKILLS_DATA = [
  {
    title: "Languages",
    skills: "Java (Core 8+), SQL, JavaScript, HTML, CSS", //
  },
  {
    title: "Frameworks & Technologies",
    skills: "Spring Boot, Spring MVC, Spring Data JPA, Hibernate, RESTful APIs, Microservices, RabbitMQ, Redis", //
  },
  {
    title: "Databases",
    skills: "PostgreSQL, MySQL", //
  },
  {
    title: "Tools & Platforms",
    skills: "Git, IntelliJ IDEA, VS Code, Maven, Docker (Basic), Windows, Ubuntu", //
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
    description: "Introduction to Prompt Engineering - Simplilearn, 2025", //
    img: `${basePath}/image/prompt_engineer_cert.jpg`, 
  },
];

export const ACHIEVEMENTS_DATA = (basePath: string) => [
  {
    description:
      "🏆 Secured Second Prize in a Debugging Competition at National College, Trichy.", //
    img: `${basePath}/image/Debuggin-2nd-Prize.jpg`,
  },
];

// NOTE: The 'Participations' data could not be updated as it was not present in the provided resume.
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