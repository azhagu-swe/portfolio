import React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const CallToAction: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleContact = () => {
    router.push("/contact");
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 2, sm: 3, lg: 4 },
        textAlign: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-30px", sm: "-40px", md: "-50px" },
          left: { xs: "-30px", sm: "-40px", md: "-50px" },
          width: { xs: "100px", sm: "150px", md: "200px" },
          height: { xs: "100px", sm: "150px", md: "200px" },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-50px", sm: "-60px", md: "-80px" },
          right: { xs: "-50px", sm: "-60px", md: "-80px" },
          width: { xs: "150px", sm: "200px", md: "300px" },
          height: { xs: "150px", sm: "200px", md: "300px" },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />
      
      <Box 
        sx={{ 
          maxWidth: "800px",
          mx: "auto",
          position: "relative",
          zIndex: 1
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" }
          }}
        >
          Ready to Bring Your Ideas to Life?
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 3, sm: 4, md: 5 },
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            opacity: 0.9
          }}
        >
          Let&#39;s collaborate to build something extraordinary that pushes boundaries and delivers results.
        </Typography>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleContact}
            sx={{
              px: { xs: 3, sm: 4, md: 6, lg: 8 },
              py: { xs: 1.2, sm: 1.5, md: 2 },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              fontWeight: 700,
              borderRadius: "50px",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.main,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
              "&:hover": {
                backgroundColor: theme.palette.background.paper,
                transform: "translateY(-3px)",
                boxShadow: `0 15px 40px rgba(0, 0, 0, 0.4)`
              },
              transition: "all 0.3s ease"
            }}
          >
            Start a Project Together
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default CallToAction;