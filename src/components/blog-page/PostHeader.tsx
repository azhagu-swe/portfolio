import React from "react";
import { Badge } from "@/components/ui/badge";
import { PostFrontmatter } from "../../lib/blog";

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

const PostHeader = ({ frontmatter }: PostHeaderProps) => {
  return (
    <div className="relative h-[45vh] w-full rounded-2xl overflow-hidden text-white flex flex-col justify-end p-8 mb-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 filter brightness-[0.4]"
        style={{ backgroundImage: `url(${frontmatter.coverImage})` }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent z-0" />

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {(Array.isArray(frontmatter.category)
            ? frontmatter.category
            : [frontmatter.category]
          ).map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className="bg-[rgba(50,205,50,0.2)] text-[#76FF7A] border-[#76FF7A] hover:bg-[rgba(50,205,50,0.3)]"
            >
              {cat}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-2">
          {frontmatter.title}
        </h1>
        <p className="text-white/80 text-lg">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {frontmatter.readTime}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
