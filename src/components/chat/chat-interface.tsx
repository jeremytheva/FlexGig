'use client';

import { useState } from 'react';
import {
  translateAndFilterMessage,
} from '@/ai/flows/chat-bridge-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: number;
  sender: 'client' | 'freelancer' | 'pm';
  content: string;
  originalSender?: 'client' | 'freelancer';
};

type User = 'pm' | 'client' | 'freelancer';

const projectDetails = "Project 'Phoenix': A web app redesign for a coffee shop. Tech stack: Next.js, Tailwind CSS, Stripe. Deadline: 3 months.";

export function ChatInterface() {
  const [currentUser, setCurrentUser] = useState<User>('pm');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'pm', content: "Hi Client, the freelancer is ready to start. I'll be your point of contact.", originalSender: 'pm' },
    { id: 2, sender: 'pm', content: "Hi Freelancer, welcome to the project. The client is excited to get started.", originalSender: 'pm' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = { id: Date.now(), sender: currentUser, content: inputValue };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    if (currentUser !== 'pm') {
      setIsLoading(true);
      setTimeout(() => {
        const reply: Message = {
            id: Date.now() + 1,
            sender: 'pm',
            content: `Thanks for your message. I'll review and forward it to the ${currentUser === 'client' ? 'freelancer' : 'client'}.`
        };
        setMessages(prev => [...prev, reply]);
        setIsLoading(false);
        toast({ title: 'Message sent to Project Manager' });
      }, 1000);
      return;
    }
    
    const target: 'client' | 'freelancer' = inputValue.toLowerCase().startsWith('@client') ? 'client' : 'freelancer';
    const messageContent = inputValue.replace(/@client|@freelancer/i, '').trim();

    setIsLoading(true);
    try {
      const result = await translateAndFilterMessage({
        sender: 'pm', 
        receiver: target,
        message: messageContent,
        projectDetails,
      });

      const translatedMessage: Message = {
        id: Date.now() + 1,
        sender: 'pm',
        content: result.translatedMessage,
        originalSender: 'pm'
      };
      setMessages(prev => [...prev, translatedMessage]);
      toast({ title: `Message translated and sent to ${target}` });
    } catch (error) {
      console.error('Error translating message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const visibleMessages = messages.filter(msg => {
    if (currentUser === 'pm') return true;
    if (currentUser === 'client' && (msg.sender === 'pm' || msg.sender === 'client')) return true;
    if (currentUser === 'freelancer' && (msg.sender === 'pm' || msg.sender === 'freelancer')) return true;
    return false;
  });

  const getAvatar = (sender: User) => {
    const urls = {
        pm: 'https://picsum.photos/seed/pm/100/100',
        client: 'https://picsum.photos/seed/client/100/100',
        freelancer: 'https://picsum.photos/seed/freelancer/100/100'
    };
    return urls[sender];
  }

  return (
    <Card className="h-[70vh] flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Project Phoenix Chat</CardTitle>
                <CardDescription>Currently viewing as: <span className="font-bold text-primary">{currentUser.toUpperCase()}</span></CardDescription>
            </div>
            <Select onValueChange={(value: User) => setCurrentUser(value)} defaultValue={currentUser}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Switch View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pm">Project Manager</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {visibleMessages.map(msg => (
          <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === currentUser ? 'justify-end' : 'justify-start')}>
             {msg.sender !== currentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatar(msg.sender)} data-ai-hint="person avatar" />
                  <AvatarFallback>{msg.sender.toUpperCase().substring(0, 2)}</AvatarFallback>
                </Avatar>
             )}
            <div className={cn(
              "rounded-lg px-4 py-2 max-w-sm",
              msg.sender === currentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
            )}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={currentUser === 'pm' ? 'Type @client or @freelancer and your message...' : 'Type your message to the PM...'}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4"/>
          </Button>
        </div>
      </div>
    </Card>
  );
}
