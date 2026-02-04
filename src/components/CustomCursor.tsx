import { useEffect, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover detection to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .hoverable'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [isVisible]);

  useEffect(() => {
    gsap.to(".custom-cursor-main", {
      x: position.x - 10,
      y: position.y - 10,
      duration: 0.15,
      ease: "power3.out",
    });

    gsap.to(".custom-cursor-trail", {
      x: position.x - 4,
      y: position.y - 4,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [position]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor-main fixed w-5 h-5 rounded-full bg-primary pointer-events-none mix-blend-difference z-[9999] transition-transform duration-300 ${
          isHovering ? "scale-[2.5]" : "scale-100"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ left: 0, top: 0 }}
      />
      <div
        className={`custom-cursor-trail fixed w-2 h-2 rounded-full bg-foreground/50 pointer-events-none z-[9998] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;
