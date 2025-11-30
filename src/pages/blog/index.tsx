import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData, PostFrontmatter } from "../../lib/blog";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import BlogCard from "@/components/blog-page/BlogCard";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- TYPE DEFINITIONS ---
interface BlogIndexProps {
  allPostsData: (PostFrontmatter & { slug: string })[];
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BlogIndexPage = ({ allPostsData }: BlogIndexProps) => {
  const router = useRouter();
  const { basePath } = router;
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPosts = allPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  const handleChipClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto w-full"
    >
      <motion.div
        className="text-center mb-8 sm:mb-12 md:mb-16"
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-orbitron mb-2">
          My Blog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Innovating Code, Sharing Thoughts
        </p>
      </motion.div>

      <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
        <div className="relative w-full sm:w-4/5 md:w-3/5 max-w-[600px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles by title or tag..."
            onChange={handleSearchChange}
            className="pl-10 h-10 sm:h-12 text-base"
          />
        </div>
      </div>

      {featuredPost && (
        <motion.div className="mb-8 sm:mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Featured Article
          </h2>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <Card className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-border bg-card">
              <div className="relative w-full md:w-[45%] h-[250px] md:h-auto overflow-hidden">
                <Image
                  src={
                    featuredPost.coverImage.startsWith("http")
                      ? featuredPost.coverImage
                      : `${basePath}${featuredPost.coverImage}`
                  }
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col justify-center w-full md:w-[55%]">
                <div className="flex flex-wrap gap-2 mb-4 self-start">
                  {(Array.isArray(featuredPost.category) ? featuredPost.category : [featuredPost.category]).map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 transition-colors text-[0.65rem] sm:text-xs h-5 sm:h-6"
                      onClick={(e) => handleChipClick(e, `/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <Button
                  className="self-start"
                >
                  Start Reading
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {otherPosts.map((post) => (
          <div key={post.slug} className="h-full">
            <BlogCard post={post} basePath={router.basePath} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
};
