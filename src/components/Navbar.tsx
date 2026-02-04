import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";


const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;

    if (!nav || !logo) return;

    // Initial animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4.out" }
    );

    // Logo hover animation
    const handleLogoHover = () => {
      gsap.to(logo.querySelectorAll(".logo-letter"), {
        y: -5,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLogoLeave = () => {
      gsap.to(logo.querySelectorAll(".logo-letter"), {
        y: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    logo.addEventListener("mouseenter", handleLogoHover);
    logo.addEventListener("mouseleave", handleLogoLeave);

    // Scroll behavior - hide/show nav
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(nav, { y: -100, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(nav, { y: 0, duration: 0.4, ease: "power3.out" });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      logo.removeEventListener("mouseenter", handleLogoHover);
      logo.removeEventListener("mouseleave", handleLogoLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoText = "CREATRIX";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          ref={logoRef}
          className="cursor-pointer hoverable"
        >
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight">
            {logoText.split("").map((letter, i) => (
              <span key={i} className="logo-letter inline-block">
                {letter}
              </span>
            ))}
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Brands", path: "/brands" },
            { label: "Creators", path: "/creators" },
            { label: "Features", path: "/features" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className="font-body text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 hoverable"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth"
            className="hidden sm:block font-body text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 hoverable"
          >
            Log in
          </Link>
          <Link href="/auth" className="btn-primary px-6 py-2.5 text-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
