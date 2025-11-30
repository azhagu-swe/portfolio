import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <div className="w-full max-w-[800px] mx-auto p-4">
      <h4 className="text-3xl text-center mb-8 font-bold bg-gradient-to-r from-[#68D391] to-[#FFC107] bg-clip-text text-transparent">
        Technical Skills
      </h4>

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
              className="mb-5"
            >
              <div className="flex items-center mb-2">
                <div className="flex-1 font-semibold text-foreground flex items-center">
                  {showIcons && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2 text-xs text-primary-foreground">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  {skill.name}
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#68D391]/20 text-primary">
                  {skill.level}%
                </span>
              </div>

              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="h-3 rounded-full bg-black/10 dark:bg-white/20 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        index % 3 === 0 ? "bg-[#68D391]" : index % 3 === 1 ? "bg-[#FFC107]" : "bg-[#42A5F5]"
                      )}
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
                <span className="min-w-[60px] text-right text-sm text-muted-foreground font-medium">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SkillsProgression;