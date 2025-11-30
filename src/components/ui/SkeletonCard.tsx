import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
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
        <div className="rounded-2xl overflow-hidden shadow-md bg-card">
          <Skeleton className="h-[200px] w-full rounded-none" />
          <div className="p-4">
            <Skeleton className="h-8 w-3/5 mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-4/5 mb-4" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-18 rounded-full" />
            </div>
          </div>
        </div>
      ) : variant === 'blog' ? (
        <div className="rounded-2xl overflow-hidden shadow-md bg-card">
          <Skeleton className="h-[150px] w-full rounded-none" />
          <div className="p-4">
            <Skeleton className="h-6 w-[70%] mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-[90%] mb-4" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
      ) : variant === 'experience' ? (
        <div className="rounded-2xl p-4 shadow-md bg-card">
          <div className="flex items-center mb-4">
            <Skeleton className="h-[50px] w-[50px] rounded-full mr-4" />
            <div className="flex-1">
              <Skeleton className="h-6 w-3/5 mb-1" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          </div>
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-[95%] mb-2" />
          <Skeleton className="h-5 w-[90%]" />
        </div>
      ) : (
        <div className="rounded-lg p-4 shadow-sm bg-card">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-4/5 mb-4" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      )}
    </motion.div>
  ));

  return <>{skeletons}</>;
};

export default SkeletonCard;