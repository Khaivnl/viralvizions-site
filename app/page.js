"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ===== TRACKING =====
function track(e, p = {}) {
  if (typeof window !== "undefined") {
    window.fbq?.("track", e, p);
    window.gtag?.("event", e, p);
  }
}
function trackCustom(e, p = {}) {
  if (typeof window !== "undefined") {
    window.fbq?.("trackCustom", e, p);
    window.gtag?.("event", e, p);
  }
}

// ===== SCROLL REVEAL =====
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ===== COUNTER =====
function Counter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref} className="tabular-nums">{prefix}{count}{suffix}</span>;
}

// ===== DATA =====
const CALENDLY = "https://calendly.com/khai-viralvizions/discoverycall";
const WHATSAPP = "https://wa.me/6588937461";

const work = [
  { name: "SCCP", tag: "F&B", result: "$120K opening month", views: "2M+ views", img: null },
  { name: "OkamiClo", tag: "Fashion", result: "$300K+ revenue", views: "5M+ views", img: null },
  { name: "Zaky Travel", tag: "Travel", result: "$50K retargeting", views: "300K+ views", img: null },
  { name: "Star Soccer", tag: "Sports", result: "300+ leads", views: "1.2M views", img: null },
  { name: "Ashes Burnnit", tag: "F&B", result: "1,000+ new customers", views: "1.2M views", img: null },
  { name: "Smash Jr", tag: "F&B", result: "Outsold all competitors", views: "400K views", img: null },
];

const logos = ["SCCP", "Yaseem", "Ashes Burnnit", "Zaky Travel", "Star Soccer", "Smash Jr", "theBrulee", "Charrbo", "Whiskdom", "OkamiClo", "Fame", "Makbesar"];

