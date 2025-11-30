import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CodeBlock = (props: React.HTMLAttributes<HTMLPreElement>) => {
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
      navigator.clipboard.writeText(codeString as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  return (
    <div className="relative my-6 rounded-lg border border-border">
      {/* Header for the code block */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border rounded-t-lg">
        <span className="text-xs font-mono uppercase text-muted-foreground">
          {language}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* The actual code block */}
      <pre
        {...props}
        className={cn(
          "m-0 p-4 overflow-x-auto bg-card rounded-b-lg font-mono text-sm",
          props.className
        )}
      />
    </div>
  );
};

export default CodeBlock;
