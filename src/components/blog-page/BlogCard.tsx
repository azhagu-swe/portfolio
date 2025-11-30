import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { PostFrontmatter } from "@/lib/blog";
import { ANIMATION_VARIANTS } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: PostFrontmatter & { slug: string };
  basePath: string;
}

const BlogCard = React.memo(({ post, basePath }: BlogCardProps) => {
  const router = useRouter();
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${basePath}${post.coverImage}`;

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.stopPropagation();
    router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    router.push(`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <motion.div variants={ANIMATION_VARIANTS.ITEM} className="h-full">
      <Card
        onClick={handleCardClick}
        className={cn(
          "h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
          "bg-white/5 dark:bg-white/5 backdrop-blur-md border-white/10",
          "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
        )}
      >
        <div className="relative h-[200px] sm:h-[180px] md:h-[200px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardContent className="flex-grow flex flex-col p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {(Array.isArray(post.category)
              ? post.category
              : [post.category]
            ).map((cat: string) => (
              <Badge
                key={cat}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors text-[0.65rem] sm:text-xs h-5 sm:h-6"
                onClick={(e) => handleCategoryClick(e, cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <span className="text-xs text-muted-foreground mb-1 block">
            {post.readTime}
          </span>

          <h2 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 flex-grow">
            {post.title}
          </h2>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {post.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 text-[0.65rem] sm:text-xs h-5 sm:h-6"
                onClick={(e) => handleTagClick(e, tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto pt-2">
            <Button
              className="w-full text-sm"
              size="sm"
            >
              Read More
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Add display name for debugging
BlogCard.displayName = 'BlogCard';

export default BlogCard;
