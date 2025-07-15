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
import {
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
  Grid,
  Button,
} from "@mui/material";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { HERO_DATA } from "@/utils/heroData";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import PostHeader from "@/components/blog/PostHeader";
import PostSidebar from "@/components/blog/PostSidebar";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AudioPlayer from "@/components/blog/AudioPlayer";
import CodeBlock from "@/components/mdx/CodeBlock";
import ChartJSBlock from "@/components/mdx/ChartJSBlock";

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
  const theme = useTheme();
  const postUrl = `https://azhagu-swe.github.io/portfolio/blog/${slug}`;

  const articleRef = useRef<HTMLElement>(null);
  const [articleText, setArticleText] = useState("");

  useEffect(() => {
    if (articleRef.current) {
      setArticleText(articleRef.current.innerText);
    }
  }, [mdxSource]);

  const handleAudioBoundary = (charIndex: number) => {};

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

      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 4 } }}>
        <PostHeader frontmatter={frontmatter} />

        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
              <AudioPlayer
                text={articleText}
                onBoundary={handleAudioBoundary}
              />
              <Divider sx={{ my: 3 }} />
              <Box
                ref={articleRef}
                component="article"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: "1.1rem",
                  "& h2, & h3": { scrollMarginTop: "80px" },
                  "& h2": {
                    ...theme.typography.h4,
                    fontWeight: "bold",
                    mt: 5,
                    mb: 2,
                    color: theme.palette.primary.main,
                    borderLeft: `4px solid ${theme.palette.primary.light}`,
                    paddingLeft: 2,
                  },
                  "& h3": {
                    ...theme.typography.h5,
                    fontWeight: "bold",
                    mt: 4,
                    mb: 1,
                    color: theme.palette.primary.light,
                  },
                  "& p": { ...theme.typography.body1, lineHeight: 1.8, mb: 2 },
                  "& a": {
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": { textDecoration: "underline" },
                  },
                  "& ul, & ol": { pl: 3, mb: 2 },
                  "& li": { mb: 1, lineHeight: 1.8 },
                  "& code": {
                    fontFamily: "monospace",
                    backgroundColor: "rgba(135, 131, 120, 0.15)",
                    px: "4px",
                    py: "2px",
                    borderRadius: "4px",
                    color: theme.palette.text.primary,
                  },
                  "& pre > code": {
                    backgroundColor: "transparent",
                    p: 0,
                    color: "inherit",
                  },
                }}>
                <MDXRemote {...mdxSource} components={components} />
              </Box>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: { xs: "none", md: "block" } }}>
            <PostSidebar
              headings={headings}
              postUrl={postUrl}
              title={frontmatter.title}
            />
          </Grid>
        </Grid>

        <RelatedPosts posts={relatedPosts} />

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            component={Link}
            href="/blog"
            variant="outlined"
            startIcon={<ArrowBack />}>
            Back to All Posts
          </Button>
        </Box>
      </Box>
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
