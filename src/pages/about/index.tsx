import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import CustomizeCard from "@/components/about-page/CustomizeCard";
import SkillCard from "@/components/about-page/SkillCard";
import {
  PROFILE,
  SKILLS_DATA,
  CERTIFICATIONS_DATA,
  ACHIEVEMENTS_DATA,
  PARTICIPATIONS_DATA,
} from "@/utils/aboutData";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AboutMe: React.FC = () => {
  const router = useRouter();
  const { basePath } = router;
  const profile = PROFILE(basePath);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(var(--primary),0.2)] max-w-[1200px] mx-auto bg-background w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8 sm:mb-12">
        <div className="md:col-span-8 text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2"
          >
            Hi, I&apos;m {profile.name}
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl italic text-muted-foreground mb-4"
          >
            {profile.role}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-justify md:text-left"
          >
            {profile.intro}
          </motion.p>
        </div>
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 flex justify-center"
        >
          <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] rounded-full border-4 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] overflow-hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover object-[center_20%]"
            />
          </div>
        </motion.div>
      </div>

      <Separator className="my-8 sm:my-12" />

      <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {SKILLS_DATA.map((skill, index) => (
            <SkillCard key={index} title={skill.title} skills={skill.skills} />
          ))}
        </div>
      </motion.div>

      <Separator className="my-8 sm:my-12" />

      <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {CERTIFICATIONS_DATA(basePath).map((cert, index) => (
            <div key={index} className="h-full">
              <CustomizeCard {...cert} />
            </div>
          ))}
        </div>
      </motion.div>

      <Separator className="my-8 sm:my-12" />

      <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {ACHIEVEMENTS_DATA(basePath).map((achievement, index) => (
            <div key={index} className="h-full">
              <CustomizeCard {...achievement} />
            </div>
          ))}
        </div>
      </motion.div>

      <Separator className="my-8 sm:my-12" />

      <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Participation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {PARTICIPATIONS_DATA(basePath).map((participation, index) => (
            <div key={index} className="h-full">
              <CustomizeCard {...participation} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* New Section: AI Development Tools */}
      <Separator className="my-8 sm:my-12" />

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          AI Development Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="h-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardContent className="flex-grow p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
                Qwen CLI
              </h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                Leveraging Alibaba Cloud&apos;s Qwen CLI for AI-powered code
                generation, optimization, and development assistance. Enhancing
                productivity through intelligent code suggestions and automated
                refactoring.
              </p>
              <ul className="pl-4 space-y-2">
                <li className="text-sm sm:text-base list-disc">
                  Code generation and refactoring assistance
                </li>
                <li className="text-sm sm:text-base list-disc">
                  Automated documentation generation
                </li>
                <li className="text-sm sm:text-base list-disc">
                  Intelligent debugging and error resolution
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardContent className="flex-grow p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-secondary">
                Google Gemini CLI
              </h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                Utilizing Google&apos;s Gemini CLI for advanced AI-assisted
                development workflows. Integrating cutting-edge AI capabilities
                into the development process for enhanced problem-solving and
                innovation.
              </p>
              <ul className="pl-4 space-y-2">
                <li className="text-sm sm:text-base list-disc">
                  Natural language to code conversion
                </li>
                <li className="text-sm sm:text-base list-disc">
                  Complex problem-solving with AI guidance
                </li>
                <li className="text-sm sm:text-base list-disc">
                  Multi-modal development assistance
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
