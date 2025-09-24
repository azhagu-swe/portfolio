import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Box, Typography, TextField, Chip, IconButton, Button } from '@mui/material';
import { useRouter } from 'next/router';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import HomeIcon from '@mui/icons-material/Home';

interface TerminalProps {
  initialLines?: string[];
  cursorSymbol?: string;
  welcomeMessage?: string;
  showCursor?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  initialLines = [
    '// Welcome to Azhagu SWE\'s Portfolio Terminal',
    '// Type "help" to see available commands',
    ''
  ],
  cursorSymbol = '_',
  welcomeMessage = 'Type "help" to see available commands',
  showCursor = true
}) => {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([...initialLines]);
  const [input, setInput] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('user@portfolio:~$ ');
  const [showCursorBlink, setShowCursorBlink] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [autoSuggestions, setAutoSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingTimeoutIds, setTypingTimeoutIds] = useState<NodeJS.Timeout[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('/home/azhagu');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fileSystem, setFileSystem] = useState<Record<string, any>>({
    'home': {
      'azhagu': {
        'Documents': {
          'resume.pdf': 'My professional resume',
          'portfolio_project': {
            'src': {
              'components': {},
              'pages': {},
              'utils': {}
            },
            'package.json': 'Project dependencies',
            'README.md': 'Project description'
          }
        },
        'Projects': {
          'ecommerce-platform': 'Java Spring Boot + React application',
          'microservices-arch': 'Docker + Kubernetes project',
          'payment-gateway': 'Financial services integration'
        },
        'Downloads': {
          'tutorial.pdf': 'Helpful resource',
          'image.png': 'Sample image'
        }
      }
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Available commands for suggestions
  const availableCommands = React.useMemo(() => [
    'help', 'about', 'skills', 'experience', 'contact', 'projects', 'clear', 
    'education', 'certifications', 'resume', 'github', 'linkedin', 'ls', 'cd', 'pwd', 'cat', 'whoami', 'date', 'quit', 'exit'
  ], []);

  // Helper function to get current directory object
  const getCurrentDir = () => {
    const pathParts = currentPath.split('/').filter(part => part !== '');
    let current = fileSystem;
    
    for (const part of pathParts) {
      if (current[part] && typeof current[part] === 'object') {
        current = current[part];
      } else {
        return null;
      }
    }
    
    return current;
  };

  // Helper function to navigate to a new directory
  const changeDirectory = (dir: string) => {
    if (dir === '..') {
      const pathParts = currentPath.split('/').filter(part => part !== '');
      if (pathParts.length > 1) {
        pathParts.pop(); // Remove current directory
        return '/' + pathParts.join('/');
      } else {
        return currentPath; // Already at root
      }
    } else if (dir.startsWith('/')) {
      // Absolute path
      return dir;
    } else {
      // Relative path
      return currentPath + '/' + dir;
    }
  };

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

  // Handle auto-suggestions based on input
  useEffect(() => {
    if (input.trim()) {
      const suggestions = availableCommands.filter(cmd => 
        cmd.includes(input.toLowerCase()) && cmd !== input.toLowerCase()
      );
      setAutoSuggestions(suggestions.slice(0, 5)); // Show up to 5 suggestions
      setShowSuggestions(suggestions.length > 0);
    } else {
      setAutoSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, availableCommands]);

  const addTypedLines = (newLines: string[], callback?: () => void) => {
    setIsTyping(true);
    // Clear any existing typing timeouts to prevent conflicts
    typingTimeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    setTypingTimeoutIds([]);
    
    // Don't add an extra empty line if newLines already ends with one
    const linesToAdd = newLines[newLines.length - 1] === '' ? [...newLines] : [...newLines, ''];
    
    let currentIndex = 0;
    const timeoutIds: NodeJS.Timeout[] = [];
    
    const typeNextLine = () => {
      if (currentIndex < linesToAdd.length) {
        setLines(prev => [...prev, linesToAdd[currentIndex]]);
        currentIndex++;
        
        // Adjust typing speed based on line length
        const currentLine = linesToAdd[currentIndex - 1];
        const baseDelay = 30;
        const lengthFactor = Math.min(currentLine.length * 2, 100); // Max additional delay based on line length
        const delay = baseDelay + Math.random() * 50 + lengthFactor;
        
        const timeoutId = setTimeout(() => {
          // Remove this timeout from the list once executed
          setTypingTimeoutIds(prev => prev.filter(id => id !== timeoutId));
          typeNextLine();
        }, delay);
        
        // Add the new timeout to the list for potential cleanup
        timeoutIds.push(timeoutId);
        setTypingTimeoutIds(prev => [...prev, timeoutId]);
      } else {
        setIsTyping(false);
        setTypingTimeoutIds([]); // Clear all timeouts when done
        if (callback) callback();
      }
    };
    
    typeNextLine();
  };

  const executeCommand = (cmd: string) => {
    if (isTyping) {
      // Clear any existing typing timeouts to prevent conflicts
      typingTimeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
      setTypingTimeoutIds([]);
      setIsTyping(false);
    }
    
    const command = cmd.trim().toLowerCase();
    const commandWithPrompt = [...lines, currentPrompt + cmd]; // Add command to current lines

    // Add to command history
    if (cmd.trim() !== '') {
      setCommandHistory(prev => [...prev, cmd]);
    }

    let responseLines: string[] = [];

    // Process the command
    switch (command) {
      case 'help':
        responseLines = [
          'Available commands:',
          'help        - Show this help message',
          'about       - Display information about me',
          'skills      - Show my technical skills',
          'experience  - Show my professional experience',
          'education   - Show my educational background',
          'projects    - Show my featured projects',
          'certifications - Show my certifications',
          'contact     - Show my contact information',
          'github      - Show my GitHub profile',
          'linkedin    - Show my LinkedIn profile',
          'resume      - Download my resume',
          'clear       - Clear the terminal screen',
          'neofetch    - Display system information',
          'ls          - List directory contents',
          'cd          - Change directory',
          'pwd         - Print working directory',
          'cat         - Print file contents',
          'whoami      - Display current user',
          'date        - Show current date and time',
          'quit        - Exit terminal and go to home page',
          'exit        - Exit terminal and go to home page'
        ];
        break;
      case 'about':
        responseLines = [
          '┌─ About Me',
          '│ Name: Azhagu SWE',
          '│ Role: Software Engineer',
          '│ Location: Chennai, India',
          '│ Experience: 3+ years building scalable systems',
          '│ Specialization: Java, Spring Boot, React, Microservices',
          '└─'
        ];
        break;
      case 'skills':
        responseLines = [
          '┌─ Technical Skills',
          '│ Backend: Java, Spring Boot, Spring Security, Hibernate',
          '│ Frontend: React, Next.js, TypeScript, Material UI',
          '│ Databases: PostgreSQL, MySQL, Redis, MongoDB',
          '│ DevOps: Docker, AWS, CI/CD, Kubernetes',
          '│ Other: Microservices, REST APIs, Git, Testing',
          '└─'
        ];
        break;
      case 'experience':
        responseLines = [
          '┌─ Professional Experience',
          '│ Software Engineer - 3+ years of experience',
          '│ Expertise in full-stack development with focus on enterprise applications',
          '│ Proficient in designing and implementing microservices architectures',
          '│ Experience with Agile methodologies and team collaboration',
          '└─'
        ];
        break;
      case 'education':
        responseLines = [
          '┌─ Education',
          '│ Master of Science in Computer Science-2020',
          '│ Bachelor of Science in Computer Science-2018',
          '└─'
        ];
        break;
      case 'projects':
        responseLines = [
          '┌─ Featured Projects',
          '│ 1. E-commerce Platform (Java Spring Boot, React)',
          '│ 2. Microservices Architecture (Docker, Kubernetes)',
          '│ 3. Payment Gateway Integration (Java, REST APIs)',
          '│ 4. Real-time Notification Service (Spring Boot, Redis)',
          '│ 5. Task Management System (React, Node.js, PostgreSQL)',
          '└─'
        ];
        break;
      case 'certifications':
        responseLines = [
          '┌─ Certifications',
          '│ Full Stack Java Development - Simplilearn, 2022',
          '│ ChatGPT Advanced Course - Simplilearn, 2025',
          '│ Introduction to Prompt Engineering - Simplilearn, 2025',
          '└─'
        ];
        break;
      case 'contact':
        responseLines = [
          '┌─ Contact Information',
          '│ Email: azhagu.swe@gmail.com',
          '│ Phone: +91-XXXXXXXXXX',
          '│ LinkedIn: linkedin.com/in/azhagu-swe',
          '│ GitHub: github.com/azhagu-swe',
          '└─'
        ];
        break;
      case 'github':
        responseLines = [
          'GitHub Profile: github.com/azhagu-swe',
          'Check out my repositories and contributions!'
        ];
        break;
      case 'linkedin':
        responseLines = [
          'LinkedIn Profile: linkedin.com/in/azhagu-swe',
          'Connect with me professionally!'
        ];
        break;
      case 'resume':
        responseLines = [
          'Downloading resume...',
          'Resume download started!'
        ];
        // Simulate a download by opening the resume in a new tab
        setTimeout(() => {
          window.open('/pdf/azhagu-resume.pdf', '_blank');
        }, 1000);
        break;
      case 'neofetch':
        responseLines = [
          '                 azhagu@portfolio',
          '        MMMMM.           .MMMMM   OS: Azhagu SWE Portfolio v1.0',
          '        MMMMM.           .MMMMM   Kernel: 1.0.0',
          '        MMMMM.           .MMMMM   Shell: bash 5.0',
          '        MMMMM.           .MMMMM   Terminal: Portfolio Terminal',
          '        .MMMM.           .MMMM.   Uptime: 24/7',
          '         .MMMM.         .MMMM.    Packages: 100+',
          '           .MMMM.     .MMMM.      Shell: Portfolio.js',
          '             .MMMM. .MMMM.        CPU: Software Engineer Brain',
          '               .MMMMMMM.         Memory: 64GB',
          '                 .MMM.           Location: Chennai, India'
        ];
        break;
      case 'ls':
        {
          const currentDir = getCurrentDir();
          if (currentDir) {
            const items = Object.keys(currentDir).map(item => {
              // Add / to directories
              return typeof currentDir[item] === 'object' ? `${item}/` : item;
            });
            responseLines = items;
          } else {
            responseLines = [`ls: cannot access '${currentPath}': No such file or directory`];
          }
        }
        break;
      case 'pwd':
        responseLines = [currentPath];
        break;
      case 'whoami':
        responseLines = ['azhagu'];
        break;
      case 'date':
        const now = new Date();
        responseLines = [now.toString()];
        break;
      case 'cd':
        {
          const pathParts = cmd.split(' ');
          let newPath = currentPath;
          
          if (pathParts.length > 1) {
            const targetDir = pathParts[1];
            newPath = changeDirectory(targetDir);
            
            // Validate if directory exists
            const pathToCheck = targetDir.startsWith('/') ? targetDir : (currentPath + '/' + targetDir);
            const pathPartsCheck = pathToCheck.split('/').filter(part => part !== '');
            let current = fileSystem;
            
            for (const part of pathPartsCheck) {
              if (current && current[part] && typeof current[part] === 'object') {
                current = current[part];
              } else {
                responseLines = [`cd: no such file or directory: ${targetDir}`];
                newPath = currentPath; // Don't change path
                break;
              }
            }
          } else {
            newPath = '/home/azhagu'; // Default to home
          }
          
          if (responseLines.length === 0) { // If no error occurred
            setCurrentPath(newPath);
            setCurrentPrompt(`user@portfolio:${newPath}$ `);
          }
        }
        break;
      case 'cat':
        {
          const pathParts = cmd.split(' ');
          if (pathParts.length > 1) {
            const fileName = pathParts[1];
            const currentDir = getCurrentDir();
            
            if (currentDir && currentDir[fileName] && typeof currentDir[fileName] !== 'object') {
              responseLines = [`${currentDir[fileName]}`];
            } else {
              responseLines = [`cat: ${fileName}: No such file or directory`];
            }
          } else {
            responseLines = ['cat: missing file operand'];
          }
        }
        break;
      case 'quit':
      case 'exit':
        responseLines = ['Exiting terminal...', 'Redirecting to home page...'];
        addTypedLines(responseLines, () => {
          setTimeout(() => {
            router.push('/');
          }, 1000);
        });
        return; // Don't continue with normal flow
      case 'clear':
        setLines(['Type "help" to see available commands']);
        setInput('');
        setHistoryIndex(-1);
        return; // Don't add the empty prompt line
      case '':
        // Just pressed enter with empty command
        setLines(prev => [...prev, '']);
        setInput('');
        setHistoryIndex(-1);
        return;
      default:
        responseLines = [
          `Command not found: ${cmd}. Type 'help' for available commands.`
        ];
    }

    // Update lines with command and start typing responses
    setLines(commandWithPrompt);
    addTypedLines(responseLines, () => {
      setInput('');
      setHistoryIndex(-1); // Reset history index
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && !isTyping) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1 && !isTyping) {
        const newIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    } else if (e.key === 'Tab' && showSuggestions && autoSuggestions.length > 0) {
      e.preventDefault();
      setInput(autoSuggestions[0]);
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
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
        padding: isFullscreen ? 3 : 2,
        borderRadius: '8px',
        border: '1px solid #68D391',
        overflow: 'hidden',
        minHeight: isFullscreen ? '100vh' : '400px',
        maxHeight: isFullscreen ? '100vh' : '500px',
        overflowY: 'auto',
        position: 'relative',
        margin: isFullscreen ? 0 : 'auto',
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : 'auto',
        zIndex: isFullscreen ? 1300 : 'auto', // Ensure proper stacking context
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            sx={{ color: '#68D391', '&:hover': { backgroundColor: 'rgba(104, 211, 145, 0.1)' } }}
          >
            {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
          </IconButton>
        </Box>
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
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, position: 'relative' }}>
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
        
        {/* Auto-suggestions dropdown */}
        {showSuggestions && autoSuggestions.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid #68D391',
              borderRadius: '4px',
              p: 1,
              mb: 1,
              zIndex: 10,
            }}
          >
            {autoSuggestions.map((suggestion, idx) => (
              <Box
                key={idx}
                sx={{
                  py: 0.5,
                  px: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(104, 211, 145, 0.2)',
                  }
                }}
                onClick={() => {
                  setInput(suggestion);
                  setShowSuggestions(false);
                  if (inputRef.current) inputRef.current.focus();
                }}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Terminal;