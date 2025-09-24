import React, { useRef, useEffect } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY;
      const yPos = -(scrollPosition * speed);
      
      containerRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 0.05s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;