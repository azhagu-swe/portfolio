export const HERO_DATA = {
  name: "Alagappan",
  title: "Software Engineer | Full Stack Developer",
  roles: [
    "Java Specialist ☕",
    "Spring Boot Developer 🌱",
    "Web Architect 🌐",
    "System Optimizer 🚀",
  ],
  description:
    "Full-stack developer with 2.5+ years experience building high-performance applications. Masters-educated technical specialist combining Java expertise with modern web development skills to deliver secure, scalable solutions.",
  buttons: {
    hire: "Hire Me",
    resume: "Download Resume",
  },
  images: {
    profile: "/image/profile.jpg",
    background: "/path/to/background.jpg",
    resume: "/pdf/azhagu-resume.pdf",
  },
};

export const ANIMATION_CONFIG = {
  text: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
  image: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8 },
  },
  button: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
};
