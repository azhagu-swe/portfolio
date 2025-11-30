import React, { useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";
import { HERO_DATA } from "@/utils/heroData";
import Image from "next/image";
import AnimatedComponent from "@/components/ui/AnimatedComponent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const { basePath } = router;

  // Memoize the image URL to prevent unnecessary re-renders
  const profileImageUrl = useMemo(() => {
    return `${basePath}${HERO_DATA.images.profile}`;
  }, [basePath]);

  const handleHireMe = () => {
    router.push("/contact");
  };

  const handleDownloadResume = () => {
    window.open(`${basePath}${HERO_DATA.images.resume}`, "_blank");
  };

  return (




    <div className="min-h-[90vh] flex items-center py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="col-span-1 md:col-span-7 order-2 md:order-1 flex flex-col justify-center text-center md:text-left">
            <AnimatedComponent animationType="fade-in" delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
                Hi, I&apos;m{" "}
                <span className="relative text-primary inline-block">
                  {HERO_DATA.name}
                  <span className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-primary to-secondary opacity-50 rounded-sm" />
                </span>
              </h1>
            </AnimatedComponent>

            <AnimatedComponent animationType="fade-in" delay={200}>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground min-h-[60px] sm:min-h-[80px] mb-6 flex items-center justify-center md:justify-start">
                <Typewriter
                  words={HERO_DATA.roles}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </div>
            </AnimatedComponent>

            <AnimatedComponent animationType="fade-in" delay={300}>
              <p className="text-muted-foreground mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[90%] mx-auto md:mx-0">
                {HERO_DATA.description}
              </p>
            </AnimatedComponent>

            {/* Skills/Tags */}
            <AnimatedComponent animationType="fade-in" delay={400}>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-8 mb-6 justify-center md:justify-start">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm py-1 px-3">
                  Java
                </Badge>
                <Badge variant="outline" className="border-primary text-primary text-sm py-1 px-3">
                  Spring Boot
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm py-1 px-3">
                  React
                </Badge>
                <Badge variant="outline" className="border-secondary text-secondary text-sm py-1 px-3">
                  Microservices
                </Badge>
              </div>
            </AnimatedComponent>

            {/* CTA Buttons */}
            <AnimatedComponent animationType="fade-in" delay={500}>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center sm:items-start">
                <Button
                  size="lg"
                  onClick={handleHireMe}
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:-translate-y-1 transition-transform duration-300"
                >
                  {HERO_DATA.buttons.hire}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadResume}
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold border-2 hover:-translate-y-1 transition-transform duration-300"
                >
                  {HERO_DATA.buttons.resume}
                </Button>
              </div>
            </AnimatedComponent>
          </div>

          {/* Profile Image */}
          <div className="col-span-1 md:col-span-5 order-1 md:order-2 flex justify-center items-center mb-8 md:mb-0">
            <AnimatedComponent animationType="slide-left" delay={200}>
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full border-4 border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] flex items-center justify-center overflow-hidden">
                {/* Rotating border effect */}
                <div className="absolute w-[150%] h-[150%] bg-[conic-gradient(transparent,var(--primary),transparent)] animate-[spin_4s_linear_infinite]" />

                {/* Inner container to hide the rotating background center */}
                <div className="absolute inset-1 rounded-full bg-background z-10" />

                {/* Image container */}
                <div className="relative w-[95%] h-[95%] rounded-full overflow-hidden z-20">
                  <Image
                    src={profileImageUrl}
                    alt={HERO_DATA.name}
                    fill
                    className="object-cover object-[center_10%]"
                    sizes="(max-width: 600px) 200px, (max-width: 768px) 250px, (max-width: 900px) 300px, (max-width: 1200px) 350px, 350px"
                    priority
                  />
                </div>
              </div>
            </AnimatedComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
