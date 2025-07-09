import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComingSoon } from "@/components/StatusPage";

const ComingSoonPage = () => {
  const theme = useTheme();

  return <ComingSoon />;
};

export default ComingSoonPage;
