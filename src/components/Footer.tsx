import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer.querySelectorAll(".footer-col"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        },
      }
    );
  }, []);

  const footerLinks = {
    Platform: ["For Brands", "For Creators", "Pricing", "Features"],
    Company: ["About", "Careers", "Blog", "Press"],
    Resources: ["Help Center", "Community", "Guides", "API"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-card border-t border-border/50 py-16 md:py-24"
    >
      <div className="content-container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="footer-col col-span-2">
            <h3 className="font-display font-bold text-2xl mb-4">CREATRIX</h3>
            <p className="text-sm text-muted-foreground font-body max-w-xs mb-6">
              The platform where brands and creators build authentic
              partnerships.
            </p>
            <div className="flex gap-4">
              {["𝕏", "in", "ig", "yt"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hoverable"
                >
                  <span className="text-sm font-bold">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4 className="font-display font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-body hoverable"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-body">
            © 2024 Creatrix. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Made with <span className="text-primary">♥</span> for creators
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
