import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { EXPERIENCE_DATA } from "@/utils/experienceData";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(4),
}));

const ExperiencePage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        {EXPERIENCE_DATA.header.title}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        {EXPERIENCE_DATA.header.subtitle}
      </Typography>

      {/* Roles */}
      {EXPERIENCE_DATA.roles.map((role, index) => (
        <StyledCard key={index}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {role.company} | {role.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {role.duration} | {role.location}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Key Contributions:</strong>
            </Typography>
            <ul>
              {role.responsibilities.map((responsibility, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: responsibility }}
                />
              ))}
            </ul>
            <Typography variant="body2" color="text.secondary">
              <strong>Tech Stack:</strong> {role.techStack.join(", ")}
            </Typography>
          </CardContent>
        </StyledCard>
      ))}

      {/* Key Achievements */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Key Achievements:
          </Typography>
          <ul>
            {EXPERIENCE_DATA.achievements.map((achievement, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: achievement }}
              />
            ))}
          </ul>
        </CardContent>
      </StyledCard>

      {/* Skills Gained */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Technical Skills:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {EXPERIENCE_DATA.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Stack>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default ExperiencePage;
