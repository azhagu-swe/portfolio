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
              transform: "translateY(-8px)",
              boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
            },
          }}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={tutorial.title}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}>
              <Chip
                label={tutorial.difficulty}
                color="primary"
                size="small"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {tutorial.duration}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", flexGrow: 1 }}>
              {tutorial.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {tutorial.excerpt}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
            <Button fullWidth variant="contained" color="secondary">
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
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      <Box
        sx={{ textAlign: "center", mb: 6 }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
          }}>
          Tutorials
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Step-by-Step Guides to Mastering Code
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
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
          sx={{ width: "100%", maxWidth: "600px" }}
        />
      </Box>

      {featuredTutorial && (
        <Box sx={{ mb: 6 }} component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontFamily: "Orbitron, sans-serif" }}>
            Latest Tutorial
          </Typography>
          <Link
            href={`/tutorials/${featuredTutorial.slug}`}
            passHref
            style={{ textDecoration: "none" }}>
            <Card
              sx={{
                display: { xs: "flex", md: "flex" },
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 400 },
                  height: { xs: 250, md: "auto" },
                }}
                image={featuredTutorial.coverImage}
                alt={featuredTutorial.title}
              />
              <CardContent
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <Chip
                  label={featuredTutorial.difficulty}
                  color="primary"
                  size="small"
                  sx={{ mb: 1, alignSelf: "flex-start" }}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 1 }}>
                  {featuredTutorial.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}>
                  {featuredTutorial.excerpt}
                </Typography>
                <Button variant="contained">Start Learning</Button>
              </CardContent>
            </Card>
          </Link>
        </Box>
      )}

      <Grid container spacing={4}>
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
