import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import ProjectCard from "@/components/project-page/ProjectCard";

interface ProjectPageProps {
  allProjectsData: (ProjectFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectPage = ({ allProjectsData }: ProjectPageProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = allProjectsData
    .filter((project) =>
      filter === "All" ? true : project.technologies.includes(filter)
    )
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const featuredProject = filteredProjects[0];
  const otherProjects = filteredProjects.slice(1);

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        maxWidth: "1200px", 
        mx: "auto",
        width: "100%"
      }}>
      <Box
        sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 1
          }}>
          My Projects
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem" }
          }}>
          A showcase of innovation, creativity, and technical expertise.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
        <TextField
          variant="outlined"
          placeholder="Search projects..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ 
            width: { xs: "100%", sm: "80%", md: "60%" },
            maxWidth: "600px",
            "& .MuiInputBase-root": {
              fontSize: { xs: "0.9rem", sm: "1rem" }
            }
          }}
        />
      </Box>

      {featuredProject && (
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }} component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" }
            }}>
            Featured Project
          </Typography>
          <Link
            href={`/projects/${featuredProject.slug}`}
            passHref
            style={{ textDecoration: "none" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-5px)" },
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 400 },
                  height: { xs: 250, md: "auto" },
                  objectFit: "cover",
                }}
                image={
                  featuredProject.thumbnail.startsWith("http")
                    ? featuredProject.thumbnail
                    : `${basePath}${featuredProject.thumbnail}`
                }
                alt={featuredProject.title}
              />
              <CardContent
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: { xs: "100%", md: "auto" },
                }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                  {featuredProject.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  {featuredProject.description}
                </Typography>
                <Button 
                  variant="contained"
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    alignSelf: "flex-start"
                  }}>
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          </Link>
        </Box>
      )}

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {otherProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.slug}>
            <ProjectCard project={project} basePath={basePath} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectPage;

export const getStaticProps: GetStaticProps = async () => {
  const allProjectsData = getSortedProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
};
