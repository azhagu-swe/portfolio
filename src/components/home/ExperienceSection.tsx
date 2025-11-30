import React from "react";
import { motion } from "framer-motion";
import { Work } from "@mui/icons-material";
import { EXPERIENCE_DATA } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const experienceData = [
  ...EXPERIENCE_DATA.roles.map(role => ({
    year: role.duration,
    title: role.title,
    company: role.company,
    responsibilities: role.responsibilities,
    icon: <Work className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
  }))
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ExperienceSection: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          {EXPERIENCE_DATA.header.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-[700px] mx-auto text-base sm:text-lg md:text-xl"
        >
          {EXPERIENCE_DATA.header.subtitle}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative pl-4 sm:pl-8 md:pl-12 border-l-2 sm:border-l-4 border-l-primary/30"
      >
        {/* Gradient line overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[4px] bg-gradient-to-b from-primary to-secondary rounded-full -ml-[1px] sm:-ml-[2px]" />

        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={cn(
              "relative mb-8 last:mb-0",
              "pl-6 sm:pl-8 md:pl-10"
            )}
          >
            {/* Timeline Icon */}
            <div className="absolute left-[-20px] sm:left-[-24px] md:left-[-32px] top-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-lg z-10">
              {exp.icon}
            </div>

            <Card className="border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:translate-x-1 hover:border-primary">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <h6 className="text-primary font-bold text-sm sm:text-base md:text-lg mb-1">
                  {exp.year}
                </h6>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                  {exp.title}
                </h3>
                <h4 className="text-secondary font-semibold text-base sm:text-lg md:text-xl mb-4">
                  {exp.company}
                </h4>

                <div className="space-y-2">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <p
                        className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: responsibility }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceSection;