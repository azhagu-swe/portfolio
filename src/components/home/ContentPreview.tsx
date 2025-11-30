import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { Clock, BookOpen, GraduationCap } from "lucide-react";
import { PostFrontmatter } from "@/lib/blog";
import { TutorialFrontmatter } from "@/lib/tutorials";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContentPreviewProps {
  posts: (PostFrontmatter & { slug: string })[];
  tutorials: (TutorialFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const ContentPreview: React.FC<ContentPreviewProps> = ({ posts, tutorials }) => {
  const router = useRouter();
  const { basePath } = router;

  const handleViewAllBlogPosts = () => {
    router.push("/blog");
  };

  const handleViewAllTutorials = () => {
    router.push("/tutorials");
  };

  return (
    <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      {/* Blog Posts Section */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Latest Articles & Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-[700px] mx-auto text-base sm:text-lg md:text-xl"
        >
          Sharing knowledge through technical articles, tutorials, and industry insights
        </motion.p>
      </div>

      {/* Blog Posts Preview */}
      <div className="mb-16 sm:mb-20 md:mb-24">
        <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-12">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
            Blog Posts
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllBlogPosts}
            className="rounded-full border-2 font-semibold hover:border-primary hover:text-primary transition-all duration-300"
          >
            View All Posts
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
                  "bg-white/5 dark:bg-white/5 backdrop-blur-md border-border",
                  "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary"
                )}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <div className="relative h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden">
                  <Image
                    src={
                      post.coverImage.startsWith("http")
                        ? post.coverImage
                        : `${basePath}${post.coverImage}`
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="flex-grow flex flex-col p-4 sm:p-6">
                  <div className="flex gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className="text-[0.65rem] sm:text-xs h-5 sm:h-6 flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {(Array.isArray(post.category)
                        ? post.category
                        : [post.category]
                      ).map((cat: string) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-[0.65rem] sm:text-xs h-5 sm:h-6 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors border-primary/50 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/categories/${cat
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`
                            );
                          }}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tutorials Preview */}
      <div>
        <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-12">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary flex items-center gap-2">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
            Tutorials
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllTutorials}
            className="rounded-full border-2 font-semibold hover:border-secondary hover:text-secondary transition-all duration-300"
          >
            View All Tutorials
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tutorials.map((tutorial) => (
            <motion.div
              key={tutorial.slug}
              variants={itemVariants}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
                  "bg-white/5 dark:bg-white/5 backdrop-blur-md border-border",
                  "hover:-translate-y-2 hover:shadow-xl hover:shadow-secondary/20 hover:border-secondary"
                )}
                onClick={() => router.push(`/tutorials/${tutorial.slug}`)}
              >
                <div className="relative h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden">
                  <Image
                    src={
                      tutorial.coverImage.startsWith("http")
                        ? tutorial.coverImage
                        : `${basePath}${tutorial.coverImage}`
                    }
                    alt={tutorial.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="flex-grow flex flex-col p-4 sm:p-6">
                  <div className="flex justify-between mb-2">
                    <Badge
                      variant={
                        tutorial.difficulty === "Beginner"
                          ? "default" // Map to default (primary) or create custom variants if needed. Using default/secondary/destructive for now.
                          : tutorial.difficulty === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                      className={cn(
                        "text-[0.65rem] sm:text-xs h-5 sm:h-6",
                        tutorial.difficulty === "Beginner" && "bg-green-500 hover:bg-green-600",
                        tutorial.difficulty === "Intermediate" && "bg-yellow-500 hover:bg-yellow-600",
                        tutorial.difficulty === "Advanced" && "bg-red-500 hover:bg-red-600"
                      )}
                    >
                      {tutorial.difficulty}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-[0.65rem] sm:text-xs h-5 sm:h-6 flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      {tutorial.duration}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2">
                    {tutorial.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 flex-grow line-clamp-3">
                    {tutorial.excerpt}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {tutorial.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[0.65rem] sm:text-xs h-5 sm:h-6 cursor-pointer hover:bg-secondary/80 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`
                            );
                          }}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContentPreview;