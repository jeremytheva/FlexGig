import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Project Chat</h1>
        <p className="text-muted-foreground">
         Communicate directly with your project manager.
        </p>
      </header>
      <ChatInterface startAs="freelancer"/>
    </div>
  );
}
