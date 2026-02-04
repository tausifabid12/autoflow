import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NotificationSheet from '@/components/shared/Notification-Sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Menu } from "lucide-react"
import { useNotification } from '@/app/brand/(context)/NotificationContext'

export default function Header({setSidebarOpen}: {setSidebarOpen: (open: boolean) => void}) {
    const { data: session } = useSession();
    const router = useRouter();

    const { refetchNotifications } = useNotification();

    return (
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
                            Welcome back, {session?.user?.name}
                        </p>
                    </div>
                </div>

                <div className='flex item-center gap-2'>
                    {/* @ts-ignore */}
                    <NotificationSheet refetchNotifications={refetchNotifications} />
                    <div className="flex items-center gap-2 lg:gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer h-8 w-8 lg:h-10 lg:w-10">
                                    <AvatarImage src={session?.user?.image || ""} />
                                    <AvatarFallback>
                                        {session?.user?.name?.slice(0, 2)?.toUpperCase() || "US"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48 border-border">
                                <DropdownMenuLabel className="flex flex-col">
                                    <span className="font-medium">
                                        {session?.user?.name || "User"}
                                    </span>
                                    <span className="text-xs text-muted-foreground truncate">
                                        {session?.user?.email}
                                    </span>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => {
                                    signOut()
                                    router.push('/signin')
                                }} className="cursor-pointer">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            </div>
        </header>
    )
}
