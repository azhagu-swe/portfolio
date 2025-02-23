// pages/tutorials.tsx
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

// Define the tutorial type
interface Tutorial {
  title: string;
  description: string;
  level: string; // Beginner, Intermediate, Advanced
  technologies: string[];
  thumbnail: string;
  link: string;
}

// Mock tutorials data
const tutorials: Tutorial[] = [
  {
    title: "Introduction to Java",
    description:
      "Learn the basics of Java programming in this step-by-step guide.",
    level: "Beginner",
    technologies: ["Java", "OOP"],
    thumbnail: "https://via.placeholder.com/400x200",
    link: "/tutorials/java-basics",
  },
  {
    title: "Understanding React State Management",
    description: "Master state management using React and modern hooks.",
    level: "Intermediate",
    technologies: ["React", "State Management"],
    thumbnail: "https://via.placeholder.com/400x200",
    link: "/tutorials/react-state",
  },
  {
    title: "Advanced Algorithms in JavaScript",
    description:
      "Dive into complex algorithms and data structures with JavaScript.",
    level: "Advanced",
    technologies: ["JavaScript", "Algorithms"],
    thumbnail: "https://via.placeholder.com/400x200",
    link: "/tutorials/advanced-algorithms",
  },
];

// Styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease",
  boxShadow: theme.shadows[4],
  ":hover": {
    transform: "scale(1.03)",
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

  // Filter tutorials based on level and search query
  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesLevel = filter === "All" || tutorial.level === filter;
    const matchesSearch =
      search === "" || tutorial.title.toLowerCase().includes(search);
    return matchesLevel && matchesSearch;
  });

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        Tutorials
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        Discover programming tutorials tailored to your skill level.
      </Typography>

      {/* Search and Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}>
        <TextField
          variant="outlined"
          placeholder="Search tutorials..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{ width: "50%" }}
          onChange={handleSearchChange}
        />
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          aria-label="Tutorial filter tabs">
          <Tab label="All" value="All" />
          <Tab label="Beginner" value="Beginner" />
          <Tab label="Intermediate" value="Intermediate" />
          <Tab label="Advanced" value="Advanced" />
        </Tabs>
      </Box>

      {/* Tutorials Grid */}
      <Grid container spacing={4}>
        {filteredTutorials.map((tutorial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                image={tutorial.thumbnail}
                alt={tutorial.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tutorial.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginY: 2, flexWrap: "wrap" }}>
                  {tutorial.technologies.map((tech, i) => (
                    <Chip
                      key={i}
                      label={tech}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  href={tutorial.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  Start Tutorial
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TutorialsPage;
