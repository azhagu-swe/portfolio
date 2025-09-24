import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Twitter, LinkedIn, Link as LinkIcon } from "@mui/icons-material";
import { HERO_DATA } from "@/utils/heroData";
import { useRouter } from "next/router";

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
    <List dense>
      {headings.map((heading) => (
        <ListItem key={heading.slug} disablePadding>
          <ListItemButton
            component="a"
            href={`#${heading.slug}`}
            sx={{ pl: heading.level === 3 ? 4 : 2 }}>
            <ListItemText primary={`${heading.number} ${heading.text}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const PostSidebar = ({ headings, postUrl, title }: PostSidebarProps) => {
  const { basePath } = useRouter();

  return (
    <Box sx={{ position: "sticky", top: "80px" }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: "12px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}>
        <Typography variant="h6" gutterBottom>
          About the Author
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt="Azhagu-swe"
            src={`${basePath}${HERO_DATA.images.profile}`}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Alagappan P
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Full Stack Developer
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          On this page
        </Typography>
        <TableOfContents headings={headings} />
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Share this post
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            component="a"
            href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${title}`}
            target="_blank">
            <Twitter />
          </IconButton>
          <IconButton
            size="small"
            component="a"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${title}`}
            target="_blank">
            <LinkedIn />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => navigator.clipboard.writeText(postUrl)}>
            <LinkIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PostSidebar;
