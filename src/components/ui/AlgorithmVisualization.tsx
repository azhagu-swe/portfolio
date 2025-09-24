import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface AlgorithmVisualizationProps {
  algorithmType?: 'bubbleSort' | 'binaryTree' | 'graph';
  dataSize?: number;
  speed?: number;
}

const AlgorithmVisualization: React.FC<AlgorithmVisualizationProps> = ({
  algorithmType = 'bubbleSort',
  dataSize = 8,
  speed = 500
}) => {
  const theme = useTheme();
  const [data, setData] = useState<number[]>([]);
  const [indices, setIndices] = useState<{ i: number; j: number }>({ i: -1, j: -1 });
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  // Initialize data
  useEffect(() => {
    resetData();
  }, [dataSize]);

  const resetData = useCallback(() => {
    const newData = Array.from({ length: dataSize }, () => Math.floor(Math.random() * 80) + 10);
    setData(newData);
    setIndices({ i: -1, j: -1 });
    setSortedIndices([]);
    setStep(0);
    setIsAnimating(false);
  }, [dataSize]);

  // Bubble sort algorithm
  const bubbleSort = useCallback(async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSortedIndices([]);
    const array = [...data];
    let steps = 0;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        setIndices({ i: j, j: j + 1 });
        setStep(steps++);
        
        if (array[j] > array[j + 1]) {
          // Swap elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          setData([...array]);
        }
        
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      // Mark the largest element as sorted
      setSortedIndices(prev => [...prev, array.length - i - 1]);
    }
    
    setIndices({ i: -1, j: -1 });
    setIsAnimating(false);
  }, [data, speed, isAnimating]);

  const handleSort = () => {
    if (algorithmType === 'bubbleSort') {
      bubbleSort();
    }
  };

  const handleReset = () => {
    resetData();
  };

  // Render visualization based on algorithm type
  const renderVisualization = () => {
    switch (algorithmType) {
      case 'bubbleSort':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 200, gap: 1, mb: 3 }}>
            {data.map((value, index) => (
              <Box
                key={index}
                component={motion.div}
                initial={{ height: 0 }}
                animate={{ height: `${value * 2}px` }}
                transition={{ duration: 0.5 }}
                sx={{
                  width: 30,
                  backgroundColor: 
                    sortedIndices.includes(index) 
                      ? theme.palette.secondary.main 
                      : (indices.i === index || indices.j === index)
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  mx: 0.5
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'text.secondary'
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      case 'binaryTree':
        // Render a binary tree visualization
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, mb: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Binary Tree Visualization (coming soon)
            </Typography>
          </Box>
        );
      case 'graph':
        // Render a graph visualization
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, mb: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Graph Visualization (coming soon)
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2, textAlign: 'center' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2, 
          fontWeight: 700,
          background: 'linear-gradient(90deg, #68D391, #FFC107)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Algorithm Visualization: {algorithmType}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Step: {step} | {isAnimating ? 'Animating...' : 'Ready'}
      </Typography>
      
      {renderVisualization()}
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSort}
          disabled={isAnimating}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }}
        >
          {algorithmType === 'bubbleSort' ? 'Start Bubble Sort' : 'Visualize Algorithm'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          disabled={isAnimating}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AlgorithmVisualization;