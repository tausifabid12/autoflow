import React, { useEffect, useState, useRef } from 'react';
import { Send, Search, Menu, X, Check, Clock, Loader2, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCampaignsApplication, getMessages, sendMessage, updateProposalMessage } from '../(helper)';

import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import CampaignDetailsSidebar from './CampaignDetailsSidebar';
import { ProposeAmountModal } from './ProposeAmountModal';
import { queryClient } from '@/components/providers';


const ChatInterfaceInner = () => {
  const [inputText, setInputText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const messagesEndRef = useRef(null);
  const { data: session } = useSession();
  const searchParams = useSearchParams();


  const orderId = searchParams.get('orderId');
  const state = searchParams.get('state');

  // Fetch campaigns/applications
  const { isPending, data: applicationsData } = useQuery({
    queryKey: ['campaigns', session?.user?.id],
    queryFn: () => getCampaignsApplication(session?.user?.id as string, 10, 1),
    enabled: !!session?.user?.id
  });

  // Fetch messages for selected application
  const { data: messagesData, isPending: messagesPending, refetch: refetchMessages } = useQuery({
    queryKey: ['messages', selectedApplication],
    queryFn: () => getMessages(selectedApplication as any),
    enabled: !!selectedApplication
  });

  // Send message mutation
  const { mutate: sendNewMessage, isPending: sendNewMessagePending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setInputText('');
      toast.success('Message sent!');
    },
    onError: () => {
      toast.error('Failed to send message');
    }
  });

  // Update proposal mutation
  const { mutate: updateNewProposalMessage } = useMutation({
    mutationFn: updateProposalMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Proposal updated!');
    }
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (inputText.trim() && !sendNewMessagePending) {
      const data = {
          //@ts-ignore
        campaignId: selectedCampaign?._id,
          //@ts-ignore
        brandId: selectedCampaign?.brandId,
        applicationId: selectedApplication,
        message: inputText,
        creatorId: session?.user?.id
      };
      sendNewMessage({ data });
    }
  };
  //@ts-ignore
  const handleUpdateProposalMessage = (chatId, is_amount_accepted) => {
    const data = {
      chatId: chatId,
      is_amount_accepted: is_amount_accepted,
      userType: session?.user?.role
    };
    updateNewProposalMessage({ data });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
      //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);

  // Handle payment success/failure
  useEffect(() => {
    if (orderId && state === 'COMPLETED') {
      refetchMessages();
      toast.success('Payment successful!');
    } else if (orderId && state === 'FAILED') {
      toast.error('Payment failed');
    }
  }, [orderId, state, refetchMessages]);

  const filteredContacts = applicationsData?.data?.filter(contact =>
    contact.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //@ts-ignore
    contact.campaignData.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-border shadow-2xl transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                Messages
              </h2>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-white/50 rounded-lg"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 transition-all duration-200"
                data-testid="search-contacts-input"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {isPending ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    key={contact._id}
                    onClick={() => {
                        //@ts-ignore
                      setSelectedCampaign(contact?.campaignData);
                      setSelectedContact(contact.creator_name);
                      setSidebarOpen(false);
                        //@ts-ignore
                      setSelectedApplication(contact?.application_id);
                    }}
                    className={`w-full p-3 flex items-start gap-3 rounded-xl transition-all duration-200 mb-2 hover:shadow-md ${
                      selectedContact === contact.creator_name
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-sm scale-[1.02]'
                        : 'hover:bg-accent dark:hover:bg-slate-800'
                    }`}
                    data-testid={`contact-${contact._id}`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg ring-2 ring-white dark:ring-slate-800">
                        {contact.creator_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate text-sm">{contact?.campaignData?.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">2m</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 truncate">{contact.brand_name}</p>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">{contact.creator_name}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-border px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <button 
                    onClick={() => setSidebarOpen(true)} 
                    className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
                    aria-label="Open sidebar"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0 ring-2 ring-blue-100 dark:ring-blue-900">
                    {selectedContact.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">{selectedContact}</h3>
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>
                <ProposeAmountModal 
                  influencerName={selectedContact} 
                    //@ts-ignore
                  selectedCampaign={selectedCampaign}
                    //@ts-ignore 
                  selectedApplication={selectedApplication} 
                />
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900 dark:to-slate-800">
              <div className="px-6 py-6 space-y-4 max-w-4xl mx-auto">
                {messagesPending ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : messagesData?.data?.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  messagesData?.data?.map((message, index) => {
                    const isSender = message?.sender_id === session?.user?.id;
                    const hasProposal = message?.amount_proposed;
                    const isPaymentMessage = message?.is_payment_message;

                    return (
                      <div
                        key={message.chat_id}
                        className={`flex gap-3 mb-4 animate-in slide-in-from-bottom-4 duration-300 ${isSender ? 'justify-end' : 'justify-start'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={`max-w-[70%] sm:max-w-md ${isSender ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div
                            className={`px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                              isSender
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm'
                                : 'bg-white dark:bg-slate-800 text-foreground rounded-bl-sm border border-border'
                            }`}
                          >
                            {message?.message && (
                              <p className="text-sm leading-relaxed pb-2 border-b border-current/10 mb-2 whitespace-pre-wrap break-words">
                                {message.message}
                              </p>
                            )}

                            {hasProposal && !isPaymentMessage && (
                              <div className="mb-3 pb-3 border-b border-current/10">
                                <p className="text-xs font-medium opacity-80 mb-2">Proposed Amount</p>
                                <p className="text-3xl font-bold mb-3">₹{message.amount_proposed?.toLocaleString()}</p>

                                {message.is_amount_accepted === true && (
                                  <Badge className="bg-green-600 hover:bg-green-700 border-0 shadow-md">
                                    <Check className="w-3 h-3 mr-1" />
                                    Accepted
                                  </Badge>
                                )}
                                {message.is_amount_accepted === false && (
                                  <Badge className="bg-red-600 hover:bg-red-700 border-0 shadow-md">
                                    <X className="w-3 h-3 mr-1" />
                                    Rejected
                                  </Badge>
                                )}
                                {message.is_amount_accepted === null && (
                                  <Badge className="bg-amber-500 hover:bg-amber-600 border-0 shadow-md animate-pulse">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}

                                {!isSender && message.is_amount_accepted === null && (
                                  <div className="flex gap-2 mt-3">
                                    <Button
                                      onClick={() => handleUpdateProposalMessage(message?.chat_id, true)}
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700 border-0 shadow-md hover:scale-105 transition-transform"
                                      data-testid="accept-proposal-button"
                                    >
                                      <Check className="w-3 h-3 mr-1" />
                                      Accept
                                    </Button>
                                    <Button
                                      onClick={() => handleUpdateProposalMessage(message?.chat_id, false)}
                                      size="sm"
                                      className="bg-red-600 hover:bg-red-700 border-0 shadow-md hover:scale-105 transition-transform"
                                      data-testid="reject-proposal-button"
                                    >
                                      <X className="w-3 h-3 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}

                            {isPaymentMessage && !message.is_payment_completed && (
                              <div className="mb-3 pb-3 border-b border-current/10">
                                <p className="text-xs font-medium opacity-80 mb-2">Payment Amount</p>
                                <p className="text-3xl font-bold mb-3">₹{message.amount_proposed?.toLocaleString()}</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105 transition-transform">
                                  Complete Payment
                                </Button>
                              </div>
                            )}

                            {isPaymentMessage && message.is_payment_completed && (
                              <div className="mb-3 pb-3">
                                <p className="text-xs font-medium opacity-80 mb-2">Payment Amount</p>
                                <p className="text-3xl font-bold mb-3">₹{message.amount_proposed?.toLocaleString()}</p>
                                <Button className="w-full bg-green-700/20 hover:bg-green-700/30 cursor-default shadow-md">
                                  <Check className="w-4 h-4 mr-2" />
                                  Payment Completed
                                </Button>
                              </div>
                            )}
                          </div>

                          {message?.created_at && (
                            <p className={`text-xs text-muted-foreground mt-1 px-1 ${isSender ? 'text-right' : 'text-left'}`}>
                              {new Date(message.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-white dark:bg-slate-900 border-t border-border px-6 py-4 shadow-lg">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <Input
                  type="text"
                  value={inputText}
                  required
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  disabled={sendNewMessagePending}
                  className="flex-1 px-5 py-6 bg-accent border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  data-testid="message-input"
                />
                <Button
                  type="submit"
                  disabled={sendNewMessagePending || !inputText.trim()}
                  className="px-6 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  data-testid="send-message-button"
                >
                  {sendNewMessagePending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="text-center max-w-md px-6">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Messages
              </h3>
              <p className="text-muted-foreground mb-6">
                Select a conversation from the sidebar to start chatting
              </p>
              <Button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Menu className="w-4 h-4 mr-2" />
                Open Conversations
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Details Sidebar */}
      {selectedCampaign && (
        <CampaignDetailsSidebar campaign={selectedCampaign} />
      )}
    </div>
  );
};



export default ChatInterfaceInner;
