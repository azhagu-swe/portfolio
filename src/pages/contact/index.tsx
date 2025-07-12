import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { CONTACT_DATA } from "@/utils/contactData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ContactPage = () => {
  const theme = useTheme();
  // FIX: Removed the 'method' property from the state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailMessage = () => {
    const { name, email, message } = formData;
    const subject = `Message from ${name}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    const mailtoLink = `mailto:azhagu.swe@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEmailMessage();
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 } }}>
      <Container maxWidth="lg">
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
            {CONTACT_DATA.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {CONTACT_DATA.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="flex-start">
          <Grid
            item
            xs={12}
            md={5}
            component={motion.div}
            variants={itemVariants}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Connect with Me
            </Typography>
            <Grid container spacing={2}>
              {CONTACT_DATA.socialLinks.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div whileHover={{ y: -5 }} style={{ height: "100%" }}>
                    <Card
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        border: `1px solid ${theme.palette.divider}`,
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          borderColor: item.color,
                          boxShadow: `0 0 15px ${item.color}55`,
                        },
                      }}
                      onClick={() => window.open(item.link, "_blank")}>
                      <Icon
                        icon={item.icon}
                        style={{
                          fontSize: 36,
                          color: item.color,
                          marginBottom: "8px",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}>
                        {item.platform}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ wordBreak: "break-all" }}>
                        {item.username}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            component={motion.div}
            variants={itemVariants}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Send a Message
            </Typography>
            <Paper
              component="form"
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                p: { xs: 2, sm: 3 },
                borderRadius: "16px",
                border: `1px solid ${theme.palette.divider}`,
              }}
              onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={CONTACT_DATA.form.nameLabel}
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <TextField
                fullWidth
                label={CONTACT_DATA.form.emailLabel}
                type="email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <TextField
                fullWidth
                label={CONTACT_DATA.form.messageLabel}
                multiline
                rows={4}
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                  "&:hover": { transform: "translateY(-2px)" },
                }}>
                {CONTACT_DATA.form.submitText}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
