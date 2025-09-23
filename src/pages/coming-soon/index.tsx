import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComingSoon } from "@/components/common/StatusPage";

const ComingSoonPage: React.FC = () => {
  const theme = useTheme();

  return <ComingSoon />;
};

export default ComingSoonPage;
