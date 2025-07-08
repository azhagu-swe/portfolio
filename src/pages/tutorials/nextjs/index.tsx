import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NextJsTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Next.js Development</Typography>
      <Typography variant="body1" paragraph>
        Next.js is a powerful React framework that enables features like server-side rendering (SSR) and static site generation (SSG). This helps improve performance and SEO for your web applications.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Key Concepts</Typography>
      <ul>
        <li><strong>Pages:</strong> React components in the `pages` directory become routes in your application.</li>
        <li><strong>Server-Side Rendering (SSR):</strong> The page is rendered on the server for each request, which is great for dynamic data.</li>
        <li><strong>Static Site Generation (SSG):</strong> The page is pre-rendered at build time, making it incredibly fast.</li>
        <li><strong>File-based Routing:</strong> `pages/about.js` automatically becomes the `/about` route.</li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Simple Code Example (A Page)</Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <pre><code>
{`// pages/posts/[id].js - A dynamic route page
import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Post ID: {id}</h1>;
};

export default PostPage;`}
        </code></pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This code creates a dynamic page. If you navigate to 'posts/123', Next.js will render this component and the page will display "Post ID: 123".`}
      </Typography>
    </Box>
  );
};

export default NextJsTutorialPage;