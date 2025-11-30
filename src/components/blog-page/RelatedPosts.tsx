import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostFrontmatter } from "../../lib/blog";
import { Card, CardContent } from "@/components/ui/card";

type PostWithSlug = PostFrontmatter & { slug: string };

interface RelatedPostsProps {
  posts: PostWithSlug[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">
        Related Posts
      </h2>
      <div className="h-px bg-border mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group h-full block">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border-border bg-card">
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                />
              </div>
              <CardContent className="flex-grow p-4 flex flex-col">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
