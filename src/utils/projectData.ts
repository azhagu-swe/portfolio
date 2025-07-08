export const PROJECTS_DATA = {
  header: {
    title: "My Projects",
    subtitle: "A showcase of innovation, creativity, and technical expertise.",
  },
  projects: [
    {
      title: "FarmConnect: E-Commerce Platform",
      description:
        "A comprehensive, role-based e-commerce app connecting farmers and consumers. Features distinct dashboards, Spring Security for RBAC, and a full shopping cart and checkout process.",
      technologies: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "React", "TypeScript", "Docker"],
      thumbnail: "image/FarmConnect-home.png",
      liveDemo: "https://farm-ui-pi.vercel.app/",
      github: "https://github.com/azhagu-swe/farmconnect",
    },
    {
      title: "Proximity Hash Algorithm",
      description:
        "Developed a Java-based geohash algorithm for spatial targeting, improving accuracy by 15%. Integrated with PostgreSQL for efficient data storage.",
      technologies: ["Java", "Geohash", "PostgreSQL"],
      thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=Proximity+Hash",
      github: "https://github.com/azhagu-swe/proximityhash-java",
    },
   
    {
      title: "Portfolio Website",
      description:
        "Developed a responsive portfolio website using Next.js and MUI. Features dynamic project showcases and a blog section.",
      technologies: ["Next.js", "React.js", "MUI", "TypeScript"],
      thumbnail: "image/portfolio.png",
      liveDemo: "https://azhagu-swe.github.io/portfolio",
      github: "https://github.com/azhagu-swe/portfolio",
    },
  ],
};