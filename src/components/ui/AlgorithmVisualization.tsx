import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [data, setData] = useState<number[]>([]);
  const [indices, setIndices] = useState<{ i: number; j: number }>({ i: -1, j: -1 });
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  const resetData = useCallback(() => {
    const newData = Array.from({ length: dataSize }, () => Math.floor(Math.random() * 80) + 10);
    setData(newData);
    setIndices({ i: -1, j: -1 });
    setSortedIndices([]);
    setStep(0);
    setIsAnimating(false);
  }, [dataSize]);

  // Initialize data
  useEffect(() => {
    resetData();
  }, [resetData]);

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
          <div className="flex justify-center items-end h-[200px] gap-1 mb-6">
            {data.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value * 2}px` }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "w-[30px] rounded-t-md relative mx-0.5",
                  sortedIndices.includes(index)
                    ? "bg-secondary"
                    : (indices.i === index || indices.j === index)
                      ? "bg-primary"
                      : "bg-primary/50"
                )}
              >
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        );
      case 'binaryTree':
        // Render a binary tree visualization
        return (
          <div className="flex justify-center items-center h-[250px] mb-6">
            <h6 className="text-muted-foreground text-lg font-medium">
              Binary Tree Visualization (coming soon)
            </h6>
          </div>
        );
      case 'graph':
        // Render a graph visualization
        return (
          <div className="flex justify-center items-center h-[250px] mb-6">
            <h6 className="text-muted-foreground text-lg font-medium">
              Graph Visualization (coming soon)
            </h6>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto p-4 text-center">
      <h5 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#68D391] to-[#FFC107] bg-clip-text text-transparent">
        Algorithm Visualization: {algorithmType}
      </h5>

      <p className="text-sm text-muted-foreground mb-4">
        Step: {step} | {isAnimating ? 'Animating...' : 'Ready'}
      </p>

      {renderVisualization()}

      <div className="flex gap-4 justify-center mt-4">
        <Button
          onClick={handleSort}
          disabled={isAnimating}
          className="bg-primary hover:bg-primary/90"
        >
          {algorithmType === 'bubbleSort' ? 'Start Bubble Sort' : 'Visualize Algorithm'}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isAnimating}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default AlgorithmVisualization;