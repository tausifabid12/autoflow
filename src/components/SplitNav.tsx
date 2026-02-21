


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Sign-in', link: '/signin' },
  { name: 'Creators', link: '/creators' },
  { name: 'Brands', link: '/brands' },
  { name: 'Features', link: '/features' },
  { name: 'Jobs', link: '/jobs' },
];

const transitionEase = [0.76, 0, 0.24, 1];
const CLOSE_DURATION = 1000; // must match framer-motion duration

// ---------------------------------------------------------------------------
// Logo – ported from old Navbar, converted from GSAP → framer-motion
// ---------------------------------------------------------------------------
const Logo = () => {
  const logoText = "CREATRIX";
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/"
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-bold text-2xl md:text-2xl tracking-tight flex items-center">
        {logoText.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="logo-letter inline-block text-white transition-colors duration-300 group-hover:text-primary"
            style={{ perspective: "500px" }}
            // Entrance: staggered fade + rotateX (mirrors the GSAP timeline)
            initial={{ y: 40, opacity: 0, rotateX: -90 }}
            animate={
              hovered
                ? { y: -8, opacity: 1, rotateX: 0 } // hover state
                : { y: 0, opacity: 1, rotateX: 0 }  // resting state
            }
            transition={
              hovered
                ? { duration: 0.3, delay: i * 0.02, ease: "easeOut" }   // hover stagger
                : { duration: 0.8, delay: 0.5 + i * 0.04, ease: [0.33, 1, 0.68, 1] } // entrance stagger
            }
          >
            {letter}
          </motion.span>
        ))}

        {/* Dot – scales up on hover (elastic feel like the original) */}
        <motion.span
          className="logo-dot w-2 h-2 rounded-full bg-primary ml-1 inline-block"
          animate={{ scale: hovered ? 1.5 : 1 }}
          transition={{ duration: 0.3, ease: hovered ? [0.34, 1.56, 0.64, 1] : "easeOut" }}
        />
      </span>

      {/* Underline accent – grows on hover, same as old Navbar */}
      <span
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent transition-all duration-500 ease-out"
        style={{ width: hovered ? '100%' : '0%' }}
      />
    </a>
  );
};

// ---------------------------------------------------------------------------
// SplitNav
// ---------------------------------------------------------------------------
const SplitNav = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setTimeout(() => router.push(path), CLOSE_DURATION);
  };

  const pathName = usePathname()
  const hideNavbar =
    pathName?.startsWith('/influencer') ||
    pathName === '/brand';


  return (
    <div className="relative min-h-screen  mx-auto   overflow-hidden">



      {
        !hideNavbar &&
        <div className="absolute top-8 left-1/2 -translate-x-1/2
                w-full max-w-7xl
                flex items-center justify-between
                px-6 md:px-0
                bg-transparent z-[10000]">

          {/* Logo – top-left, always visible */}
          <div className="">
            {
              !isOpen && <Logo />
            }


          </div>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" z-[100] relative group flex flex-col gap-2 items-end p-4 transition-transform active:scale-90"
          >
            <div className={`h-[2px] bg-white transition-all duration-500 ease-out ${isOpen ? 'w-8 rotate-45 translate-y-[10px]' : 'w-10'}`} />
            <div className={`h-[2px] bg-white transition-all duration-500 ease-out ${isOpen ? 'opacity-0' : 'w-6'}`} />
            <div className={`h-[2px] bg-white transition-all duration-500 ease-out ${isOpen ? 'w-8 -rotate-45 -translate-y-[10px]' : 'w-8'}`} />
          </button>

        </div>
      }




      {children}




      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] overflow-hidden flex pointer-events-auto">

            {/* SVG Noise Filter */}
            <svg className="hidden">
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </svg>

            {/* Left Panel: Deep Dark */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              //@ts-ignore
              transition={{ duration: 1, ease: transitionEase }}
              className="relative w-1/2 h-full bg-[hsl(240,10%,6%)] flex flex-col justify-center items-end pr-12 md:pr-24 border-r border-white/5"
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: 'url(#grain)' }}></div>

              <nav className="relative z-10 flex flex-col gap-6 md:gap-8 text-right">
                {MENU_ITEMS.map((item, idx) => (
                  <NavItem onClick={() => handleNavigate(item.link)} key={item.name} text={item.name} index={idx} />
                ))}
              </nav>
            </motion.div>

            {/* Right Panel: Gradient */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              //@ts-ignore
              transition={{ duration: 1, ease: transitionEase }}
              className="relative w-1/2 h-full flex flex-col justify-center items-start pl-12 md:pl-24"
              style={{
                background: `linear-gradient(135deg, hsl(45, 100%, 55%), hsl(340, 85%, 65%))`
              }}
            >
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ filter: 'url(#grain)' }}></div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-black/80 font-mono text-xs uppercase tracking-widest flex flex-col gap-4"
              >
                <div className="font-bold underline decoration-1 underline-offset-4">
                  Tausif Abid
                </div>
                <div className="max-w-xs leading-relaxed font-medium">
                  Full-stack developer building creator platforms for brands.
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------------------------------------
// NavItem (unchanged)
// ---------------------------------------------------------------------------
const NavItem = ({ text, index, onClick }: { text: string; index: number; onClick: () => void }) => {
  return (
    <button onClick={onClick} className="group relative text-left">
      <div className="flex overflow-hidden py-1">
        {text.split('').map((char: any, i: any) => (
          <motion.span
            key={i}
            initial={{ y: "100%", rotate: 10, filter: 'blur(10px)', opacity: 0 }}
            animate={{ y: 0, rotate: 0, filter: 'blur(0px)', opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3 + (index * 0.05) + (i * 0.02),
              ease: [0.33, 1, 0.68, 1]
            }}
            className="inline-block text-[8vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter text-[hsl(45,20%,96%)] transition-colors duration-500 group-hover:text-primary"
            style={{
              display: char === ' ' ? 'inline' : 'inline-block',
              transformOrigin: 'bottom left'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* Animated Underline */}
      <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-out group-hover:w-full" />
    </button>
  );
};

export default SplitNav;