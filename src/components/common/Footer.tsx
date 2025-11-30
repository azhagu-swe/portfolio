import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Users, Eye } from "lucide-react";
import { useVisitorCounts } from "@/context/VisitorContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CONTACT_DATA } from "@/utils/contactData";

const FooterVisitorStats = () => {
  const { uniqueVisitors, totalVisits, loading } = useVisitorCounts();

  if (loading || !uniqueVisitors) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col md:flex-row gap-4 mt-4 justify-center items-center"
    >
      {/* Unique Visitors Counter */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm text-card-foreground">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold">{uniqueVisitors?.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Total Visits Counter */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm text-card-foreground">
          <Eye className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold">{totalVisits?.toLocaleString()}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="relative mt-auto border-t bg-background/95 pt-12 pb-6 text-muted-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(var(--primary),0.05)_0%,transparent_20%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Info Section */}
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-2xl sm:text-3xl font-bold font-orbitron text-primary relative inline-block mb-4">
                Azhagu-swe
                <span className="absolute -bottom-2 left-0 w-1/2 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-sm" />
              </h3>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground text-center md:text-left">
                A Full Stack Developer passionate about creating modern,
                scalable web applications with attention to detail and user
                experience.
              </p>
            </motion.div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col">
            <motion.div initial="hidden" animate="visible">
              <h6 className="text-lg sm:text-xl font-bold text-primary mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-2/5 h-[2px] bg-primary rounded-sm" />
              </h6>
              <nav className="flex flex-col gap-2 items-center md:items-start">
                {[
                  { href: "/about", label: "About Me" },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact", label: "Contact" },
                  { href: "/blog", label: "Blog" },
                  { href: "/experience", label: "Experience" },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium hover:text-primary transition-colors relative group py-1"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col">
            <motion.div initial="hidden" animate="visible">
              <h6 className="text-lg sm:text-xl font-bold text-primary mb-4 relative inline-block">
                Connect With Me
                <span className="absolute -bottom-1 left-0 w-2/5 h-[2px] bg-primary rounded-sm" />
              </h6>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {CONTACT_DATA.socialLinks.map((social, index) => (
                  <motion.div
                    key={social.platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="rounded-full w-10 h-10 hover:bg-transparent hover:border-primary/50 transition-all"
                      style={{ color: social.color }}
                    >
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        title={social.platform}
                      >
                        <Icon icon={social.icon} width={22} height={22} />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="my-8 opacity-30" />

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Crafted with ❤️ by <strong>Azhagu-swe</strong>
            </p>
          </motion.div>

          <FooterVisitorStats />
        </div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-[20%] right-[5%] w-[100px] h-[100px] rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-[10%] left-[5%] w-[80px] h-[80px] rounded-full bg-secondary/20 blur-3xl animate-bounce"
        style={{ animationDuration: '8000ms' }}
      />
    </footer>
  );
};

export default Footer;
