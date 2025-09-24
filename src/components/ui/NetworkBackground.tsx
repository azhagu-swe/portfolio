import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface NetworkBackgroundProps {
  width?: number;
  height?: number;
  nodeCount?: number;
  connectionDistance?: number;
  nodeSize?: number;
  nodeColor?: string;
  connectionColor?: string;
  speed?: number;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
  nodeCount = 50,
  connectionDistance = 150,
  nodeSize = 3,
  nodeColor = '#68D391', // Primary color
  connectionColor = '#FFC107', // Secondary color
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize nodes
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: nodeSize
      });
    }
    nodesRef.current = nodes;

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const node1 = nodesRef.current[i];
          const node2 = nodesRef.current[j];
          
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `${connectionColor}50`; // 30% opacity
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, nodeCount, connectionDistance, nodeSize, nodeColor, connectionColor, speed]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
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

export default NetworkBackground;