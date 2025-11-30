import React, { useEffect, useRef, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  getAllPostSlugs,
  getPostData,
  getSortedPostsData,
  PostFrontmatter,
} from "../../lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HERO_DATA } from "@/utils/heroData";
import ReadingProgressBar from "@/components/blog-page/ReadingProgressBar";
import PostHeader from "@/components/blog-page/PostHeader";
import PostSidebar from "@/components/blog-page/PostSidebar";
import RelatedPosts from "@/components/blog-page/RelatedPosts";
import AudioPlayer from "@/components/blog-page/AudioPlayer";
import CodeBlock from "@/components/mdx/CodeBlock";
import ChartJSBlock from "@/components/mdx/ChartJSBlock";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Heading {
  text: string;
  level: number;
  slug: string;
  number: string;
}
type PostWithSlug = PostFrontmatter & { slug: string };

interface PostPageProps {
  frontmatter: PostFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  headings: Heading[];
  slug: string;
  relatedPosts: PostWithSlug[];
}

const generateSlug = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node
      .toLowerCase()
      .replace(/^\d+\.\s/, "")
      .replace(/\s/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  if (Array.isArray(node)) {
    const firstString = node.find((child) => typeof child === "string");
    if (firstString) return generateSlug(firstString);
  }
  return "";
};

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(props.children);
  return <h2 id={slug} {...props} />;
};

const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(props.children);
  return <h3 id={slug} {...props} />;
};

const PostPage = ({
  frontmatter,
  mdxSource,
  headings,
  slug,
  relatedPosts,
}: PostPageProps) => {
  const postUrl = `https://azhagu-swe.github.io/portfolio/blog/${slug}`;

  const articleRef = useRef<HTMLElement>(null);
  const [articleText, setArticleText] = useState("");

  useEffect(() => {
    if (articleRef.current) {
      setArticleText(articleRef.current.innerText);
    }
  }, [mdxSource]);

  const handleAudioBoundary = (charIndex: number) => { };

  const components = {
    h2: H2,
    h3: H3,
    pre: (props: any) => {
      const isChartJS = props.children?.props?.className === "language-chartjs";
      if (isChartJS) {
        return <ChartJSBlock>{props.children.props.children}</ChartJSBlock>;
      }
      return <CodeBlock {...props} />;
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: `https://azhagu-swe.github.io${frontmatter.coverImage}`,
    author: {
      "@type": "Person",
      name: "Alagappan P",
      url: "https://azhagu-swe.github.io/portfolio/",
    },
    publisher: {
      "@type": "Organization",
      name: "Alagappan P's Blog",
      logo: {
        "@type": "ImageObject",
        url: `https://azhagu-swe.github.io${HERO_DATA.images.profile}`,
      },
    },
    datePublished: frontmatter.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta
          property="og:image"
          content={`https://azhagu-swe.github.io${frontmatter.coverImage}`}
        />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ReadingProgressBar />

      <div className="max-w-[1200px] mx-auto p-4 sm:p-8">
        <PostHeader frontmatter={frontmatter} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="col-span-1 md:col-span-8">
            <div className="bg-transparent">
              <AudioPlayer
                text={articleText}
                onBoundary={handleAudioBoundary}
              />
              <Separator className="my-6" />
              <article
                ref={articleRef}
                className="markdown-content"
              >
                <MDXRemote {...mdxSource} components={components} />
              </article>
            </div>
          </div>

          <div className="hidden md:block md:col-span-4">
            <PostSidebar
              headings={headings}
              postUrl={postUrl}
              title={frontmatter.title}
            />
          </div>
        </div>

        <RelatedPosts posts={relatedPosts} />

        <div className="text-center mt-12">
          <Button
            variant="outline"
            asChild
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const postData = await getPostData(params.slug as string);
  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== params.slug &&
        (p.category as unknown as string[]).some((cat) =>
          (postData.frontmatter.category as unknown as string[]).includes(cat)
        )
    )
    .slice(0, 3);

  return {
    props: {
      ...postData,
      relatedPosts,
    },
  };
};
