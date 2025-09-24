import React, { useEffect } from 'react';
import NetworkBackground from '@/components/ui/NetworkBackground';

interface AnimatedBackgroundProps {
  enabled?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  enabled = true
}) => {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <NetworkBackground 
      nodeCount={25}
      connectionDistance={120}
      nodeSize={1.5}
      nodeColor="#68D391"
      connectionColor="#FFC107"
      speed={0.2}
    />
  );
};

export default AnimatedBackground;