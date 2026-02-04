"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Bookmark, Briefcase, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/influencer/dashboard", icon: Briefcase, label: "Dashboard" },
  { href: "/influencer/bookmarked", icon: Bookmark, label: "Bookmarked" },
  { href: "/influencer/accepted", icon: CheckCircle, label: "Accepted" },
  { href: "/influencer/disputes", icon: AlertCircle, label: "Disputes" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:left-0 lg:top-0 lg:bottom-0 lg:w-20 bg-zinc-900/80 backdrop-blur-xl border-t lg:border-r lg:border-t-0 border-zinc-800">
      <div className="flex lg:flex-col items-center justify-around lg:justify-start lg:py-8 h-16 lg:h-full">
        <div className="hidden lg:block mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
            I
          </div>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col lg:flex-row items-center justify-center w-16 h-16 rounded-xl transition-all",
                isActive
                  ? "text-blue-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <item.icon className="h-5 w-5 relative z-10" />
              <span className="text-xs mt-1 lg:hidden relative z-10">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
