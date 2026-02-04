import React, { useState } from 'react';
import { Bell, X, ExternalLink, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useSession } from 'next-auth/react';
import { getNotifications, deleteNotification, deleteAllNotification } from '@/lib/helper/notification';

const NotificationSheet = ({refetchNotifications}: {refetchNotifications?: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {data: session} = useSession()



  // ✅ Fetch notifications
  const { data, isLoading } = useQuery({
    queryKey: ['notifications', session?.user?.id, refetchNotifications]  ,
    queryFn: () => getNotifications(session?.user?.id as string),
    enabled: !!session?.user?.id,
  });

  // ✅ Delete single notification
  const deleteSingleMutation = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', session?.user?.id,] });
    },
  });

  // ✅ Delete all notifications
  const deleteAllMutation = useMutation({
    mutationFn: (id: string) => deleteAllNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', session?.user?.id] });
    },
  });

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const handleNotificationClick = (notification: any) => {
    if (
      notification.notification_type === 'redirect' &&
      notification.notification_redirect_url
    ) {
      window.open(notification.notification_redirect_url, '_blank');
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSingleMutation.mutate(id);
  };

  const handleDeleteAll = () => {
    deleteAllMutation.mutate(session?.user?.id as string);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      {/* Notification Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-blue-600 text-white text-xs font-semibold rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 z-40"
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-black/20 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold ">Notifications</h2>
                    <p className="text-sm  mt-1">
                      You have {unreadCount} unread notification
                      {unreadCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <button
                        onClick={handleDeleteAll}
                        disabled={deleteAllMutation.isPending}
                        className="px-3 py-1.5 text-sm  rounded-md transition-colors"
                      >
                        {deleteAllMutation.isPending ? 'Deleting...' : 'Delete all'}
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-md transition-colors"
                    >
                      <X className="h-5 w-5 " />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 ">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 px-6 text-center"
                  >
                    <div className="rounded-full bg-card p-4 mb-4">
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 ">
                      No notifications
                    </h3>
                    <p className="text-sm ">
                      You're all caught up! Check back later for updates.
                    </p>
                  </motion.div>
                ) : (
                  <div className="divide-y divide-border">
                    <AnimatePresence mode="popLayout">
                      {notifications.map((notification: any, index: number) => (
                        <motion.div
                          key={notification._id}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group relative px-6 py-4 cursor-pointer transition-colors `}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                              {
                                notification.notification_image_url ? (
                                  <img
                                    src={notification.notification_image_url}
                                    alt={notification.notification_title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                                    <Bell className="h-8 w-8 " />
                                  </div>
                                )
                              }
                              <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 shadow-sm">
                                {notification.notification_type === 'redirect' ? (
                                  <ExternalLink className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <MessageSquare className="h-3 w-3 text-blue-600" />
                                )}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-sm leading-tight ">
                                  {notification.notification_title}
                                </h4>
                              </div>

                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {notification.notification_description}
                              </p>

                              <div className="flex items-center justify-between">
                                {/* <span className="text-xs text-muted-foreground">
                                  {notification?.createdAt}
                                </span> */}

                                <motion.button
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1, scale: 1.1 }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1  rounded"
                                  onClick={(e) => handleDelete(notification._id, e)}
                                >
                                  <X className="h-4 w-4 " />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSheet;
