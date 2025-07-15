import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Box } from "@mui/material";

interface ChartJSBlockProps {
  children: string; 
}

const ChartJSBlock: React.FC<ChartJSBlockProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      let chartConfig;
      try {
        chartConfig = JSON.parse(children);
      } catch (error) {
        console.error("Invalid Chart.js config:", error);
        return;
      }

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current, {
        ...chartConfig,
        options: {
          ...chartConfig.options,
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [children]);

  return (
    <Box sx={{ my: 2, height: "300px", position: "relative" }}>
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default ChartJSBlock;
