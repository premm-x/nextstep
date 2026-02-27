import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styles, NLogo, GALLERY_IMAGES, GALLERY_ROW_2, GalleryCard, FeatureVisualAI, FeatureVisualDesign, 
  CmsTableMock, CollabVisual } from "@/components/landingPageComponent"


export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("AI");
  const [pricingPeriod, setPricingPeriod] = useState("monthly");

  const tabs = ["AI", "Resume", "Application", "Collaborate"];

  const testimonials = [
    {
      text: "The resume suggestions helped me optimize my profile for ATS systems. I switched from a support role to a developer position in just 3 months.",
      name: "Sarah Chen",
      title: "Software Developer",
      initials: "SC"
    },
    {
      text: "The personalized job recommendations saved me hours of searching. Instead of scrolling endlessly, I only saw roles that actually matched my skills.",
      name: "Marcus Johnson",
      title: "Head of Marketing, Linear",
      initials: "MJ",
      gradientFrom: "#7800ff"
    },
    {
      text: "The AI insights showed me which skills I was missing for higher-paying roles. That clarity changed my preparation strategy completely.",
      name: "Ava Williams",
      title: "Backend Developer",
      initials: "AW",
      gradientFrom: "#00c864",
      gradientTo: "#0055ff"
    }
  ];

  const renderFeatureVisual = () => {
    switch (activeTab) {
      case "AI": return <FeatureVisualAI />;
      case "Resume": return <FeatureVisualDesign />;
      case "Application": return <CmsTableMock />;
      case "Collaborate": return <CollabVisual />;
      default: return <FeatureVisualAI />;
    }
  };

  const renderFeatureText = () => {
    const content = {
      AI: {
        heading: "AI Job Matching",
        desc: "We analyze your skills and match you with the most relevant roles instantly.",
        link: "Learn about AI →"
      },
      Resume: {
        heading: "Resume Intelligence",
        desc: "Get AI suggestions to improve your resume for better ATS performance.",
        link: "Explore design features →"
      },
      Application: {
        heading: "Smart Application Strategy",
        desc: "Apply strategically with data-backed insights.",
        link: "Explore CMS →"
      },
      Collaborate: {
        heading: "Real-time collaboration",
        desc: "Whether you're collaborating on the canvas or editing copy directly on the page, updates are seamless and handoff-free. Your whole team, on the same page.",
        link: "Learn about collaboration →"
      }
    };
    const c = content[activeTab];
    return (
      <div className="feature-text">
        <h3>{c.heading}</h3>
        <p>{c.desc}</p>
        <a href="#" className="feature-link">{c.link}</a>
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="framer-app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-left">
            <a className="nav-logo">
              <NLogo />
              NexStep
            </a>
            <ul className="nav-links">
              <li><a href="#">Product</a></li>
              <li><a href="#">Teams</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Enterprise</a></li>
            </ul>
          </div>
          <div className="nav-right">
            <Link to={'/login'} className="btn-ghost">Log in</Link>
            <Link to={'/register'} className="btn-primary">Get Started</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge animate-in">
            <span className="hero-badge-dot" />
            <span className="hero-badge-tag">New</span>
            Server API — Feb 12, 2026
          </div>
          <h1 className="hero-heading animate-in delay-1">
            Land Better Jobs,<br />Faster
          </h1>
          <p className="hero-subtext animate-in delay-2">
            From skill analysis to job matching — make smarter career moves with AI.
          </p>
          <div className="hero-actions flex-col md:flex-row animate-in delay-3 ">
            <button className="btn-hero-primary">Get Started Free</button>
            <button className="btn-hero-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l6 10H2L8 1z" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              See How It Works
            </button>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery-section">
          <div className="marquee-row">
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((card, i) => (
              <GalleryCard key={i} {...card} />
            ))}
          </div>
          <div className="marquee-row">
            {[...GALLERY_ROW_2, ...GALLERY_ROW_2].map((card, i) => (
              <GalleryCard key={i} {...card} />
            ))}
          </div>
          <div className="marquee-row">
            {[...GALLERY_IMAGES.slice(4), ...GALLERY_ROW_2.slice(4), ...GALLERY_IMAGES.slice(4), ...GALLERY_ROW_2.slice(4)].map((card, i) => (
              <GalleryCard key={i} {...card} />
            ))}
          </div>
        </section>

        {/* LOGOS */}
        <section className="logos-section">
          <p className="logos-label">Trusted by teams at</p>
          <div className="logos-grid">
            {["Shopify", "Vercel", "Notion", "Linear", "Figma", "Stripe", "Loom", "Raycast"].map((name) => (
              <div key={name} className="logo-item">{name}</div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <p className="section-tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 4v4M4 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Features
          </p>
          <h2 className="section-heading">Smarter Job Search, Powered by AI</h2>
          <p className="section-subtext">Everything you need to discover, analyze, and apply with confidence.</p>

          <div className="features-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="feature-content">
            {renderFeatureText()}
            {renderFeatureVisual()}
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stats-inner">
            {[
              { num: "50K+", label: "Active Usersd" },
              { num: "200K+", label: "Jobs Indexed" },
              { num: "95%", label: "Match Accuracy" },
              { num: "2x", label: "Faster than alternatives" },
              { num: "10K+", label: "Successful Placements" }
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="testimonials-inner">
            <p className="section-tag">Stories</p>
            <h2 className="section-heading">Trusted by Job Seekers Everywhere</h2>
            <div className="testimonials-grid">
              {testimonials.map(({ text, name, title, initials, gradientFrom = "#0055ff", gradientTo = "#7800ff" }) => (
                <div key={name} className="testimonial-card">
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#FFB800", fontSize: "13px" }}>★</span>)}
                  </div>
                  <p className="testimonial-text">"{text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}>
                      {initials}
                    </div>
                    <div>
                      <div className="author-name">{name}</div>
                      <div className="author-title">{title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2 className="cta-heading">Start Your Smarter Job Search Today</h2>
          <p className="cta-subtext">Join thousands of professionals accelerating their careers with AI.</p>
          <div className="hero-actions">
            <button className="btn-hero-primary">Find Jobs Now</button>
            <button className="btn-hero-secondary">Talk to sales</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer">
            <div className="footer-grid">
              <div className="footer-brand">
                <a className="nav-logo" style={{ display: "inline-flex" }}>
                  <NLogo />
                  NexStep
                </a>
                <p>AI-powered career platform helping professionals find better jobs faster.</p>
              </div>
              {[{ title: "Product", links: ["AI Job Matching", "Resume Analyzer", "Skill Gap Insights", "Job Alerts", "Application Tracker", "Pricing"] },
              { title: "Resources", links: ["Career Blog", "Interview Preparation", "Resume Tips", "Hiring Trends", "Help Center"] },
              { title: "Company", links: ["About Us", "Careers", "Contact", "Press", "Partners"] },
              { title: "Support", links: ["FAQ", "Community", "Report an Issue", "System Status", "Privacy Policy", "Terms of Service"] }
              ].map(({ title, links }) => (
                <div key={title} className="footer-col">
                  <h4>{title}</h4>
                  <ul>
                    {links.map(link => (
                      <li key={link}><a href="#">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="footer-bottom">
              <span className="footer-copyright">© 2026 NexStep. All rights reserved.</span>
              <div className="footer-social">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
