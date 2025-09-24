import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface CircuitBoardOverlayProps {
  width?: number;
  height?: number;
  circuitColor?: string;
  glowColor?: string;
  opacity?: number;
  speed?: number;
}

const CircuitBoardOverlay: React.FC<CircuitBoardOverlayProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
  circuitColor = '#68D391',
  glowColor = '#FFC107',
  opacity = 0.1,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Store static elements to avoid recalculating each frame
    const circuitPaths: {startX: number, startY: number, path: {x: number, y: number}[]}[] = [];
    const connectionPoints: {x: number, y: number}[] = [];

    // Draw static circuit board pattern
    const drawStaticCircuit = () => {
      // Draw circuit paths
      ctx.strokeStyle = circuitColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity;

      // Horizontal lines
      for (let y = 20; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 20; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Generate and store connection points
      for (let y = 20; y < height; y += 40) {
        for (let x = 20; x < width; x += 40) {
          // Randomly decide whether to draw an intersection
          if (Math.random() > 0.7) {
            connectionPoints.push({x, y});
          }
        }
      }

      // Generate and store circuit patterns
      for (let i = 0; i < 20; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        
        const path = [];
        let currentX = startX;
        let currentY = startY;
        
        // Draw a circuit-like path with 90-degree turns
        for (let j = 0; j < 5; j++) {
          const endX = currentX + (Math.random() - 0.5) * 100;
          const endY = currentY + (Math.random() - 0.5) * 100;
          
          path.push({x: endX, y: currentY}); // Horizontal
          path.push({x: endX, y: endY}); // Vertical
          
          currentX = endX;
          currentY = endY;
        }
        
        circuitPaths.push({startX, startY, path});
      }
    };

    // Draw circuit pattern (static elements)
    const drawCircuitPattern = (time: number) => {
      // Draw circuit paths
      ctx.strokeStyle = circuitColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity;

      for (const pathData of circuitPaths) {
        ctx.beginPath();
        ctx.moveTo(pathData.startX, pathData.startY);
        
        for (const point of pathData.path) {
          ctx.lineTo(point.x, point.y);
        }
        
        ctx.stroke();
      }

      // Draw connection points
      for (const point of connectionPoints) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = circuitColor;
        ctx.fill();
      }

      // Add flowing elements that move along paths
      ctx.globalAlpha = opacity * 1.5;
      ctx.fillStyle = glowColor;
      
      // Draw moving elements along the paths
      for (let i = 0; i < circuitPaths.length; i++) {
        const pathData = circuitPaths[i];
        if (pathData.path.length > 0) {
          // Calculate position along path based on time
          const progress = (time * 0.001 * speed + i * 0.2) % 1;
          const pathIndex = Math.floor(progress * (pathData.path.length - 1));
          const segmentProgress = (progress * (pathData.path.length - 1)) % 1;
          
          if (pathIndex < pathData.path.length - 1) {
            const startPoint = pathIndex === 0 
              ? {x: pathData.startX, y: pathData.startY} 
              : pathData.path[pathIndex - 1];
            const endPoint = pathData.path[pathIndex];
            
            const x = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
            const y = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;
            
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw pulsating glow effects
      for (let i = 0; i < 3; i++) {
        const glowX = Math.random() * width;
        const glowY = Math.random() * height;
        
        // Draw a pulsating glow effect
        const gradient = ctx.createRadialGradient(
          glowX, glowY, 0,
          glowX, glowY, 20 + Math.sin(time * 0.002 + i) * 10
        );
        gradient.addColorStop(0, `${glowColor}80`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = opacity * 0.5;
        ctx.fillStyle = gradient;
        ctx.fillRect(glowX - 30, glowY - 30, 60, 60);
      }
    };

    // Initialize static elements
    drawStaticCircuit();

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      // Clear with some trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      drawCircuitPattern(time);
      time += speed;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, circuitColor, glowColor, opacity, speed]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.3
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </Box>
  );
};

export default CircuitBoardOverlay;