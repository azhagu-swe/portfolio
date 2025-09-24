import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface TerminalProps {
  codeLines?: string[];
  cursorSymbol?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  codeLines = [
    '// Software Engineer Portfolio',
    'const portfolio = {',
    '  name: "Azhagu SWE",',
    '  role: "Software Engineer",',
    '  skills: ["Java", "Spring Boot", "React", "Microservices"],',
    '  experience: "3+ years building scalable systems",',
    '  location: "Chennai, India",',
    '};',
    '',
    'console.log("Welcome to my portfolio!");',
    'portfolio.startCareer();'
  ],
  cursorSymbol = '_',
  typingSpeed = 50,
  pauseDuration = 1000,
  showCursor = true
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (showCursor) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursorBlink(prev => !prev);
      }, 500);
    }

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [showCursor]);

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      setIsTyping(false);
      return;
    }

    if (currentChar < codeLines[currentLine].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLine) {
            newLines[currentLine] = '';
          }
          newLines[currentLine] = newLines[currentLine] + codeLines[currentLine][currentChar];
          return newLines;
        });
        setCurrentChar(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, pauseDuration);

      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, codeLines, typingSpeed, pauseDuration]);

  return (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#68D391',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        padding: 2,
        borderRadius: '8px',
        border: '1px solid #68D391',
        overflow: 'hidden',
        minHeight: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        position: 'relative',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.2)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#68D391',
          borderRadius: '3px',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
            mr: 1
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            mr: 1
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#27c93f',
          }}
        />
      </Box>
      
      {displayedText.map((line, index) => (
        <Typography
          key={`${index}-${line}`}
          component="div"
          sx={{
            whiteSpace: 'pre',
            paddingBottom: '2px'
          }}
        >
          {line}
        </Typography>
      ))}
      
      {isTyping && (
        <Typography
          component="div"
          sx={{
            display: 'inline',
            whiteSpace: 'pre'
          }}
        >
          {showCursor && showCursorBlink && (
            <span style={{ color: '#FFC107' }}>{cursorSymbol}</span>
          )}
        </Typography>
      )}
      
      {!isTyping && showCursor && (
        <Typography
          component="div"
          sx={{
            display: 'inline-block',
            whiteSpace: 'pre'
          }}
        >
          <span style={{ color: '#FFC107' }}>{cursorSymbol}</span>
        </Typography>
      )}
    </Box>
  );
};

export default Terminal;