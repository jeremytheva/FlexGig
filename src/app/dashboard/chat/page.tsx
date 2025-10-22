import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Three-Way Chat Bridge</h1>
        <p className="text-muted-foreground">
          Communicate with clients and freelancers through a managed, AI-assisted channel.
        </p>
      </header>
      <ChatInterface />
    </div>
  );
}
