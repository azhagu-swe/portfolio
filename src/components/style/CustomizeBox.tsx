import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const CustomizeBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  border: `2px solid ${theme.palette.primary.main}`,
  transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "rotate(2deg) scale(1.07)",
    boxShadow: `0px 4px 15px ${theme.palette.primary.main}, 0px 0px 10px ${theme.palette.primary.main}`,
  },
}));