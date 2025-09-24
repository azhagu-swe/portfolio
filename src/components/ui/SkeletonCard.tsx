import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

interface SkeletonCardProps {
  variant?: 'project' | 'blog' | 'experience' | 'default';
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  variant = 'default', 
  count = 1 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {variant === 'project' ? (
        <Box 
          sx={{ 
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: 2
          }}
        >
          <Skeleton 
            variant="rectangular" 
            height={200} 
            animation="wave"
          />
          <Box sx={{ p: 2 }}>
            <Skeleton 
              variant="text" 
              height={30} 
              width="60%"
              sx={{ mb: 1 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={20} 
              width="100%"
              sx={{ mb: 1 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={20} 
              width="80%"
              sx={{ mb: 2 }}
              animation="wave"
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Skeleton 
                variant="rectangular" 
                width={60} 
                height={28} 
                sx={{ borderRadius: 16 }}
                animation="wave"
              />
              <Skeleton 
                variant="rectangular" 
                width={80} 
                height={28} 
                sx={{ borderRadius: 16 }}
                animation="wave"
              />
              <Skeleton 
                variant="rectangular" 
                width={70} 
                height={28} 
                sx={{ borderRadius: 16 }}
                animation="wave"
              />
            </Box>
          </Box>
        </Box>
      ) : variant === 'blog' ? (
        <Box 
          sx={{ 
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: 2
          }}
        >
          <Skeleton 
            variant="rectangular" 
            height={150} 
            animation="wave"
          />
          <Box sx={{ p: 2 }}>
            <Skeleton 
              variant="text" 
              height={25} 
              width="70%"
              sx={{ mb: 1 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={18} 
              width="100%"
              sx={{ mb: 1 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={18} 
              width="90%"
              sx={{ mb: 2 }}
              animation="wave"
            />
            <Skeleton 
              variant="text" 
              height={16} 
              width="40%"
              animation="wave"
            />
          </Box>
        </Box>
      ) : variant === 'experience' ? (
        <Box 
          sx={{ 
            borderRadius: '16px', 
            p: 2,
            boxShadow: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton 
              variant="circular" 
              width={50} 
              height={50} 
              sx={{ mr: 2 }}
              animation="wave"
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton 
                variant="text" 
                height={24} 
                width="60%"
                sx={{ mb: 0.5 }}
                animation="wave"
              />
              <Skeleton 
                variant="text" 
                height={18} 
                width="80%"
                animation="wave"
              />
            </Box>
          </Box>
          <Skeleton 
            variant="text" 
            height={20} 
            width="100%"
            sx={{ mb: 1 }}
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="95%"
            sx={{ mb: 1 }}
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="90%"
            animation="wave"
          />
        </Box>
      ) : (
        <Box 
          sx={{ 
            borderRadius: 2,
            p: 2,
            boxShadow: 1
          }}
        >
          <Skeleton 
            variant="text" 
            height={30} 
            width="50%"
            sx={{ mb: 1 }}
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="100%"
            sx={{ mb: 1 }}
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="80%"
            sx={{ mb: 2 }}
            animation="wave"
          />
          <Skeleton 
            variant="rectangular" 
            height={100} 
            width="100%"
            animation="wave"
          />
        </Box>
      )}
    </motion.div>
  ));

  return <>{skeletons}</>;
};

export default SkeletonCard;