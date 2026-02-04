import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Creator {
  id: number;
  name: string;
  handle: string;
  niche: string;
  followers: string;
  engagement: string;
  avatar: string;
  color: string;
  position: { x: number; y: number };
}

const mockCreators: Creator[] = [
  {
    id: 1,
    name: "Alex Chen",
    handle: "@alexcreates",
    niche: "Tech & Gadgets",
    followers: "2.4M",
    engagement: "8.2%",
    avatar: "🎮",
    color: "from-blue-500/30",
    position: { x: 10, y: 15 },
  },
  {
    id: 2,
    name: "Maya Johnson",
    handle: "@mayastyle",
    niche: "Fashion & Beauty",
    followers: "1.8M",
    engagement: "12.1%",
    avatar: "💄",
    color: "from-pink-500/30",
    position: { x: 75, y: 10 },
  },
  {
    id: 3,
    name: "Jordan Rivera",
    handle: "@jordanfits",
    niche: "Fitness & Wellness",
    followers: "3.2M",
    engagement: "9.8%",
    avatar: "💪",
    color: "from-green-500/30",
    position: { x: 20, y: 60 },
  },
  {
    id: 4,
    name: "Sam Taylor",
    handle: "@samtravels",
    niche: "Travel & Adventure",
    followers: "1.5M",
    engagement: "11.3%",
    avatar: "✈️",
    color: "from-orange-500/30",
    position: { x: 65, y: 55 },
  },
  {
    id: 5,
    name: "Riley Kim",
    handle: "@rileycooks",
    niche: "Food & Recipes",
    followers: "2.1M",
    engagement: "14.2%",
    avatar: "🍳",
    color: "from-yellow-500/30",
    position: { x: 45, y: 35 },
  },
  {
    id: 6,
    name: "Casey Williams",
    handle: "@caseydesigns",
    niche: "Design & Art",
    followers: "890K",
    engagement: "16.5%",
    avatar: "🎨",
    color: "from-purple-500/30",
    position: { x: 85, y: 40 },
  },
];

const CreatorDiscovery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const creatorsRef = useRef<HTMLDivElement>(null);
  const [activeCreator, setActiveCreator] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const creators = creatorsRef.current;

    if (!section || !creators) return;

    // Section title animation
    gsap.fromTo(
      section.querySelector(".section-title"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Float animation for creator cards
    const creatorCards = creators.querySelectorAll(".creator-card");
    creatorCards.forEach((card, index) => {
      // Initial fade in
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: creators,
            start: "top 75%",
          },
        }
      );

      // Continuous floating animation
      gsap.to(card, {
        y: `+=${10 + Math.random() * 15}`,
        x: `+=${5 + Math.random() * 10}`,
        rotation: Math.random() * 4 - 2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = creators.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };

    creators.addEventListener("mousemove", handleMouseMove);

    return () => {
      creators.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCreatorClick = (id: number) => {
    setActiveCreator(activeCreator === id ? null : id);

    const card = document.querySelector(`[data-creator-id="${id}"]`);
    if (!card) return;

    if (activeCreator !== id) {
      // Expand card
      gsap.to(card, {
        scale: 1.2,
        zIndex: 50,
        duration: 0.4,
        ease: "power3.out",
      });

      // Dim other cards
      document.querySelectorAll(".creator-card").forEach((c) => {
        if (c !== card) {
          gsap.to(c, { opacity: 0.4, scale: 0.95, duration: 0.3 });
        }
      });
    } else {
      // Reset all cards
      document.querySelectorAll(".creator-card").forEach((c) => {
        gsap.to(c, { opacity: 1, scale: 1, zIndex: 1, duration: 0.3 });
      });
    }
  };

  return (
    <section ref={sectionRef} className="section-container py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(260 30% 65% / 0.2) 0%, transparent 60%)",
        }}
      />

      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className="section-title mb-16 md:mb-24 text-center md:text-left">
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-sm font-body text-secondary tracking-widest uppercase">
              For Creators
            </span>
          </div>
          <h2 className="headline-section mb-6">
            Get discovered by brands
            <br />
            <span className="text-gradient">that align with you</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto md:mx-0">
            No cold DMs. Just authentic matches with brands that fit your vibe.
          </p>
        </div>

        {/* Floating Creators Grid */}
        <div
          ref={creatorsRef}
          className="relative min-h-[500px] md:min-h-[600px]"
          style={{
            perspective: "1000px",
          }}
        >
          {mockCreators.map((creator) => (
            <div
              key={creator.id}
              data-creator-id={creator.id}
              className="creator-card absolute card-glass p-4 md:p-6 cursor-pointer transition-all duration-300 hoverable"
              style={{
                left: `${creator.position.x}%`,
                top: `${creator.position.y}%`,
                transform: `translate(-50%, -50%) translateZ(${
                  mousePos.x * 20
                }px)`,
              }}
              onClick={() => handleCreatorClick(creator.id)}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${creator.color} to-transparent opacity-60`}
              />

              <div className="relative">
                {/* Avatar */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground/10 flex items-center justify-center mb-3 mx-auto">
                  <span className="text-2xl md:text-3xl">{creator.avatar}</span>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h4 className="font-display font-semibold text-foreground text-sm md:text-base">
                    {creator.name}
                  </h4>
                  <p className="text-xs text-primary font-body">
                    {creator.handle}
                  </p>
                </div>

                {/* Expanded Stats - visible when active */}
                <div
                  className={`mt-4 pt-4 border-t border-foreground/10 transition-all duration-300 ${
                    activeCreator === creator.id
                      ? "opacity-100 max-h-40"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {creator.niche}
                  </p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-foreground font-semibold">
                        {creator.followers}
                      </p>
                      <p className="text-muted-foreground text-xs">Followers</p>
                    </div>
                    <div>
                      <p className="text-primary font-semibold">
                        {creator.engagement}
                      </p>
                      <p className="text-muted-foreground text-xs">Engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Center Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(12 95% 62%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(12 95% 62%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(12 95% 62%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {mockCreators.slice(0, -1).map((creator, i) => {
              const next = mockCreators[i + 1];
              return (
                <line
                  key={i}
                  x1={`${creator.position.x}%`}
                  y1={`${creator.position.y}%`}
                  x2={`${next.position.x}%`}
                  y2={`${next.position.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {["All", "Fashion", "Tech", "Fitness", "Travel", "Food", "Art"].map(
            (filter) => (
              <button
                key={filter}
                className={`px-5 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  filter === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatorDiscovery;
