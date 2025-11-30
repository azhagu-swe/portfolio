import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
  const router = useRouter();

  const handleContact = () => {
    router.push("/contact");
  };

  return (
    <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary to-secondary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-[30px] -left-[30px] sm:-top-[40px] sm:-left-[40px] md:-top-[50px] md:-left-[50px] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-white/10" />
      <div className="absolute -bottom-[50px] -right-[50px] sm:-bottom-[60px] sm:-right-[60px] md:-bottom-[80px] md:-right-[80px] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-white/10" />

      <motion.div
        className="max-w-[800px] mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
          Ready to Bring Your Ideas to Life?
        </h2>

        <h5 className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-[600px] mx-auto opacity-90">
          Let&#39;s collaborate to build something extraordinary that pushes boundaries and delivers results.
        </h5>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={handleContact}
            className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-background text-primary hover:bg-background"
          >
            Start a Project Together
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CallToAction;