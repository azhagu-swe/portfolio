import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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
        Professional Experience
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        Showcasing 2.7 years of impactful contributions and technical expertise.
      </Typography>

      {/* Company Overview */}
      <StyledCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Company Name: ABC Tech Solutions
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            A leading provider of enterprise software solutions specializing in
            e-commerce platforms, cloud-based applications, and business
            automation.
          </Typography>
        </CardContent>
      </StyledCard>

      {/* Role Highlights */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Role: Full Stack Developer
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Played a pivotal role in designing, developing, and deploying
            scalable web applications, with a focus on optimizing performance
            and ensuring robust security.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Key Responsibilities:
          </Typography>
          <ul>
            <li>Developed and maintained RESTful APIs using Spring Boot.</li>
            <li>
              Designed dynamic, user-centric interfaces with React.js and
              Material-UI.
            </li>
            <li>
              Implemented microservices architecture to enhance modularity and
              scalability.
            </li>
            <li>
              Optimized database queries in MySQL, reducing response time by
              25%.
            </li>
            <li>
              Collaborated with cross-functional teams using Agile
              methodologies.
            </li>
          </ul>
        </CardContent>
      </StyledCard>

      {/* Key Achievements */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Key Achievements:
          </Typography>
          <ul>
            <li>
              Spearheaded the development of a high-traffic e-commerce platform
              handling 1M+ daily users, achieving 99.99% uptime.
            </li>
            <li>
              Led the migration of a monolithic application to microservices,
              resulting in a 40% improvement in deployment efficiency.
            </li>
            <li>
              Automated CI/CD pipelines using Jenkins, reducing release cycles
              by 30%.
            </li>
            <li>
              Enhanced application performance by optimizing React components
              and implementing lazy loading.
            </li>
          </ul>
        </CardContent>
      </StyledCard>

      {/* Projects */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Major Projects:
          </Typography>
          <ul>
            <li>
              <strong>E-Commerce Platform:</strong> Developed and deployed an
              e-commerce solution using React.js, Spring Boot, and MongoDB,
              supporting real-time order processing.
            </li>
            <li>
              <strong>Cloud Inventory System:</strong> Designed a cloud-based
              inventory tracking system, integrating AWS Lambda and S3 for
              seamless scalability.
            </li>
            <li>
              <strong>Proximity Hashing Algorithm:</strong> Implemented an
              efficient spatial data storage system in Java, enhancing data
              retrieval speed by 50%.
            </li>
          </ul>
        </CardContent>
      </StyledCard>

      {/* Skills Gained */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Skills Gained:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {[
              "React.js",
              "Spring Boot",
              "Microservices",
              "MySQL",
              "MongoDB",
              "AWS",
              "Jenkins",
              "RESTful APIs",
              "Agile Methodology",
            ].map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </CardContent>
      </StyledCard>

      {/* Conclusion */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reflections:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            My 2.7 years at ABC Tech Solutions have been a transformative
            journey, equipping me with industry-standard technical expertise and
            a commitment to innovation. This experience has laid a strong
            foundation for tackling complex challenges and driving impactful
            solutions in my future endeavors.
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default ExperiencePage;
