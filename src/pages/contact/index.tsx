import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    method: "WhatsApp",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWhatsAppMessage = () => {
    const { name, message, email } = formData;
    const phoneNumber = "+1234567890"; // Replace with your phone number
    const text = `Hello, my name is ${name}.

${message}

Email: ${email}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.method === "WhatsApp") {
      handleWhatsAppMessage();
    } else {
      handleEmailMessage();
    }
  };

  const socialLinks = [
    {
      platform: "Email",
      icon: "mdi:email-outline",
      link: "mailto:azhagu.swe@gmail.com",
      username: "azhagu.swe@gmail.com",
      color: "#D44638",
    },
    {
      platform: "LinkedIn",
      icon: "mdi:linkedin",
      link: "https://www.linkedin.com/in/azhagu-swe/",
      username: "azhagu-swe",
      color: "#0077B5",
    },
    {
      platform: "GitHub",
      icon: "mdi:github",
      link: "https://github.com/azhagu-swe",
      username: "@azhagu-swe",
      color: "#000000",
    },
    // {
    //   platform: "X",
    //   icon: "pajamas:twitter",
    //   link: "https://twitter.com/yourusername",
    //   username: "yourusername",
    //   color: "black",
    // },
    {
      platform: "Instagram",
      icon: "mdi:instagram",
      link: "https://instagram.com/yourusername",
      username: "@azhagu.dev",
      color: "#E4405F",
    },
    {
      platform: "WhatsApp",
      icon: "mdi:whatsapp",
      link: "https://wa.me/+917502005724",
      username: "+917502005724",
      color: "#25D366",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        component={motion.h1}
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#32CD32",
          textAlign: "center",
          mb: 2,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        Contact Me
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {socialLinks.map((item, index) => (
          <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  height: "220px", // Set a consistent height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensures consistent spacing
                  "&:hover": {
                    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => window.open(item.link, "_blank")}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                      transition: "color 0.3s",
                      color: item.color,
                      "&:hover": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}>
                    <Icon icon={item.icon} fontSize={36} />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.platform}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: item.color,
                      cursor: "pointer",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Ensure long text doesn't overflow
                      // whiteSpace: "nowrap", // Add ellipsis for a single line
                    }}>
                    {item.username}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mt: 6, mb: 3, textAlign: "center" }}>
        Connect with Me
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        Feel free to reach out using the form below. I’ll get back to you as
        soon as possible.
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 4,
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
        onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#32CD32",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#32CD32",
              },
          }}
        />

        <TextField
          fullWidth
          label="Your Email"
          type="email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#32CD32",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#32CD32",
              },
          }}
        />

        <TextField
          fullWidth
          label="Your Message"
          multiline
          rows={4}
          variant="outlined"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#32CD32",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#32CD32",
              },
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Contact Method</InputLabel>
          <Select
            name="method"
            value={formData.method}
            onChange={handleInputChange}
            label="Contact Method">
            <MenuItem value="WhatsApp">WhatsApp</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="success"
          size="large"
          sx={{
            alignSelf: "flex-start",
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-2px)" },
          }}>
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
