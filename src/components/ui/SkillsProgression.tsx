import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 0 to 100
  category: string;
  icon?: string;
}

interface SkillsProgressionProps {
  skills: Skill[];
  animateOnView?: boolean;
  showIcons?: boolean;
}

const SkillsProgression: React.FC<SkillsProgressionProps> = ({
  skills = [
    { name: 'Java', level: 90, category: 'Backend' },
    { name: 'Spring Boot', level: 85, category: 'Backend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 75, category: 'Frontend' },
    { name: 'Microservices', level: 85, category: 'Architecture' },
    { name: 'AWS', level: 70, category: 'DevOps' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'PostgreSQL', level: 80, category: 'Database' }
  ],
  animateOnView = true,
  showIcons = true
}) => {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

  useEffect(() => {
    if (!animateOnView) {
      setVisibleSkills(skills.map((_, i) => i));
      return;
    }

    // Animate skills sequentially
    const timers = skills.map((_, index) => {
      return setTimeout(() => {
        setVisibleSkills(prev => [...prev, index]);
      }, 200 * index);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [animateOnView, skills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 700,
          background: 'linear-gradient(90deg, #68D391, #FFC107)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Technical Skills
      </Typography>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => {
          const isVisible = visibleSkills.includes(index);
          
          return (
            <motion.div
              key={`${skill.name}-${index}`}
              variants={itemVariants}
              style={{ marginBottom: '20px' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    flex: 1, 
                    fontWeight: 600,
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showIcons && (
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1,
                        fontSize: '0.8rem',
                        color: 'white'
                      }}
                    >
                      {skill.name.charAt(0)}
                    </Box>
                  )}
                  {skill.name}
                </Typography>
                <Chip
                  label={`${skill.level}%`}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(104, 211, 145, 0.2)', 
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={isVisible ? skill.level : 0}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: index % 3 === 0 
                          ? '#68D391' 
                          : index % 3 === 1 
                            ? '#FFC107' 
                            : '#42A5F5',
                        borderRadius: 6,
                        transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                      }
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ 
                    minWidth: 60, 
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  {skill.category}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default SkillsProgression;