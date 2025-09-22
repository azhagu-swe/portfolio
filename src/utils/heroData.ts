

export const HERO_DATA = {
  name: "Alagappan P",
  title: "Software Developer | Full Stack Engineer",
  roles: [
    "Full Stack Developer 🚀",
    "Java & Spring Boot Specialist ☕",
    "Microservices Architect 🏗️",
    "Problem Solver 🧩",
    "Tech Innovator 💡",
  ],
  description:
    "I build scalable, high-performance applications that solve real-world problems. With expertise in Java, Spring Boot, and modern web technologies, I transform complex requirements into elegant, efficient solutions. Let's create something amazing together!",
  buttons: {
    hire: "Let's Connect",
    resume: "Get My Resume",
  },
  images: {
    profile: "/image/profile.jpg",
    // background: "/path/to/background.jpg",
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
