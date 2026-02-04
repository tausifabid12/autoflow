'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Send, DollarSign, Search, Menu, X, Check, Clock, Circle, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCampaignsApplication, getMessages, ICampaignApplicationResponse, IChatResponse, sendMessage, updateProposalMessage, updateUnseenMessageCount } from '../(helper)';
import { useSession } from 'next-auth/react';

import { ProposeAmountModal } from './ProposeAmountModal';
import { Badge } from '@/components/ui/badge';
import { queryClient } from '@/components/providers';
import PaymentButton from '@/components/shared/make-payment';
import { usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CampaignDetailsSidebar from '@/app/brand/chat/(component)/CampaignDetailsSidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import TaskCompleteAlert from './TaskCompleteAlert';
import CampaignDetailsSidebarMobile from '@/app/brand/chat/(component)/CampaignDetailsSidebarMobile';
import { useNotification } from '@/app/brand/(context)/NotificationContext';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const state = searchParams.get('state');
  const applicationId = searchParams.get('applicationId');
  const {refetchChat} = useNotification();

  const { isPending, isError, data, error, refetch } = useQuery<ICampaignApplicationResponse>({
    queryKey: ['campaigns', session?.user?.id, limit, page],
    queryFn: () => getCampaignsApplication(session?.user?.id as string, limit, page, 'selected'),
    enabled: session?.user?.id ? true : false
  });

  const { data: messages, isPending: messagesPending, refetch: refetchMessages } = useQuery<IChatResponse>({
    queryKey: ['messages', selectedApplication],
    queryFn: () => getMessages(selectedApplication),
    enabled: selectedApplication ? true : false
  });

  const {
    mutate: sendNewMessage,
    isPending: sendNewMessagePending,
  } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      scrollToBottom();
    },
  });

  const {
    mutate: updateNewProposalMessage,
    isPending: updateNewProposalMessagePending,
  } = useMutation({
    mutationFn: updateProposalMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const {
    mutate: updateUnseenNewMessageCount,
    isPending: updateUnseenNewMessageCountPending,
  } = useMutation({
    mutationFn: updateUnseenMessageCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', "campaigns"] });
    },
  });


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim()) {
      const data = {
        campaignId: selectedCampaign?._id,
        brandId: selectedCampaign?.brandId,
        applicationId: selectedApplication,
        message: inputText,
        creatorId: session?.user?.id
      };
      sendNewMessage({ data });
      setInputText('');
    }
  };

  const handleUpdateProposalMessage = (chatId: string, is_amount_accepted: boolean) => {
    const data = {
      chatId: chatId,
      is_amount_accepted: is_amount_accepted,
      userType: session?.user?.role as string
    };
    updateNewProposalMessage({ data });
  };

  useEffect(() => {
    if (orderId && state === 'COMPLETED') {
      refetchMessages();
      toast.success('Payment successful');
    } else if (orderId && state === 'FAILED') {
      toast.error('Payment failed');
    }
  }, [orderId, state]);

  const handleHireSubmit = () => {
    if (paymentAmount && deliveryDate) {
      setIsHireModalOpen(false);
      setShowToast(true);
      setPaymentAmount('');
      setDeliveryDate('');
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const filteredContacts = data?.data?.filter(contact =>
    contact.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // @ts-ignore
    contact.campaignData?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    refetchMessages();
    refetch();
  }, [refetchChat]);


  // useEffect(() => {
  //   if (applicationId) {
  //     setSelectedApplication(applicationId);
  //       // setSelectedCampaign(filteredContacts?.find(contact => contact.application_id === applicationId)?.campaignData);
  //                     setSelectedContact(filteredContacts?.find(contact => contact.application_id === applicationId)?.brand_name as string);
  //                     setSidebarOpen(false);
  //                     setSelectedApplication(applicationId);
  //   }
  // }, [applicationId]);



  return (
    <div className="grid grid-cols-1 lg:grid-cols-7  bg-background gap-3 lg:gap-3 h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] lg:translate-x-0 border-b border-border bg-card rounded-xl fixed lg:static inset-y-0 left-0 z-50 w-full col-span-2 bg-card border-r border-border transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                <h2 className="text-lg sm:text-xl font-bold">Messages</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-muted-foreground transition"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 mb-3" />
                <p className="text-sm">No conversations found</p>
              </div>
            ) : (
              filteredContacts?.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => {
                    setSelectedCampaign(contact?.campaignData);
                    setSelectedContact(contact.brand_name);
                    setSidebarOpen(false);
                    setSelectedApplication(contact?.application_id);
          
                    updateUnseenNewMessageCount({application_id: contact?.application_id, data: { creator_unseen_message_count: 0 }});
                  }}
                  className={`w-full p-3 sm:p-4 flex items-start gap-2 sm:gap-3 transition-all border-l-4 ${selectedContact === contact.brand_name
                      ? 'bg-accent border-l-cyan-500'
                      : 'border-l-transparent'
                    }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-semibold text-base sm:text-lg shadow-md">
                      {contact.brand_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 border-2 border-border rounded-full"></div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate text-xs sm:text-sm">
                        {contact?.campaignData?.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">{contact.brand_name}</p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    {/* @ts-ignore */}
                    {contact?.creator_unseen_message_count > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {/* @ts-ignore */}
                        {contact?.creator_unseen_message_count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex col-span-3  flex-col bg-card h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] rounded-xl">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-card border-b border-border px-3 sm:px-4 lg:px-6 py-3 sm:py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-muted-foreground transition flex-shrink-0"
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <div className="relative hidden lg:flex-shrink-0">
                    <div className=" w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-card flex items-center justify-center font-semibold shadow-md text-sm sm:text-base">
                      {selectedContact.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-border rounded-full"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{selectedContact}</h3>

                  </div>
                </div>
                <div className="flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">Actions</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-40 border-border space-y-2">
                      <DropdownMenuItem asChild>
                        <ProposeAmountModal
                          influencerName={selectedContact}
                          selectedCampaign={selectedCampaign}
                          selectedApplication={selectedApplication}
                        />
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className='mt-2'>
                        <TaskCompleteAlert
                          influencerName={selectedContact}
                          selectedCampaign={selectedCampaign}
                          selectedApplication={selectedApplication}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className='mt-2'>

                        <CampaignDetailsSidebarMobile campaign={selectedCampaign} />

                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>


                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 bg-card">
              {messagesPending ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                    <p className="text-slate-500 text-sm">Loading messages...</p>
                  </div>
                </div>
              ) : messages?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Start the conversation</h3>
                  <p className="text-slate-500 text-xs sm:text-sm max-w-md">
                    Send your first message to {selectedContact}
                  </p>
                </div>
              ) : (
                messages?.data?.map((message) => {
                  const isSender = message?.sender_id === session?.user?.id;
                  const hasProposal = message?.amount_proposed;
                  const isPaymentMessage = message?.is_payment_message;

                  return (
                    <div
                      key={message.chat_id}
                      className={`flex gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[75%] lg:max-w-lg ${isSender ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className={`px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 w-full sm:min-w-64 lg:min-w-72 rounded-2xl shadow-sm ${isSender
                              ? 'bg-gradient-to-br from-cyan-600 to-blue-600 rounded-br-md'
                              : 'bg-accent border border-border rounded-bl-md'
                            }`}
                        >
                          {message?.message && (
                            <p className="text-xs sm:text-sm leading-relaxed pb-2 sm:pb-3 border-current/10 whitespace-pre-wrap break-words">
                              {message.message}
                            </p>
                          )}

                          <div className='border-t border-border pt-2 sm:pt-3'>
                            {hasProposal && !isPaymentMessage && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Proposed Amount</p>
                                  <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1">
                                    ₹{message.amount_proposed?.toLocaleString('en-IN')}
                                  </p>
                                </div>

                                {message.is_amount_accepted === true && (
                                  <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0 text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    Accepted
                                  </Badge>
                                )}
                                {message.is_amount_accepted === false && (
                                  <Badge className="bg-rose-500 hover:bg-rose-600 border-0 text-xs">
                                    <X className="w-3 h-3 mr-1" />
                                    Rejected
                                  </Badge>
                                )}
                                {message.is_amount_accepted === null && (
                                  <Badge className="bg-amber-500 hover:bg-amber-600 border-0 text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending Response
                                  </Badge>
                                )}

                                {!isSender && message.is_amount_accepted === null && (
                                  <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-3">
                                    <Button
                                      onClick={() => handleUpdateProposalMessage(message?.chat_id!, true)}
                                      size="sm"
                                      className="bg-emerald-600 hover:bg-emerald-700 border-0 shadow-md text-xs w-full sm:w-auto"
                                    >
                                      <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                      Accept
                                    </Button>
                                    <Button
                                      onClick={() => handleUpdateProposalMessage(message?.chat_id!, false)}
                                      size="sm"
                                      className="bg-rose-600 hover:bg-rose-700 border-0 shadow-md text-xs w-full sm:w-auto"
                                    >
                                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* {isPaymentMessage && !message.is_payment_completed && (
                            <div className="space-y-2 sm:space-y-3">
                              <div>
                                <p className="text-xs font-medium opacity-70 mb-1">Payment Amount</p>
                                <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1">
                                  ₹{message.amount_proposed?.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <PaymentButton
                                amount={message.amount_proposed!}
                                campaignId={message.campaign_id!}
                                campaignName={selectedCampaign?.title!}
                                type="payment"
                                returnUrl={pathname}
                                chatId={message?.chat_id as string}
                              />
                            </div>
                          )} */}

                            {isPaymentMessage && message.is_payment_completed && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Payment Amount</p>
                                  <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1">
                                    ₹{message.amount_proposed?.toLocaleString('en-IN')}
                                  </p>
                                </div>
                                <div className="bg-emerald-500/20 text-emerald-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  Payment Completed
                                </div>
                              </div>
                            )}



                            {isPaymentMessage && message.is_payment_completed && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Payment Amount</p>
                                  <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1">
                                    ₹{message.amount_proposed?.toLocaleString('en-IN')}
                                  </p>
                                </div>
                                <div className="bg-emerald-500/20 text-emerald-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  Payment Completed
                                </div>
                              </div>
                            )}



                            {message?.is_task_message && message.task_completed_status === 'requested' && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Status:</p>
                                </div>
                                <div className="bg-yellow-500 text-yellow-700 px-3 capitalize sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  {message.task_completed_status}
                                </div>
                              </div>
                            )}

                            {message?.is_task_message && message.task_completed_status === 'completed' && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Status:</p>
                                </div>
                                <div className="bg-emerald-500/20 text-emerald-700 px-3 capitalize sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  {message.task_completed_status}
                                </div>
                              </div>
                            )}

                            {message?.is_task_message && message.task_completed_status === 'rejected' && (
                              <div className="space-y-2 sm:space-y-3">
                                <div>
                                  <p className="text-xs font-medium opacity-70 mb-1">Status:</p>
                                </div>
                                <div className="bg-rose-500/20 text-rose-700 px-3 capitalize sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  {message.task_completed_status}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                        {message?.created_at && (
                          <p className={`text-xs text-slate-500 mt-1 sm:mt-1.5 px-1 ${isSender ? 'text-right' : 'text-left'}`}>
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

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-card border-t border-border px-3 sm:px-4 lg:px-6 py-3 sm:py-4 shadow-lg">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={inputText}
                  required
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 bg-accent border border-border rounded-xl focus:outline-none transition placeholder:text-muted-foreground text-sm"
                />
                <button
                  type="submit"
                  disabled={sendNewMessagePending || !inputText.trim()}
                  className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{sendNewMessagePending ? 'Sending...' : 'Send'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center px-4 sm:px-6">
              <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Select a conversation</h3>
              <p className="text-slate-500 text-sm sm:text-base max-w-md">
                Choose a conversation from the sidebar to start messaging
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-medium hover:shadow-lg transition text-sm sm:text-base"
              >
                View Conversations
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden xl:block col-span-2">
        <CampaignDetailsSidebar campaign={selectedCampaign} />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-emerald-500 shadow-2xl rounded-xl px-4 sm:px-5 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-card rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="text-emerald-500 w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span className="font-medium text-sm sm:text-base">Successfully hired {selectedContact}!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;