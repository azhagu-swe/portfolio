import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface TerminalProps {
  initialLines?: string[];
  cursorSymbol?: string;
  welcomeMessage?: string;
  showCursor?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  initialLines = [
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
  welcomeMessage = 'Type "help" to see available commands',
  showCursor = true
}) => {
  const [lines, setLines] = useState<string[]>([...initialLines, '', welcomeMessage]);
  const [input, setInput] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('user@portfolio:~$ ');
  const [showCursorBlink, setShowCursorBlink] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom when lines change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Handle cursor blinking
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

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let newLines = [...lines];

    // Add the command that was entered
    newLines.push(currentPrompt + cmd);

    // Process the command
    switch (command) {
      case 'help':
        newLines.push('Available commands: help, about, skills, experience, contact, clear, projects');
        break;
      case 'about':
        newLines.push('Azhagu SWE - Software Engineer with 3+ years of experience');
        newLines.push('Specializing in Java, Spring Boot, React, and Microservices');
        newLines.push('Based in Chennai, India');
        break;
      case 'skills':
        newLines.push('Technical Skills:');
        newLines.push('- Backend: Java, Spring Boot, Spring Security, Hibernate');
        newLines.push('- Frontend: React, Next.js, TypeScript, Material UI');
        newLines.push('- Databases: PostgreSQL, MySQL, Redis, MongoDB');
        newLines.push('- DevOps: Docker, AWS, CI/CD, Kubernetes');
        newLines.push('- Other: Microservices, REST APIs, Git');
        break;
      case 'experience':
        newLines.push('Software Engineer - 3+ years of experience building scalable systems');
        newLines.push('Expertise in full-stack development with focus on enterprise applications');
        newLines.push('Proficient in designing and implementing microservices architectures');
        break;
      case 'contact':
        newLines.push('Email: azhagu.swe@gmail.com');
        newLines.push('LinkedIn: linkedin.com/in/azhagu-swe');
        newLines.push('GitHub: github.com/azhagu-swe');
        break;
      case 'projects':
        newLines.push('Featured Projects:');
        newLines.push('- E-commerce Platform (Java Spring Boot, React)');
        newLines.push('- Microservices Architecture (Docker, Kubernetes)');
        newLines.push('- Payment Gateway Integration (Java, REST APIs)');
        newLines.push('- Real-time Notification Service (Spring Boot, Redis)');
        break;
      case 'clear':
        setLines([welcomeMessage]);
        return; // Don't add the empty prompt line
      case '':
        // Just pressed enter with empty command
        break;
      default:
        newLines.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }

    // Add new prompt line
    newLines.push('');

    setLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#68D391',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        padding: 2,
        borderRadius: '8px',
        border: '1px solid #68D391',
        overflow: 'hidden',
        minHeight: '400px',
        maxHeight: '500px',
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
      
      {lines.map((line, index) => (
        <Typography
          key={index}
          component="div"
          sx={{
            whiteSpace: 'pre',
            paddingBottom: '2px',
            lineHeight: '1.4'
          }}
        >
          {line}
        </Typography>
      ))}
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography
          component="span"
          sx={{
            mr: 1,
            whiteSpace: 'nowrap'
          }}
        >
          {currentPrompt}
        </Typography>
        <TextField
          inputRef={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="standard"
          sx={{
            flex: 1,
            '& .MuiInputBase-input': {
              padding: 0,
              color: '#68D391',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              '&:focus': {
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              },
            },
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:after': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottom: 'none',
            },
          }}
          autoFocus
        />
        {showCursor && showCursorBlink && (
          <Typography
            component="span"
            sx={{
              color: '#FFC107',
              ml: 0.5
            }}
          >
            {cursorSymbol}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Terminal;