import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
}

const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
      setIsHovering(false);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const baseStyles =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-display font-semibold transition-all duration-500";

  const variants = {
    primary: `bg-primary text-primary-foreground px-10 py-5 text-lg ${
      isHovering ? "shadow-glow scale-105" : ""
    }`,
    outline: `border-2 border-foreground/20 text-foreground px-10 py-5 text-lg ${
      isHovering ? "border-primary text-primary" : ""
    }`,
    ghost: `text-foreground/70 px-6 py-3 ${isHovering ? "text-primary" : ""}`,
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          className={`absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </button>
  );
};

export default MagneticButton;
