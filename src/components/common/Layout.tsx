import * as React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";
import SideDrawer from "./SideDrawer";
import AppBarTop from "./AppBarTop";
import Footer from "./Footer";
import { ArrowUp, Home, Briefcase, FolderGit2, Mail, BookOpen } from "lucide-react";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isMobile } = useResponsive();
  const [open, setOpen] = React.useState(true);
  const [showScrollUp, setShowScrollUp] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setOpen(!isMobile);
  }, [isMobile]);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const navItems = [
    { label: "Home", value: "/", icon: Home },
    { label: "Experience", value: "/experience", icon: Briefcase },
    { label: "Projects", value: "/projects", icon: FolderGit2 },
    { label: "Contact", value: "/contact", icon: Mail },
    { label: "Blog", value: "/blog", icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppBarTop
        open={!isMobile && open}
        handleDrawerToggle={() => setOpen(!open)}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <SideDrawer
        open={open}
        handleDrawerToggle={() => setOpen(!open)}
        isMobile={isMobile}
      />

      <div className="flex flex-col flex-grow w-full">
        <main
          className={cn(
            "flex-grow p-4 sm:p-6 transition-all duration-300 ease-in-out",
            !isMobile && open ? "ml-[240px]" : "ml-0 sm:ml-[70px]", // Adjust based on sidebar state
            "mt-16" // Toolbar height
          )}
        >
          <div id="main-content" className="flex-grow bg-card rounded-lg p-4 mb-16 sm:mb-0 shadow-sm">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      {!isMobile && showScrollUp && (
        <button
          aria-label="scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
          <nav className="flex justify-around items-center h-14 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => router.push(item.value)}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full space-y-1",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;
