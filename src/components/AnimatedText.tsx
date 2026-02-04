import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: "letters" | "words" | "lines";
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  animation = "letters",
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".animate-char");

    gsap.set(elements, {
      y: 120,
      opacity: 0,
      rotateX: -90,
    });

    gsap.to(elements, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      stagger: stagger,
      delay: delay,
      ease: "power4.out",
    });
  }, [delay, stagger]);

  const renderContent = () => {
    if (animation === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="animate-char inline-block">{word}</span>
        </span>
      ));
    }

    if (animation === "lines") {
      return text.split("\n").map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className="animate-char inline-block">{line}</span>
        </span>
      ));
    }

    // Default: letters
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <span className="animate-char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={className}>
      {renderContent()}
    </div>
  );
};

export default AnimatedText;
