"use client";

import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import NotificationSheet from "@/components/shared/Notification-Sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "For Brands", href: "/for-brands" },
    { label: "For Creators", href: "/for-creators" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-b from-gray-950/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* === Logo === */}
            <Link href="/">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                  Get Creator
                </span>
              </div>
            </Link>

            {/* === Desktop Nav Links === */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* === Desktop User / Auth Buttons === */}
            {session?.user?.id ? (
              <div className="hidden lg:flex items-center gap-4">
                <NotificationSheet />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt={session?.user?.name || ""}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                          {getInitials(session?.user?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-black/10 backdrop-blur-xl border border-border"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          session?.user?.role === "creator"
                            ? "/influencer/dashboard"
                            : "/brand/dashboard"
                        }
                        className="cursor-pointer"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          session?.user?.role === "creator"
                            ? "/influencer/profile"
                            : "/brand/profile"
                        }
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        signOut();
                        router.push("/signin");
                      }}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link href="/signin">
                  <button className="px-6 py-2.5 text-gray-300 hover:text-white font-bold transition-colors duration-300 border border-white/20 rounded-lg hover:border-white/40">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/50">
                    Get Started
                  </button>
                </Link>
              </div>
            )}

            {/* === Mobile Menu Toggle === */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300 relative z-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* === Mobile Dropdown Menu (Full Screen Overlay) === */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gray-950/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute inset-x-0 top-[72px] bottom-0 overflow-y-auto transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="min-h-full px-6 py-8 flex flex-col">
            {/* User Profile Card (if logged in) */}
            {session?.user?.id && (
              <div className="mb-8 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10 ring-2 ring-pink-500/50">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg">
                      {getInitials(session?.user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-white">
                      {session?.user?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {session?.user?.email}
                    </p>
                  </div>
                  <NotificationSheet />
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col gap-2 mb-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group px-5 py-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-semibold text-lg border border-transparent hover:border-white/10"
                  style={{
                    animation: isOpen
                      ? `slideIn 0.3s ease-out ${index * 0.05}s both`
                      : "none",
                  }}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-400">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            {/* User Actions or Auth Buttons */}
            {session?.user?.id ? (
              <div className="mt-auto space-y-3">
                <Link
                  href={
                    session?.user?.role === "creator"
                      ? "/influencer/dashboard"
                      : "/brand/dashboard"
                  }
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all duration-300"
                >
                  <LayoutDashboard className="h-5 w-5 text-pink-400" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href={
                    session?.user?.role === "creator"
                      ? "/influencer/profile"
                      : "/brand/profile"
                  }
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all duration-300"
                >
                  <Settings className="h-5 w-5 text-purple-400" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                    router.push("/signin");
                  }}
                  className="flex items-center gap-3 w-full px-6 py-4 text-left bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-semibold transition-all duration-300 text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="mt-auto space-y-3">
                <Link href="/signin" className="block">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-6 py-4 text-white font-bold transition-all duration-300 border-2 border-white/30 rounded-xl hover:border-white/50 hover:bg-white/5"
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/sign-up" className="block">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}