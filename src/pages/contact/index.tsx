import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', method: 'WhatsApp' });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWhatsAppMessage = () => {
    const { name, message, email } = formData;
    const phoneNumber = '+1234567890'; // Replace with your phone number
    const text = `Hello, my name is ${name}.\n\n${message}\n\nEmail: ${email}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmailMessage = () => {
    const { name, email, message } = formData;
    const subject = `Message from ${name}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.method === 'WhatsApp') {
      handleWhatsAppMessage();
    } else {
      handleEmailMessage();
    }
  };

  const socialLinks = [
    { platform: 'Email', icon: 'mdi:email-outline', link: 'mailto:your-email@example.com', username: 'your-email@example.com', color: '#D44638' },
    { platform: 'LinkedIn', icon: 'mdi:linkedin', link: 'https://www.linkedin.com/in/yourprofile/', username: 'yourprofile', color: '#0077B5' },
    { platform: 'GitHub', icon: 'mdi:github', link: 'https://github.com/yourusername', username: 'yourusername', color: '#000000' },
    { platform: 'X', icon: 'devicon:twitter', link: 'https://twitter.com/yourusername', username: 'yourusername', color: '#1DA1F2' },
    { platform: 'Instagram', icon: 'mdi:instagram', link: 'https://instagram.com/yourusername', username: 'yourusername', color: '#E4405F' },
    { platform: 'WhatsApp', icon: 'mdi:whatsapp', link: 'https://wa.me/+1234567890', username: '+1234567890', color: '#25D366' },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        component={motion.h1}
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#32CD32', textAlign: 'center', mb: 2 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Me
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {socialLinks.map((item, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent>
                  <Icon
                    icon={item.icon}
                    fontSize={40}
                    style={{ marginBottom: '8px', color: item.color }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {item.platform}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: item.color, cursor: 'pointer' }}
                    onClick={() => window.open(item.link, '_blank')}
                  >
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
        sx={{ fontWeight: 'bold', mt: 6, mb: 3, textAlign: 'center' }}
      >
        Connect with Me
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        Feel free to reach out using the form below. I’ll get back to you as soon as possible.
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: 4,
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
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
        />

        <FormControl fullWidth>
          <InputLabel>Contact Method</InputLabel>
          <Select
            name="method"
            value={formData.method}
            onChange={handleInputChange}
            label="Contact Method"
          >
            <MenuItem value="WhatsApp">WhatsApp</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="success"
          size="large"
          sx={{ alignSelf: 'flex-start', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)' } }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
