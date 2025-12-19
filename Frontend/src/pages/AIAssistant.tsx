import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User, Loader2, Sparkles, Plus, Camera, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your crypto assistant powered by AI. I can help you with portfolio analysis, market trends, trading strategies, and answer any questions about crypto. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: textToSend },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      console.error('AI Chat Error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to get AI response';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Analyze my portfolio',
    'What are the market trends?',
    'Best coins to buy today?',
    'Explain DeFi to me',
  ];

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-600 flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-semibold">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 bg-background/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-2 sm:px-3 py-2 ${
                  message.role === 'user' ? 'shadow-sm' : 'bg-card border border-border/30'
                }`}
                style={{
                  ...(message.role === 'user' && {
                    backgroundColor: '#14b8a6',
                    color: 'white',
                    border: '1px solid #14b8a6'
                  }),
                  ...(message.role !== 'user' && {
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                  })
                }}
              >
                <p className="text-xs sm:text-sm leading-relaxed font-medium">{message.content}</p>
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-600 flex items-center justify-center shadow-sm">
                <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="bg-card border border-border/30 rounded-2xl px-2 sm:px-3 py-2 max-w-[180px] sm:max-w-[200px]">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="px-3 sm:px-4 pb-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="text-xs border-teal-600/50 hover:border-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200 h-8 sm:h-auto"
                  onClick={() => sendMessage(prompt)}
                  disabled={loading}
                >
                  <span className="hidden xs:inline">{prompt}</span>
                  <span className="xs:hidden truncate">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* Left Icons - Hidden on small screens */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0 rounded-full border border-transparent hover:border-teal-600 hover:text-white transition-all duration-200"
                style={{
                  ...(loading && {
                    backgroundColor: 'transparent',
                    color: 'rgb(148 163 184)'
                  })
                }}
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0 rounded-full border border-transparent hover:border-teal-600 hover:text-white transition-all duration-200"
                style={{
                  ...(loading && {
                    backgroundColor: 'transparent',
                    color: 'rgb(148 163 184)'
                  })
                }}
                disabled={loading}
              >
                <Camera className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0 rounded-full border border-transparent hover:border-teal-600 hover:text-white transition-all duration-200"
                style={{
                  ...(loading && {
                    backgroundColor: 'transparent',
                    color: 'rgb(148 163 184)'
                  })
                }}
                disabled={loading}
              >
                <Image className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about crypto..."
                className="h-10 sm:h-12 bg-background border-border rounded-2xl text-sm sm:text-base"
                disabled={loading}
              />
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="h-10 sm:h-12 w-10 sm:w-12 p-0 rounded-full bg-teal-600 hover:bg-teal-700 transition-all duration-200"
              style={{
                backgroundColor: '#14b8a6'
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}




