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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
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
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
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
    const steps = 50;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1600 / steps);
    return () => clearInterval(timer);
  }, [started, target]);
  return <span ref={ref} className="tabular-nums">{prefix}{count}{suffix}</span>;
}

// ===== CONSTANTS =====
const CALENDLY = "https://calendly.com/khai-viralvizions/discoverycall";
const WHATSAPP = "https://wa.me/6588937461";

// ===== MAIN =====
export default function Blueprint() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll depth tracking
    const depths = {};
    const trackDepth = () => {
      const pct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 90].forEach((d) => {
        if (pct >= d && !depths[d]) {
          depths[d] = true;
          trackCustom("ScrollDepth_Blueprint", { depth: `${d}%` });
        }
      });
    };
    window.addEventListener("scroll", trackDepth, { passive: true });

    // Track page view
    trackCustom("ViewBlueprintPage");

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", trackDepth);
    };
  }, []);

  const handleCTA = useCallback((loc) => {
    track("Schedule", { content_name: "DNA Blueprint Call", value: 4000, currency: "SGD" });
    trackCustom("ClickBookCall_Blueprint", { location: loc });
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#111] overflow-x-hidden">

      {/* ===== STICKY CTA BAR (mobile) ===== */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-500"
        style={{
          transform: scrollY > 400 ? "translateY(0)" : "translateY(100%)",
          opacity: scrollY > 400 ? 1 : 0,
        }}
      >
        <div className="bg-[#111]/95 backdrop-blur-lg px-4 py-3 border-t border-white/10">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("sticky_mobile")}
            className="block w-full bg-red-600 text-white text-center py-3.5 rounded-full text-[15px] font-semibold"
          >
            Book Your Free Strategy Call â
          </a>
        </div>
      </div>

      {/* ===== NAV â minimal ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur-xl border-b border-[#eee]/60">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            <span className="text-[#111]">viral</span>
            <span className="text-red-600">vizions</span>
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("nav")}
            className="bg-[#111] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors"
          >
            Book free call
          </a>
        </div>
      </nav>

      {/* ===== HERO â Problem-Agitate ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          {/* Social proof bar */}
          <div className="fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <div className="inline-flex items-center gap-2.5 bg-[#111] text-white text-xs font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>80+ businesses scaled Â· $2M+ revenue generated</span>
            </div>
          </div>

          {/* Headline â Problem First */}
          <div className="fade-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight max-w-4xl" style={{ letterSpacing: "-0.03em" }}>
              Your content gets views.
              <br />
              <span className="italic text-red-600">But does it get customers?</span>
            </h1>
          </div>

          {/* Subhead â Agitate */}
          <div className="fade-up" style={{ animationDelay: "0.7s", animationFillMode: "both" }}>
            <p className="text-[#555] text-lg md:text-xl max-w-2xl mt-7 leading-relaxed font-light">
              Most businesses are posting content that gets likes from the wrong audience.
              Meanwhile, your competitors are using content to steal the customers that should be yours.
            </p>
          </div>

          {/* CTA */}
          <div className="fade-up mt-10" style={{ animationDelay: "1s", animationFillMode: "both" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("hero")}
              className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
            >
              Get Your Free Growth Blueprint
              <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
            </a>
            <p className="text-[#aaa] text-[13px] mt-4 font-light">
              Free 30-min strategy call Â· No commitment Â· We&apos;ll show you exactly what to fix
            </p>
          </div>
        </div>
      </section>

      {/* ===== PAIN SECTION â "Is this you?" ===== */}
      <section className="py-16 md:py-24 bg-[#f5f4f2]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-3">Sound familiar?</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-12" style={{ letterSpacing: "-0.02em" }}>
              You&apos;re posting content â but the phone <span className="italic text-[#999]">isn&apos;t ringing.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: "ð±",
                pain: "You post 3-4x a week but can't tell if it's actually bringing customers",
                cost: "Every post without strategy = money and time wasted",
              },
              {
                icon: "ð©",
                pain: "You've tried hiring a freelancer or doing it yourself â the content looks amateur",
                cost: "Bad content actively pushes customers to your competitors",
              },
              {
                icon: "â°",
                pain: "You're spending 10+ hours a week on content when you should be running your business",
                cost: "Your highest-value time is being burned on the wrong activities",
              },
              {
                icon: "ð",
                pain: "Your competitors are growing on TikTok/IG while you're falling behind",
                cost: "Every month you wait, they capture more of YOUR audience",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 md:p-8 hover-lift transition-all">
                  <span className="text-2xl mb-4 block">{item.icon}</span>
                  <p className="font-semibold text-[15px] text-[#111] leading-snug mb-2">
                    {item.pain}
                  </p>
                  <p className="text-red-600/70 text-[13px] font-medium">{item.cost}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROOF BAR ===== */}
      <section className="py-14 md:py-20 border-y border-[#eee]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { n: 50, s: "M+", label: "Views generated" },
              { n: 2, p: "$", s: "M+", label: "Revenue driven" },
              { n: 80, s: "+", label: "Businesses served" },
              { n: 20, s: "%+", label: "Avg. sales increase" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#111]">
                    <Counter target={stat.n} prefix={stat.p || ""} suffix={stat.s} />
                  </div>
                  <p className="text-[#aaa] text-[12px] font-medium tracking-[0.08em] uppercase mt-2">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE SOLUTION â DNA Blueprint ===== */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-red-600 mb-3">The Solution</p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight max-w-3xl" style={{ letterSpacing: "-0.02em" }}>
              The DNA Blueprint:
              <br />
              <span className="italic text-[#999]">a content system that brings customers.</span>
            </h2>
            <p className="text-[#666] text-lg mt-6 max-w-xl leading-relaxed font-light">
              Not random posts. Not trends-chasing. A complete done-for-you content system engineered to drive actual revenue to your business.
            </p>
          </Reveal>

          {/* 3 Phases */}
          <div className="mt-16 md:mt-24 space-y-0">
            {[
              {
                num: "01",
                title: "Discover Your DNA",
                what: "We study your business, audience, and competitors to find the exact angle that makes customers choose you.",
                outcome: "You get a custom content strategy built around YOUR specific business â not generic templates.",
                time: "Week 1",
              },
              {
                num: "02",
                title: "Script Â· Film Â· Post",
                what: "8 videos/month. Each one scripted to attract, build trust, or convert. We handle filming, editing, posting.",
                outcome: "Your brand shows up consistently with professional content that actually speaks to your customers.",
                time: "Every month",
              },
              {
                num: "03",
                title: "Track Â· Optimise Â· Scale",
                what: "We measure what drives real customers â not vanity views. We double down on winners and kill what doesn't work.",
                outcome: "By month 3, the system compounds. More views, more trust, more customers â on autopilot.",
                time: "Ongoing",
              },
            ].map((phase, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className={`flex flex-col md:flex-row gap-6 md:gap-12 py-10 ${i !== 2 ? "border-b border-[#eee]" : ""}`}>
                  <div className="md:w-1/6 flex-shrink-0">
                    <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">{phase.num}</span>
                    <p className="text-[#bbb] text-xs mt-1">{phase.time}</p>
                  </div>
                  <div className="md:w-2/6 flex-shrink-0">
                    <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{phase.title}</h3>
                  </div>
                  <div className="md:w-3/6">
                    <p className="text-[#666] text-[15px] leading-relaxed">{phase.what}</p>
                    <p className="text-[#111] text-[14px] font-semibold mt-3 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">â</span>
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* "Your only job" */}
          <Reveal delay={400}>
            <div className="mt-16 bg-[#111] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[120px]" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="font-serif text-2xl md:text-3xl italic tracking-tight">
                    Your only commitment: <span className="text-red-400 not-italic font-semibold">2 hours/month.</span>
                  </p>
                  <p className="text-[#777] text-[15px] mt-2">Show up. Record. We handle everything else.</p>
                </div>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCTA("solution")}
                  className="group bg-white text-[#111] px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-red-50 transition-all flex-shrink-0 inline-flex items-center gap-2"
                >
                  See if you qualify
                  <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CASE STUDIES â Social Proof ===== */}
      <section className="py-20 md:py-32 bg-[#111] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/3 rounded-full blur-[150px]" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">
          <Reveal>
            <p className="text-red-500 text-[13px] font-semibold tracking-[0.2em] uppercase mb-3">Real Results</p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              They were in your exact position.
              <br />
              <span className="italic text-[#555]">Here&apos;s what happened.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-14 md:mt-20">
            {[
              {
                name: "SCCP",
                tag: "F&B â Hawker",
                before: "New stall, zero following, zero customers",
                after: "$120K opening month",
                stat: "2M+ views",
                quote: "They didn't just make us visible. They made us the talk of the town.",
              },
              {
                name: "Zaky Travel",
                tag: "Travel Agency",
                before: "Thought content only works for food businesses",
                after: "$50K from retargeting alone",
                stat: "300K+ views",
                quote: "100 leads. Dia faham our community.",
              },
              {
                name: "Ashes Burnnit",
                tag: "F&B â Restaurant",
                before: "Growth had completely flatlined",
                after: "1,000+ new customers",
                stat: "1.2M views",
                quote: "People come in saying 'I saw you on TikTok.'",
              },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-7 md:p-8 h-full flex flex-col hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="font-bold text-lg tracking-tight">{c.name}</p>
                      <p className="text-[#666] text-xs">{c.tag}</p>
                    </div>
                    <span className="text-red-400 text-xs font-semibold bg-red-400/10 px-3 py-1 rounded-full">{c.stat}</span>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3">
                      <span className="text-[#555] text-xs font-semibold uppercase tracking-wider mt-0.5 flex-shrink-0 w-14">Before</span>
                      <p className="text-[#777] text-[14px] leading-relaxed">{c.before}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xs font-semibold uppercase tracking-wider mt-0.5 flex-shrink-0 w-14">After</span>
                      <p className="text-white font-semibold text-[15px]">{c.after}</p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/[0.08]">
                    <p className="text-[#888] text-[13px] italic leading-relaxed">&ldquo;{c.quote}&rdquo;</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* More proof */}
          <Reveal delay={400}>
            <p className="text-[#444] text-sm mt-10 text-center">
              Also: OkamiClo Â· Star Soccer Â· theBrulee Â· Charrbo Â· Whiskdom Â· Smash Jr Â· and 70+ more.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY US â Cultural Edge ===== */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#999] mb-3">Why ViralVizions</p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight max-w-3xl" style={{ letterSpacing: "-0.02em" }}>
              We don&apos;t just make content.
              <br />
              <span className="italic text-[#999]">We understand your customer.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 mt-14">
            {[
              {
                title: "We ARE your customer",
                body: "Malay. Muslim. Singaporean. When we script content for your mee rebus stall, we don't need a research report â we've been eating there since we were kids. That cultural understanding is worth more than any agency playbook.",
                highlight: true,
              },
              {
                title: "Revenue guarantee",
                body: "20% sales increase by month 3 â or we keep working for free until you hit it. No other agency in Singapore puts their money where their mouth is like this.",
                highlight: false,
              },
              {
                title: "Complete lepas tangan",
                body: "Scripting, filming, editing, posting, strategy, tracking â all handled. You show up 2 hours a month. That's it. Run your business. We'll run your content.",
                highlight: false,
              },
              {
                title: "80+ businesses trust us",
                body: "F&B, travel, sports, fashion, education, services. We've driven $2M+ in tracked revenue. The system works across every industry.",
                highlight: false,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`rounded-2xl p-7 md:p-8 h-full transition-all ${
                    item.highlight
                      ? "bg-red-600 text-white"
                      : "bg-[#f5f4f2] hover:bg-[#eeedeb]"
                  }`}
                >
                  <h3 className={`font-semibold text-lg tracking-tight mb-3 ${item.highlight ? "text-white" : "text-[#111]"}`}>
                    {item.title}
                  </h3>
                  <p className={`text-[15px] leading-relaxed ${item.highlight ? "text-red-100" : "text-[#888]"}`}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE OFFER ===== */}
      <section className="py-20 md:py-32 bg-[#f5f4f2]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-red-600 text-[13px] font-semibold tracking-[0.2em] uppercase mb-3">What You Get</p>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                Everything included.
                <br />
                <span className="italic text-[#999]">Nothing to figure out.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-sm">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-serif text-5xl md:text-6xl tracking-tight">$4K,/span>
                <span className="text-[#999] text-[15px]">/month</span>
              </div>
              <p className="text-[#aaa] text-sm mb-10">3-month minimum engagement</p>

              <div className="space-y-4">
                {[
                  "Custom content strategy built around YOUR business DNA",
                  "8 professionally scripted & edited videos per month",
                  "Professional filming sessions (you only need 2 hours/month)",
                  "Full posting management across TikTok & Instagram",
                  "Weekly performance tracking & optimisation",
                  "Monthly strategy reviews with our content lead",
                  "Dedicated team: strategist + scriptwriter + editor",
                  "20% sales increase guarantee by month 3",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">â</span>
                    <p className="text-[#444] text-[15px]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[#eee]">
                <div className="bg-red-50 rounded-xl p-5 mb-8">
                  <p className="text-red-700 font-semibold text-[14px] mb-1">The guarantee</p>
                  <p className="text-red-600/70 text-[13px] leading-relaxed">
                    If we don&apos;t deliver a 20% increase in sales by month 3, we keep working for free until we do. Zero risk on your end.
                  </p>
                </div>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCTA("offer")}
                  className="group w-full bg-red-600 text-white py-4 rounded-full text-[15px] font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-600/20"
                >
                  Claim Your Free Strategy Call
                  <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
                </a>
                <p className="text-[#bbb] text-[12px] text-center mt-4">
                  Limited spots â we only take on clients we know we can help
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOUNDER â Trust ===== */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="w-16 h-16 rounded-full bg-[#111] mb-8 flex items-center justify-center">
                <span className="text-white font-serif text-xl italic">K</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
                A message from our founder.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="text-[#555] text-[15px] leading-relaxed space-y-4">
                <p>
                  I started ViralVizions during my double degree at SMU. I was doing FoodPanda deliveries between lectures. No connections, no money, no team.
                </p>
                <p>
                  Today we&apos;ve worked with 80+ businesses, generated 50M+ views, and driven $2M+ in revenue for our clients. But the thing I&apos;m most proud of? We&apos;ve stayed rooted in our community.
                </p>
                <p className="font-semibold text-[#111]">
                  The call is free. 30 minutes. I&apos;ll personally look at your business and tell you exactly what I&apos;d do â whether you hire us or not. If we can help, I&apos;ll tell you how. If we can&apos;t, I&apos;ll tell you that too.
                </p>
                <p className="text-[#999]">
                  â Khai, Founder & CEO
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FAQ â Objection Handling ===== */}
      <section className="py-20 md:py-32 border-t border-[#eee]">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-12" style={{ letterSpacing: "-0.02em" }}>
              Questions we get <span className="italic text-[#999]">every time.</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                q: "Is this only for F&B businesses?",
                a: "No. We've driven results across travel, sports, fashion, education, services, and more. The DNA Blueprint is a system â it works because it's built around YOUR specific business, not a generic template.",
              },
              {
                q: "$4K/month â is it worth it?",
                a: "One new customer from content pays for the entire month for most businesses. Our average client sees a 20%+ increase in sales. The question isn't whether you can afford it â it's whether you can afford to keep losing customers to competitors who ARE doing content.",
              },
              {
                q: "What if it doesn't work?",
                a: "Then we work for free. 20% sales increase by month 3, or we don't stop until you get it. We're the only agency in Singapore that guarantees results with skin in the game.",
              },
              {
                q: "I've been burned by agencies before.",
                a: "Most agencies sell views and followers. We sell revenue. We don't hide behind vanity metrics â we track actual customers walking through your door. And our guarantee means we literally can't get paid unless you grow.",
              },
              {
                q: "How much of my time does this take?",
                a: "2 hours per month for filming. That's your entire commitment. We handle scripting, editing, posting, strategy, and tracking. You run your business. We run your content.",
              },
              {
                q: "What happens on the strategy call?",
                a: "30 minutes. Free. We look at your business, your content, your competitors. We tell you exactly what's broken, what we'd fix, and whether we can actually help. No hard sell. If we're not the right fit, we'll tell you.",
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group border-b border-[#eee] py-5 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-[15px] text-[#111] list-none pr-4">
                    {faq.q}
                    <span className="text-[#ccc] group-open:rotate-45 transition-transform duration-300 text-xl ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="text-[#777] text-[14px] leading-relaxed mt-4 pr-8">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA â Urgency ===== */}
      <section className="py-24 md:py-40 bg-[#111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/8 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-10 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              Every day you wait,
              <br />
              <span className="italic text-red-500">your competitors grow.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[#777] text-lg mt-8 max-w-lg mx-auto leading-relaxed font-light">
              The businesses winning on TikTok and Instagram right now started when they saw the opportunity. This is yours.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 space-y-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA("final")}
                className="group bg-red-600 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-red-700 transition-all inline-flex items-center gap-3 shadow-lg shadow-red-600/25"
              >
                Book Your Free Strategy Call
                <span className="inline-block transition-transform group-hover:translate-x-1">â</span>
              </a>
              <p className="text-[#555] text-sm">
                Free Â· 30 minutes Â· No obligation
              </p>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <p className="text-[#333] mt-12 text-sm italic font-serif">Bismillah. Let&apos;s build.</p>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 bg-[#0a0a0a] text-[#555]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">viral</span>
                <span className="text-red-600">vizions</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.tiktok.com/@viralvizions" target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition">TikTok</a>
              <a href="https://www.instagram.com/viralvizions_/" target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition">Instagram</a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition">WhatsApp</a>
              <a href="/" className="text-[12px] hover:text-white transition">Home</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#1a1a1a] text-center">
            <p className="text-[11px] text-[#333]">Â© 2026 ViralVizions. Part of Okami Holdings Pte Ltd. Singapore.</p>
          </div>
        </div>
      </footer>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-16 md:hidden bg-[#0a0a0a]" />
    </div>
  );
}