// ===== MAIN =====
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setNavVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll tracking
    const depths = {};
    const trackDepth = () => {
      const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 90].forEach(d => {
        if (pct >= d && !depths[d]) { depths[d] = true; trackCustom("ScrollDepth", { depth: `${d}%` }); }
      });
    };
    window.addEventListener("scroll", trackDepth, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("scroll", trackDepth); };
  }, []);

  const handleCTA = useCallback((loc) => {
    track("Schedule", { content_name: "DNA Blueprint Call", value: 4000, currency: "SGD" });
    trackCustom("ClickBookCall", { location: loc });
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#111] overflow-x-hidden">

      {/* ===== NAV ===== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: navVisible ? "rgba(250,249,247,0.92)" : "transparent",
          backdropFilter: navVisible ? "blur(20px)" : "none",
          borderBottom: navVisible ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            <span className="text-[#111]">viral</span>
            <span className="text-red-600">vizions</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a href="#work" className="text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors link-underline">Work</a>
            <a href="#method" className="text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors link-underline">Method</a>
            <a href="#about" className="text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors link-underline">About</a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("nav")}
              className="bg-[#111] text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-[#333] transition-all"
            >
              Start a project
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col justify-center relative mesh-gradient">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pt-0 md:pb-0">
          <div className="fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-8">
              Content agency â Singapore
            </p>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight max-w-5xl" style={{ letterSpacing: "-0.03em" }}>
              We turn content
              <br />
              <span className="italic text-[#999]">into customers</span>
            </h1>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
            <p className="text-[#666] text-lg md:text-xl max-w-xl mt-10 leading-relaxed font-light">
              Done-for-you content systems for businesses who want growth they can measure. You show up for 2 hours. We handle the rest.
            </p>
          </div>

          <div className="fade-up flex flex-col sm:flex-row gap-4 mt-12" style={{ animationDelay: "1.1s", animationFillMode: "both" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("hero")}
              className="group bg-[#111] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#333] transition-all inline-flex items-center gap-3"
            >
              Book a strategy call
              <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCustom("ClickWhatsApp", { location: "hero" })}
              className="border border-[#ddd] text-[#666] px-8 py-4 rounded-full text-[15px] font-medium hover:border-[#111] hover:text-[#111] transition-all inline-flex items-center gap-2"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 fade-in" style={{ animationDelay: "1.6s", animationFillMode: "both" }}>
          <div className="w-[1px] h-12 bg-[#ccc] mx-auto overflow-hidden">
            <div className="w-full h-1/2 bg-[#111] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 md:py-32 border-t border-[#eee]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-8">
            {[
              { n: 50, s: "M+", label: "Views generated" },
              { n: 2, p: "$", s: "M+", label: "Revenue driven" },
              { n: 80, s: "+", label: "Businesses served" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="text-center md:text-left">
                  <div className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
                    <Counter target={stat.n} prefix={stat.p || ""} suffix={stat.s} />
                  </div>
                  <p className="text-[#999] text-[13px] font-medium tracking-[0.1em] uppercase mt-3">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOGO STRIP ===== */}
      <section className="py-8 border-y border-[#eee] overflow-hidden">
        <div className="flex gap-16 animate-marquee">
          {[...logos, ...logos, ...logos].map((l, i) => (
            <span key={i} className="flex-shrink-0 text-[#ccc] text-sm font-semibold tracking-widest uppercase whitespace-nowrap">{l}</span>
          ))}
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex items-end justify-between mb-16 md:mb-24">
              <div>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-4">/ Selected work</p>
                <h2 className="font-serif text-4xl md:text-6xl tracking-tight italic" style={{ letterSpacing: "-0.02em" }}>
                  Results that speak
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Bento grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {work.map((project, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`group relative rounded-2xl overflow-hidden hover-lift cursor-pointer ${i === 0 ? "md:row-span-2" : ""}`}>
                  {/* Placeholder for project image */}
                  <div
                    className={`bg-[#111] ${i === 0 ? "aspect-[3/4] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}
                    style={{
                      background: `linear-gradient(135deg, #111 0%, ${
                        ["#1a1a2e", "#2d1b1b", "#1b2d1b", "#1b1b2d", "#2d2b1b", "#1b2d2d"][i]
                      } 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-white/40 text-xs font-medium tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">{project.tag}</span>
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">{project.name}</h3>
                      <div className="flex items-center gap-6 mt-3">
                        <span className="text-red-400 font-semibold text-sm">{project.result}</span>
                        <span className="text-white/40 text-xs">{project.views}</span>
                      </div>
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white text-sm">â</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Rolling proof */}
          <Reveal delay={300}>
            <p className="text-[#bbb] text-sm mt-12 max-w-2xl leading-relaxed">
              Also: theBrulee Â· Charrbo Â· Whiskdom Â· Fame Â· Makbesar Â· Nenek Recipe Â· and 70+ more across F&B, travel, sports, fashion, education, and services.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== METHOD ===== */}
      <section id="method" className="py-24 md:py-40 bg-[#111] text-white relative overflow-hidden">
        {/* Subtle red glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/3 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#555] mb-4">/ The DNA Blueprint</p>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight max-w-3xl" style={{ letterSpacing: "-0.02em" }}>
              Not random content.
              <br />
              <span className="italic text-[#555]">A system.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-0 mt-20 md:mt-32">
            {[
              {
                num: "01",
                title: "Discover",
                body: "We study your business, your audience, your competitors. We find the angle that makes people stop scrolling â and the positioning that makes them choose you over everyone else.",
              },
              {
                num: "02",
                title: "Narrate",
                body: "8 videos a month. Scripted, filmed, edited, posted. Every video has a job â attract, build trust, or convert. We handle everything. You show up for 2 hours.",
              },
              {
                num: "03",
                title: "Accelerate",
                body: "We track what drives real customers â not vanity views. Double down on what works. Kill what doesn't. By month three, the system compounds.",
              },
            ].map((phase, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className={`py-12 md:py-0 md:px-10 ${i !== 2 ? "border-b md:border-b-0 md:border-r border-[#222]" : ""}`}>
                  <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">{phase.num}</span>
                  <h3 className="font-serif text-3xl md:text-4xl mt-4 mb-6 tracking-tight">{phase.title}</h3>
                  <p className="text-[#777] leading-relaxed text-[15px]">{phase.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="mt-20 md:mt-32 pt-12 border-t border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <p className="font-serif text-2xl md:text-3xl italic text-[#555] max-w-lg tracking-tight">
                &ldquo;You show up for 2 hours. We handle everything else.&rdquo;
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA("method")}
                className="group bg-white text-[#111] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#eee] transition-all inline-flex items-center gap-3 flex-shrink-0"
              >
                See if we&apos;re a fit
                <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section id="about" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <Reveal>
              <div>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-4">/ Why us</p>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                  Bukan agency
                  <br />
                  <span className="italic text-[#999]">biasa.</span>
                </h2>
                <p className="text-[#666] mt-8 leading-relaxed text-[15px] max-w-md">
                  We&apos;re Malay. We&apos;re Muslim. When we script a video for your nasi padang restaurant, we don&apos;t need a research report to understand the customer â we ARE the customer.
                </p>
                <p className="text-[#666] mt-4 leading-relaxed text-[15px] max-w-md">
                  We know Ramadan cycles, halal positioning, family dynamics, and how trust works in our community.
                </p>
              </div>
            </Reveal>

            <div className="space-y-8">
              {[
                { title: "Revenue, not views", body: "We measure one thing: did your business make more money? Every decision is built around driving real customers." },
                { title: "The guarantee", body: "20% increase in sales by month 3 â or we keep working for free. We put skin in the game." },
                { title: "Complete lepas tangan", body: "2 hours per month. That's your entire commitment. We handle scripting, filming, editing, posting, strategy, and tracking." },
                { title: "80+ businesses", body: "Restaurants. Travel. Sports. Fashion. Personal brands. The DNA Blueprint works across industries." },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="pb-8 border-b border-[#eee]">
                    <h3 className="font-semibold text-lg tracking-tight mb-2">{item.title}</h3>
                    <p className="text-[#888] text-[15px] leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 md:py-40 bg-[#f5f4f2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-4">/ Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight italic mb-16 md:mb-24" style={{ letterSpacing: "-0.02em" }}>
              In their words
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Opening month â $120K in sales, 2 million views, 8 media features. They didn't just make us visible. They made us the talk of the town.",
                name: "SCCP",
                tag: "F&B",
              },
              {
                quote: "I run a travel agency â not food. Didn't think content would work. 300K views, 100 leads, $50K from retargeting. Dia faham our community.",
                name: "Zaky Alwie",
                tag: "Zaky Travel",
              },
              {
                quote: "Growth had flatlined. Since VV â 1.2 million views, 1,000+ new customers. People come in saying 'I saw you on TikTok.' Lepas tangan.",
                name: "Ashes Burnnit",
                tag: "F&B",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="h-full flex flex-col">
                  <div className="text-red-600/30 font-serif text-6xl leading-none mb-4">&ldquo;</div>
                  <p className="text-[#555] leading-relaxed text-[15px] flex-1 italic">{t.quote}</p>
                  <div className="mt-8 pt-6 border-t border-[#ddd]">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-[#aaa] text-xs mt-0.5">{t.tag}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-4">/ The founder</p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12" style={{ letterSpacing: "-0.02em" }}>
                Built from zero.
                <br />
                <span className="italic text-[#999]">By one of us.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="w-20 h-20 rounded-full bg-[#111] mx-auto mb-10 flex items-center justify-center">
                <span className="text-white font-serif text-2xl italic">K</span>
              </div>
              <p className="text-[#555] leading-relaxed text-[15px] mb-4">
                <strong className="text-[#111]">Khai</strong> â 25, Malay, Muslim, Singaporean. Started ViralVizions during a double degree at SMU while doing FoodPanda deliveries.
              </p>
              <p className="text-[#888] leading-relaxed text-[15px]">
                Built the agency from nothing to 80+ clients, 50M+ views, and $2M+ in revenue driven. Today, VV is a team of 10+ running the DNA Blueprint across every industry. Still on the ground. Still in the community. Still showing up.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 md:py-40 border-t border-[#eee]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-4">/ FAQ</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight italic mb-16" style={{ letterSpacing: "-0.02em" }}>
              Before you ask
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              { q: "Is this only for F&B?", a: "No. We work across travel, sports, fashion, services, education. The system drives customers regardless of industry." },
              { q: "How much does it cost?", a: "$4,000/month for a 3-month engagement. 8 videos per month â scripted, filmed, edited, posted. Strategy and tracking included." },
              { q: "What if it doesn't work?", a: "20% sales increase by month 3, or we work for free until you hit it. We guarantee results." },
              { q: "How much time do I need?", a: "2 hours per month for recording. That's it. We handle everything else." },
              { q: "I've been burned by agencies before.", a: "Most sell views. We sell revenue. We understand this community. And we guarantee results with skin in the game." },
              { q: "What happens on the call?", a: "30 minutes. Free. We look at your business and tell you exactly what we'd do. No hard sell." },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group border-b border-[#eee] py-6 cursor-pointer">
                  <summary className="flex items-center justify-between font-medium text-[15px] text-[#111] list-none">
                    {faq.q}
                    <span className="text-[#ccc] group-open:rotate-45 transition-transform duration-300 text-xl ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="text-[#888] text-[14px] leading-relaxed mt-4 pr-12">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-32 md:py-48 bg-[#111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              Your competitor
              <br />
              <span className="italic text-[#555]">won&apos;t wait.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[#666] text-lg mt-8 max-w-md mx-auto leading-relaxed font-light">
              One call. 30 minutes. Free. We&apos;ll tell you exactly what we&apos;d do â and whether we can help.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA("final")}
                className="group bg-white text-[#111] px-10 py-5 rounded-full text-lg font-medium hover:bg-[#eee] transition-all inline-flex items-center gap-3"
              >
                Book your strategy call
                <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <p className="text-[#444] mt-8 text-sm italic font-serif">Bismillah. Let&apos;s build.</p>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 bg-[#0a0a0a] text-[#555]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">viral</span>
                <span className="text-red-600">vizions</span>
              </span>
              <p className="text-[11px] text-[#444] mt-1 tracking-wide">Content â Customers</p>
            </div>
            <div className="flex items-center gap-8">
              <a href="https://www.tiktok.com/@viralvizions" target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition link-underline">TikTok</a>
              <a href="https://www.instagram.com/viralvizions_/" target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition link-underline">Instagram</a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition link-underline">WhatsApp</a>
              <a href="/blueprint" className="text-[12px] hover:text-white transition link-underline">For businesses</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#1a1a1a] text-center">
            <p className="text-[11px] text-[#333]">Â© 2026 ViralVizions. Part of Okami Holdings Pte Ltd. Singapore.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
