import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Chat with your Project Manager</h1>
        <p className="text-muted-foreground">
          Your conversation history for Project Phoenix.
        </p>
      </header>
      <ChatInterface startAs="client" />
    </div>
  );
}
