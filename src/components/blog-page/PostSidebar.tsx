import React from "react";
import { useRouter } from "next/router";
import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HERO_DATA } from "@/utils/heroData";

interface Heading {
  text: string;
  level: number;
  slug: string;
  number: string;
}

interface PostSidebarProps {
  headings: Heading[];
  postUrl: string;
  title: string;
}

const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  return (
    <ul className="space-y-1">
      {headings.map((heading) => (
        <li key={heading.slug}>
          <a
            href={`#${heading.slug}`}
            className={`block text-sm hover:text-primary transition-colors py-1 text-muted-foreground hover:underline ${heading.level === 3 ? "pl-8" : "pl-4"
              }`}
          >
            {heading.number} {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

const PostSidebar = ({ headings, postUrl, title }: PostSidebarProps) => {
  const { basePath } = useRouter();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
  };

  return (
    <div className="sticky top-[100px]">
      <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <h6 className="text-lg font-semibold mb-4">About the Author</h6>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={`${basePath}${HERO_DATA.images.profile}`} alt="Azhagu-swe" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">Alagappan P</div>
            <div className="text-sm text-muted-foreground">Full Stack Developer</div>
          </div>
        </div>
        <div className="h-px bg-border my-4" />

        <h6 className="text-lg font-bold mb-2">On this page</h6>
        <TableOfContents headings={headings} />
        <div className="h-px bg-border my-4" />

        <h6 className="text-lg font-semibold mb-2">Share this post</h6>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <a
              href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCopyLink} className="h-8 w-8">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
