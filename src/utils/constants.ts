// Constants for the portfolio application

// API Endpoints
export const API_ENDPOINTS = {
  VISITORS: "https://portfolio-util-ntv3.vercel.app/api/visitors",
};

// Base URLs
export const BASE_URLS = {
  PORTFOLIO: "https://azhagu-swe.github.io/portfolio",
  PROFILE_IMAGE: "/image/profile.jpg",
  RESUME: "/pdf/azhagu-resume.pdf",
};

// Social Media Links
export const SOCIAL_LINKS = {
  LINKEDIN: "https://www.linkedin.com/in/azhagu-swe/",
  GITHUB: "https://github.com/azhagu-swe",
  TWITTER: "https://twitter.com/azhagu_swe",
  INSTAGRAM: "https://instagram.com/azhagu.swe",
  YOUTUBE: "https://www.youtube.com/channel/UCuA9qjEfLAk6hmiNPYvZEvQ",
};

// Animation Constants
export const ANIMATION_VARIANTS = {
  ITEM: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  CONTAINER: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
};

// Common styling values
export const COMMON_STYLES = {
  BORDER_RADIUS: {
    CARD: "16px",
    BUTTON: "8px",
    CIRCLE: "50%",
  },
  SHADOW: {
    SMALL: "0 4px 10px rgba(0, 0, 0, 0.15)",
    MEDIUM: "0 12px 20px rgba(0, 0, 0, 0.3)",
    LARGE: "0 15px 30px",
  },
  TRANSITION: {
    DURATION: 0.3,
    EASING: "ease",
  },
};