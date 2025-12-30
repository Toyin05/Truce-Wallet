import React from 'react';
import { cn } from '@/lib/utils';

interface MessageFormatterProps {
  content: string;
  className?: string;
}

export function MessageFormatter({ content, className }: MessageFormatterProps) {
  // Clean up the content by removing asterisks and improving formatting
  const cleanContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert *text* to <em>
    .replace(/\d+\.\s+/g, '') // Remove numbered list prefixes like "1. "
    .replace(/^\*\s+/gm, '• ') // Convert asterisk bullets to proper bullets
    .replace(/^-\s+/gm, '• ') // Convert dash bullets to proper bullets
    .trim();

  // Split content into paragraphs and process each one
  const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 0);
  
  return (
    <div className={cn('space-y-3', className)}>
      {paragraphs.map((paragraph, index) => {
        // Check if this paragraph contains a list
        const lines = paragraph.split('\n').filter(line => line.trim().length > 0);
        const isList = lines.some(line => line.trim().startsWith('•'));
        
        if (isList) {
          const listItems = lines.filter(line => line.trim().startsWith('•'));
          return (
            <ul key={index} className="space-y-2 ml-4">
              {listItems.map((item, itemIndex) => {
                const cleanItem = item.replace(/^•\s*/, '').trim();
                return (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1.5 flex-shrink-0">•</span>
                    <span 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: cleanItem }}
                    />
                  </li>
                );
              })}
            </ul>
          );
        }
        
        // Regular paragraph
        return (
          <p 
            key={index} 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        );
      })}
    </div>
  );
}