import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link"; // 1. Import the Link component

// Define the tutorial type
interface Tutorial {
  title: string;
  description: string;
  level: string;
  technologies: string[];
  thumbnail: string;
  link: string;
}

// Updated tutorials list with branded placeholder images
const tutorials: Tutorial[] = [
  // Frontend
  {
    title: "HTML5 Fundamentals",
    description:
      "Learn the essential markup language for creating web pages and applications.",
    level: "Beginner",
    technologies: ["HTML"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=HTML5",
    link: "/tutorials/html5",
  },
  {
    title: "CSS3 Styling",
    description:
      "Master modern CSS techniques including Flexbox, Grid, and responsive design.",
    level: "Beginner",
    technologies: ["CSS", "Flexbox", "Grid"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=CSS3",
    link: "/tutorials/css3",
  },
  {
    title: "JavaScript Essentials",
    description:
      "Grasp the core concepts of JavaScript (ES6+), the language of the web.",
    level: "Beginner",
    technologies: ["JavaScript", "ES6"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=JavaScript",
    link: "/tutorials/javascript",
  },
  {
    title: "React.js Basics",
    description:
      "Build dynamic, component-based user interfaces with the React library.",
    level: "Intermediate",
    technologies: ["React", "JSX", "Hooks"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=React.js",
    link: "/tutorials/react",
  },
  {
    title: "Next.js Development",
    description:
      "Explore server-side rendering and static site generation with this powerful React framework.",
    level: "Advanced",
    technologies: ["Next.js", "React", "SSR"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=Next.js",
    link: "/tutorials/nextjs",
  },
  {
    title: "TypeScript for React Devs",
    description:
      "Add static typing to your JavaScript projects to improve code quality and catch errors early.",
    level: "Intermediate",
    technologies: ["TypeScript", "React"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=TypeScript",
    link: "/tutorials/typescript",
  },
  // Backend
  {
    title: "Core Java",
    description:
      "A deep dive into Java fundamentals, including OOP, data structures, and collections.",
    level: "Beginner",
    technologies: ["Java", "OOP"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=Java",
    link: "/tutorials/java",
  },
  {
    title: "Data Structures & Algorithms",
    description:
      "Strengthen your problem-solving skills with a deep dive into essential data structures and algorithms.",
    level: "Intermediate",
    technologies: ["DSA", "Problem Solving", "Java"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=DSA",
    link: "/tutorials/dsa",
  },
  {
    title: "Spring Boot Essentials",
    description:
      "Learn to build stand-alone, production-grade Spring applications quickly and easily.",
    level: "Intermediate",
    technologies: ["Spring Boot", "Java"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=Spring+Boot",
    link: "/tutorials/springboot",
  },
  {
    title: "Microservices Architecture",
    description:
      "Understand the principles of designing and building distributed microservice-based systems.",
    level: "Advanced",
    technologies: ["Microservices", "Spring Cloud"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=Microservices",
    link: "/tutorials/microservices",
  },
  // Databases
  {
    title: "SQL Fundamentals",
    description:
      "Master the art of querying relational databases. A critical skill for any developer.",
    level: "Beginner",
    technologies: ["SQL", "Databases"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=SQL",
    link: "/tutorials/sql",
  },
  {
    title: "MongoDB for Beginners",
    description:
      "Get started with MongoDB, a popular NoSQL database for modern applications.",
    level: "Intermediate",
    technologies: ["MongoDB", "NoSQL"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=MongoDB",
    link: "/tutorials/mongodb",
  },
  // DevOps & Tools
  {
    title: "Git & GitHub",
    description:
      "Learn essential version control workflows for collaborating on projects of any size.",
    level: "Beginner",
    technologies: ["Git", "GitHub"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFFFFF?text=Git",
    link: "/tutorials/git",
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize your applications with Docker for consistent deployment across all environments.",
    level: "Intermediate",
    technologies: ["Docker", "Containers"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=Docker",
    link: "/tutorials/docker",
  },
  // Emerging Skills
  {
    title: "Prompt Engineering Basics",
    description:
      "Learn how to effectively communicate with and instruct large language models (LLMs).",
    level: "Intermediate",
    technologies: ["AI", "LLM", "Prompting"],
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFFFFF?text=Prompt+Eng",
    link: "/tutorials/prompt-engineering",
  },
];

// Styled Card component with flex properties for consistent height
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  // Using the paper background from your theme
  backgroundColor: theme.palette.background.paper,
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 8px 16px ${theme.palette.primary.dark}33`,
  },
}));

const TutorialsPage: React.FC = () => {
  const [filter, setFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesLevel = filter === "All" || tutorial.level === filter;
    const matchesSearch =
      search === "" ||
      tutorial.title.toLowerCase().includes(search) ||
      tutorial.technologies.some((tech) => tech.toLowerCase().includes(search));
    return matchesLevel && matchesSearch;
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Tutorials
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore our curated list of tutorials to master Full Stack
          Development.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
          flexWrap: "wrap",
          gap: 2,
        }}>
        <TextField
          variant="outlined"
          placeholder="Search by title or technology..."
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
          sx={{ flexGrow: 1, minWidth: "250px" }}
          onChange={handleSearchChange}
        />
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          aria-label="Tutorial filter tabs"
          textColor="primary"
          indicatorColor="primary">
          <Tab label="All" value="All" />
          <Tab label="Beginner" value="Beginner" />
          <Tab label="Intermediate" value="Intermediate" />
          <Tab label="Advanced" value="Advanced" />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {filteredTutorials.map((tutorial) => (
          <Grid item xs={12} sm={6} md={4} key={tutorial.title}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={tutorial.thumbnail}
                alt={tutorial.title}
              />
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" gutterBottom>
                  {tutorial.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1, mb: 2 }}>
                  {tutorial.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexWrap: "wrap", gap: 0.5 }}>
                  {tutorial.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
                <Button
                  component={Link} // 2. Add this prop
                  href={tutorial.link}
                  fullWidth
                  variant="contained"
                  color="secondary">
                  <Typography color="secondary.contrastText">
                    Start Tutorial
                  </Typography>
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TutorialsPage;
