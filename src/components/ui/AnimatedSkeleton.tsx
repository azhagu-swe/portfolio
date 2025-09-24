import React from 'react';
import {  Skeleton, SkeletonProps } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedSkeletonProps extends SkeletonProps {
  animationDelay?: number;
  staggerDelay?: number;
}

const AnimatedSkeleton: React.FC<AnimatedSkeletonProps> = ({ 
  animationDelay = 0, 
  staggerDelay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: animationDelay + staggerDelay }}
    >
      <Skeleton 
        animation="wave"
        {...props} 
      />
    </motion.div>
  );
};

export default AnimatedSkeleton;