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
  Divider,
  Avatar,
  Link,
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

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === "",
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
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
    if (validateForm()) {
      handleEmailMessage();
      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        p: { xs: 2, sm: 4 },
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${
          theme.palette.mode === "dark"
            ? "rgba(26, 32, 44, 0.8)"
            : "rgba(247, 250, 252, 0.8)"
        }, ${
          theme.palette.mode === "dark"
            ? "rgba(45, 55, 72, 0.9)"
            : "rgba(255, 255, 255, 0.9)"
        })`,
        pb: 8,
      }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            pt: 4,
          }}
          component={motion.div}
          variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              fontFamily: "Orbitron, sans-serif",
              mb: 1,
            }}>
            {CONTACT_DATA.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {CONTACT_DATA.subtitle}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}>
            {CONTACT_DATA.description}
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="stretch">
          <Grid
            item
            xs={12}
            md={5}
            component={motion.div}
            variants={itemVariants}>
            <Card
              sx={{
                height: "100%",
                p: 3,
                borderRadius: "16px",
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(145deg, ${theme.palette.background.paper}, #1e293b)`
                    : `linear-gradient(145deg, ${theme.palette.background.paper}, #ffffff)`,
                boxShadow: theme.shadows[5],
                border: `1px solid ${theme.palette.divider}`,
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: theme.palette.primary.main,
                }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Feel free to reach out using any of the methods below. I&apos;ll
                get back to you as soon as possible.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                      width: 40,
                      height: 40,
                    }}>
                    <Icon icon="mdi:email-outline" width={24} height={24} />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Email
                    </Typography>
                    <Link
                      href="mailto:azhagu.swe@gmail.com"
                      color="text.primary">
                      azhagu.swe@gmail.com
                    </Link>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      mr: 2,
                      width: 40,
                      height: 40,
                    }}>
                    <Icon icon="mdi:phone" width={24} height={24} />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available upon request
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: theme.palette.text.primary,
                }}>
                Follow Me
              </Typography>
              <Grid container spacing={2}>
                {CONTACT_DATA.socialLinks.map((item, index) => (
                  <Grid item xs={6} sm={4} md={6} key={index}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      style={{ height: "100%" }}>
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
                          background:
                            theme.palette.mode === "dark"
                              ? `linear-gradient(145deg, ${theme.palette.background.paper}, #1e293b)`
                              : theme.palette.background.paper,
                          "&:hover": {
                            borderColor: item.color,
                            boxShadow: `0 0 15px ${item.color}55`,
                            transform: "translateY(-3px)",
                          },
                        }}
                        onClick={() => window.open(item.link, "_blank")}>
                        <Icon
                          icon={item.icon}
                          style={{
                            fontSize: 32,
                            color: item.color,
                            marginBottom: "8px",
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                          {item.platform}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ wordBreak: "break-all", mt: 0.5 }}>
                          {item.username}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            component={motion.div}
            variants={itemVariants}>
            <Card
              sx={{
                height: "100%",
                p: 3,
                borderRadius: "16px",
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(145deg, ${theme.palette.background.paper}, #1e293b)`
                    : `linear-gradient(145deg, ${theme.palette.background.paper}, #ffffff)`,
                boxShadow: theme.shadows[5],
                border: `1px solid ${theme.palette.divider}`,
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: theme.palette.primary.main,
                }}>
                Send a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Fill out the form below and I&#39;ll get back to you as soon as
                possible.
              </Typography>

              <Paper
                component="form"
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  p: { xs: 2, sm: 3 },
                  borderRadius: "12px",
                  background: "transparent",
                  height: "100%",
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
                  error={formErrors.name}
                  helperText={formErrors.name ? "Please enter your name" : ""}
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                    },
                  }}
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
                  error={formErrors.email}
                  helperText={
                    formErrors.email ? "Please enter a valid email address" : ""
                  }
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={CONTACT_DATA.form.messageLabel}
                  multiline
                  rows={5}
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  error={formErrors.message}
                  helperText={
                    formErrors.message ? "Please enter your message" : ""
                  }
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    alignSelf: "flex-start",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    mt: 1,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 15px ${theme.palette.primary.main}44`,
                    },
                  }}>
                  <Icon icon="mdi:send" style={{ marginRight: 8 }} />
                  {CONTACT_DATA.form.submitText}
                </Button>
              </Paper>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
