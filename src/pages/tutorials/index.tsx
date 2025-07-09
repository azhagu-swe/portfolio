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
  CardActionArea,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

interface TutorialsIndexProps {
  allTutorialsData: (TutorialFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TutorialsIndexPage = ({ allTutorialsData }: TutorialsIndexProps) => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 } }}>
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

      <Grid container spacing={4}>
        {allTutorialsData.map((tutorial) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={tutorial.slug}
            component={motion.div}
            variants={itemVariants}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <CardActionArea
                component={Link}
                href={`/tutorials/${tutorial.slug}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={tutorial.coverImage}
                  alt={tutorial.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip
                    label={tutorial.difficulty}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}>
                    {tutorial.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tutorial.excerpt}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
                <Button
                  component={Link}
                  href={`/tutorials/${tutorial.slug}`}
                  fullWidth
                  variant="contained">
                  Start Learning
                </Button>
              </Box>
            </Card>
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
