import { Tooltip, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Tooltip with dynamic theme-based styles
const CustomizeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100], // Dark background for dark mode, light background for light mode
    color: theme.palette.secondary.main,
    // border: `1px solid ${theme.palette.primary.main}`, // Green outline
    boxShadow: theme.shadows[4], // Subtle shadow for better visibility
    fontSize: "0.875rem", // Slightly larger text
  },
  [`& .MuiTooltip-arrow`]: {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100], // Match arrow color to tooltip background
  },
}));

export default CustomizeTooltip;
