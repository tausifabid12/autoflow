'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Megaphone,
  CreditCard,
  MessageSquare,
  Settings,
  X,
  Briefcase
} from 'lucide-react'
import { NotificationProvider } from '../../brand/(context)/NotificationContext'
import Header from '../(components)/Header'

export default function InfluencerDashboardProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.role !== 'creator' && status !== 'loading') {
      router.push('/signin')
    }
  }, [session, status])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, link: '/influencer/dashboard' },
    { id: 'applications', label: 'Applied Jobs', icon: Megaphone, link: '/influencer/applications' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, link: '/influencer/transactions' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, link: '/jobs' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, link: '/influencer/chat' },
    { id: 'active-plan', label: 'Active Plan', icon: CreditCard, link: '/influencer/active-plan' },
    { id: 'profile', label: 'Profile', icon: Settings, link: '/influencer/profile' },
    { id: 'wallet', label: 'Wallet', icon: Settings, link: '/influencer/wallet' },
  ]

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-background overflow-hidden fixed top-0 z-50 w-full">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="p-4 lg:p-6 flex items-center justify-between border-b border-border">
            <Link href="/dashboard/jobs">
              <h2 className="text-xl font-bold text-foreground">GetCreator</h2>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => {
                    setActiveMenu(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40/8B5CF6/ffffff?text=AD" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{session?.user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NotificationProvider>
  )
}
