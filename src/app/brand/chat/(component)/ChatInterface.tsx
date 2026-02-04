'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Briefcase } from 'lucide-react';

import { toast } from 'sonner';
import { HireDialog } from './HireDialog';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface Profile {
  id: string;
  full_name: string;
  user_type: 'brand' | 'influencer';
  created_at: string;
}

interface ChatInterfaceProps {
  currentUser: Profile;
  otherUser: Profile;
}

export function ChatInterface({ currentUser, otherUser }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load demo chat messages
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        id: crypto.randomUUID(),
        sender_id: otherUser.id,
        receiver_id: currentUser.id,
        content: `Hey there! I loved your recent campaign with Adidas.`,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        sender_id: currentUser.id,
        receiver_id: otherUser.id,
        content: `Thanks! It was such a fun project. 😊`,
        created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        sender_id: otherUser.id,
        receiver_id: currentUser.id,
        content: `Would love to collaborate with your brand next month!`,
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
    ];

    setMessages(demoMessages);
  }, [currentUser.id, otherUser.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    try {
      const newMsg: Message = {
        id: crypto.randomUUID(),
        sender_id: currentUser.id,
        receiver_id: otherUser.id,
        content: newMessage.trim(),
        created_at: new Date().toISOString(),
      };

      // Add instantly to UI
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
    } catch {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      <Card className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto overflow-hidden border-2 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                {getInitials(otherUser.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{otherUser.full_name}</h2>
              <p className="text-xs text-muted-foreground capitalize">
                {otherUser.user_type}
              </p>
            </div>
          </div>

          {/* Hire button (only brand → influencer) */}
          {currentUser.user_type === 'brand' && otherUser.user_type === 'influencer' && (
            <Button
              onClick={() => setIsHireDialogOpen(true)}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md transition-all duration-200 hover:scale-105"
            >
              <Briefcase className="h-4 w-4" />
              Hire
            </Button>
          )}
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => {
              const isSender = message.sender_id === currentUser.id;
              const isInfluencer = isSender
                ? currentUser.user_type === 'influencer'
                : otherUser.user_type === 'influencer';

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarFallback
                      className={`text-white font-medium text-xs ${
                        isInfluencer
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}
                    >
                      {getInitials(isSender ? currentUser.full_name : otherUser.full_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col ${
                      isSender ? 'items-end' : 'items-start'
                    } max-w-[70%]`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                        isSender
                          ? isInfluencer
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-slate-50 dark:bg-slate-900">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending}
              className="flex-1 border-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isSending}
              size="icon"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <HireDialog
        isOpen={isHireDialogOpen}
        onClose={() => setIsHireDialogOpen(false)}
        brandId={currentUser.id}
        influencerId={otherUser.id}
        influencerName={otherUser.full_name}
      />
    </>
  );
}
