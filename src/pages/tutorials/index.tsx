import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import {
  getSortedTutorialsData,
  TutorialFrontmatter,
} from "../../lib/tutorials";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

interface TutorialsIndexProps {
  allTutorialsData: (TutorialFrontmatter & { slug: string })[];
}

interface TutorialCardProps {
  tutorial: TutorialFrontmatter & { slug: string };
  basePath: string;
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

const TutorialCard = ({ tutorial, basePath }: TutorialCardProps) => {
  const theme = useTheme();
  const imageUrl = tutorial.coverImage.startsWith("http")
    ? tutorial.coverImage
    : `${basePath}${tutorial.coverImage}`;

  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      passHref
      style={{ textDecoration: "none", height: "100%" }}>
      <motion.div variants={itemVariants} style={{ height: "100%" }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            cursor: "pointer",
            "&:hover": {
              transform: { xs: "none", sm: "translateY(-8px)" },
              boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
            },
          }}>
          <CardMedia
            component="img"
            sx={{ 
              height: { xs: 200, sm: 180, md: 200 },
              objectFit: "cover" 
            }}
            image={imageUrl}
            alt={tutorial.title}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: { xs: 2, sm: 3 },
            }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}>
              <Chip
                label={tutorial.difficulty}
                color="secondary"
                size="small"
                variant="filled"
                sx={{
                  height: { xs: 20, sm: 24 },
                  fontSize: { xs: "0.65rem", sm: "0.75rem" }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {tutorial.duration}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", flexGrow: 1, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
              {tutorial.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
              {tutorial.excerpt}
            </Typography>
          </CardContent>
          <Box sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, mt: "auto" }}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              sx={{
                px: { xs: 1, sm: 2 },
                py: { xs: 0.8, sm: 1 },
                fontSize: { xs: "0.85rem", sm: "0.95rem" }
              }}
            >
              Start Learning
            </Button>
          </Box>
        </Card>
      </motion.div>
    </Link>
  );
};

const TutorialsIndexPage = ({ allTutorialsData }: TutorialsIndexProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTutorials = allTutorialsData.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchQuery) ||
      tutorial.excerpt.toLowerCase().includes(searchQuery) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  const featuredTutorial = filteredTutorials[0];
  const otherTutorials = filteredTutorials.slice(1);

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
          Tutorials
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
        >
          Step-by-Step Guides to Mastering Code
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
        <TextField
          variant="outlined"
          placeholder="Search tutorials by title or tag..."
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
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

      {featuredTutorial && (
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }} component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{ 
              mb: 2, 
              fontFamily: "Orbitron, sans-serif",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" }
            }}>
            Latest Tutorial
          </Typography>
          <Link
            href={`/tutorials/${featuredTutorial.slug}`}
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
                image={featuredTutorial.coverImage}
                alt={featuredTutorial.title}
              />
              <CardContent
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: { xs: "100%", md: "auto" },
                }}>
                <Chip
                  label={featuredTutorial.difficulty}
                  color="primary"
                  size="small"
                  sx={{ 
                    mb: 1, 
                    alignSelf: "flex-start",
                    height: { xs: 20, sm: 24 },
                    fontSize: { xs: "0.75rem", sm: "0.85rem" }
                  }}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                  {featuredTutorial.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  {featuredTutorial.excerpt}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    alignSelf: "flex-start"
                  }}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>
        </Box>
      )}

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {otherTutorials.map((tutorial) => (
          <Grid item xs={12} sm={6} md={4} key={tutorial.slug}>
            <TutorialCard tutorial={tutorial} basePath={router.basePath} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TutorialsIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allTutorialsData = getSortedTutorialsData();
  return { props: { allTutorialsData } };
};
