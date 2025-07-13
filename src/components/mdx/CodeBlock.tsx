import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const CodeBlock = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  
  // Find the 'code' element among the children passed to the 'pre' tag
  const codeElement = React.Children.toArray(props.children).find(
    (child: any) => child.type === 'code'
  ) as React.ReactElement | undefined;

  // If there's no code element, render a standard <pre> tag
  if (!codeElement) {
    return <pre {...props} />;
  }

  // Extract the language from the className (e.g., "language-java")
  const language = codeElement.props.className?.replace('language-', '') || 'shell';
  const codeString = codeElement.props.children;

  const handleCopy = () => {
    if (codeString) {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  return (
    <Box sx={{ position: 'relative', my: 3, borderRadius: '8px', border: `1px solid ${theme.palette.divider}` }}>
      {/* Header for the code block */}
      <Box
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#0D1117' : '#F6F8FA',
          color: theme.palette.text.secondary,
          p: 1,
          px: 2,
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>
          {language}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy code"} placement="top">
          <IconButton onClick={handleCopy} size="small">
            {copied ? <CheckIcon fontSize="small" sx={{ color: theme.palette.primary.main }} /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* The actual code block */}
      <Box
        component="pre"
        {...props}
        sx={{
          m: 0,
          p: 2,
          overflowX: 'auto',
          backgroundColor: theme.palette.mode === 'dark' ? '#161B22' : '#FFFFFF',
          borderBottomLeftRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
        }}
      />
    </Box>
  );
};

export default CodeBlock;
