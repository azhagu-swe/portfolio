import React from "react";
import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { SKILLS_DATA } from "@/utils/skillData";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const SkillsPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        {SKILLS_DATA.header.title}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        {SKILLS_DATA.header.subtitle}
      </Typography>

      {/* Skills Grid */}
      <Grid container spacing={4}>
        {SKILLS_DATA.skills.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={cardVariants}>
              <Card sx={{ textAlign: "center", padding: 2 }}>
                <CardContent>
                  <Icon icon={skill.icon} width={50} height={50} />
                  <Typography variant="h6" gutterBottom>
                    {skill.name}
                  </Typography>
                  <Chip
                    label={skill.level}
                    color="primary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsPage;
