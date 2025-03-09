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
import { CONTACT_DATA } from "@/utils/contactData";

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
    const phoneNumber = "+917502005724"; // Replace with your phone number
    const text = `${name}.

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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        component={motion.h1}
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        {CONTACT_DATA.title}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {CONTACT_DATA.socialLinks.map((item, index) => (
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
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                      cursor: "pointer",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
        {CONTACT_DATA.subtitle}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        {CONTACT_DATA.description}
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
          label={CONTACT_DATA.form.nameLabel}
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
          label={CONTACT_DATA.form.emailLabel}
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
          label={CONTACT_DATA.form.messageLabel}
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
          <InputLabel>{CONTACT_DATA.form.methodLabel}</InputLabel>
          <Select
            name="method"
            value={formData.method}
            onChange={handleInputChange}
            label={CONTACT_DATA.form.methodLabel}>
            {CONTACT_DATA.form.methods.map((method) => (
              <MenuItem key={method.value} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
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
          {CONTACT_DATA.form.submitText}
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
