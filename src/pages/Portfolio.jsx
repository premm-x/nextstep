import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --border: #1e1e1e;
    --white: #ffffff;
    --gray: #888888;
    --gray-light: #aaaaaa;
    --accent: #ffffff;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    overflow-x: hidden;
  }

  /* ---- NAVBAR ---- */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 48px;
    background: transparent;
  }

  .navbar.scrolled {
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: background 0.4s;
  }

  .nav-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 26px;
    letter-spacing: 2px;
    color: var(--white);
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--white);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .nav-links a:hover {
    opacity: 1;
  }

  /* ---- HERO ---- */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--bg);
    overflow: hidden;
  }

  .hero-bg-text {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(120px, 20vw, 300px);
    font-weight: 900;
    color: rgba(255,255,255,0.025);
    letter-spacing: 20px;
    user-select: none;
    white-space: nowrap;
  }

  .hero-sub {
    font-size: 11px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 16px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.3s;
  }

  .hero-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(72px, 14vw, 180px);
    font-weight: 900;
    letter-spacing: 8px;
    line-height: 0.9;
    text-transform: uppercase;
    color: var(--white);
    text-align: center;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.5s;
  }

  .hero-role {
    font-size: 11px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--gray);
    margin-top: 20px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.7s;
  }

  .hero-social {
    position: absolute;
    left: 48px;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .hero-social a {
    color: var(--gray);
    text-decoration: none;
    font-size: 15px;
    transition: color 0.2s, transform 0.2s;
  }

  .hero-social a:hover {
    color: var(--white);
    transform: translateX(3px);
  }

  .scroll-line {
    position: absolute;
    right: 48px;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .scroll-line span {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gray);
    writing-mode: vertical-rl;
  }

  .scroll-line-bar {
    width: 1px;
    height: 60px;
    background: var(--gray);
    position: relative;
    overflow: hidden;
  }

  .scroll-line-bar::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white);
    animation: scrollLine 2s ease-in-out infinite;
  }

  /* ---- PORTFOLIO SECTION ---- */
  .portfolio {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 0 0 80px 0;
  }

  .portfolio-images {
    display: flex;
    gap: 0;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 0;
    position: relative;
    padding-top: 120px;
  }

  .portfolio-img-wrap {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s ease;
  }

  .portfolio-img-wrap:hover {
    transform: scale(1.03);
    z-index: 5;
  }

  .portfolio-img-wrap:nth-child(1) {
    width: 260px;
    height: 200px;
    border-radius: 4px;
    margin-right: -30px;
    z-index: 1;
    margin-bottom: 20px;
  }

  .portfolio-img-wrap:nth-child(2) {
    width: 220px;
    height: 260px;
    border-radius: 4px;
    z-index: 3;
  }

  .portfolio-img-wrap:nth-child(3) {
    width: 200px;
    height: 200px;
    border-radius: 4px;
    margin-left: -30px;
    z-index: 1;
    margin-bottom: 20px;
  }

  .portfolio-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1) brightness(0.85);
    transition: filter 0.4s;
    display: block;
  }

  .portfolio-img-wrap:hover img {
    filter: grayscale(80%) contrast(1.1) brightness(1);
  }

  .portfolio-content {
    text-align: center;
    margin-top: -30px;
    position: relative;
    z-index: 10;
    padding: 0 20px;
  }

  .portfolio-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(52px, 9vw, 100px);
    font-weight: 900;
    letter-spacing: 8px;
    text-transform: uppercase;
    color: var(--white);
    line-height: 1;
    margin-bottom: 14px;
  }

  .portfolio-desc {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 32px;
  }

  .btn-view {
    display: inline-block;
    border: 1px solid rgba(255,255,255,0.25);
    padding: 12px 36px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--white);
    background: transparent;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s, transform 0.2s;
    text-decoration: none;
  }

  .btn-view:hover {
    background: rgba(255,255,255,0.08);
    border-color: var(--white);
    transform: translateY(-2px);
  }

  /* ---- CONTACT SECTION ---- */
  .contact {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 80px 80px;
    position: relative;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  .contact-left h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 900;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 24px;
  }

  .contact-left p {
    font-size: 13px;
    line-height: 1.8;
    color: var(--gray);
    max-width: 340px;
    margin-bottom: 40px;
  }

  .contact-detail {
    margin-bottom: 24px;
  }

  .contact-detail h4 {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 6px;
  }

  .contact-detail p {
    font-size: 13px;
    color: var(--gray);
    margin: 0;
  }

  .contact-right h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 4vw, 60px);
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 32px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding: 14px 4px;
    font-size: 13px;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    outline: none;
    transition: border-color 0.3s;
    letter-spacing: 1px;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255,255,255,0.25);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-bottom-color: rgba(255,255,255,0.5);
  }

  .form-group textarea {
    min-height: 100px;
    resize: none;
  }

  .btn-send {
    margin-top: 16px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 14px 48px;
    font-size: 10px;
    font-weight: 600;
    font-family: 'Barlow', sans-serif;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--white);
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s, transform 0.2s;
  }

  .btn-send:hover {
    background: rgba(255,255,255,0.07);
    border-color: var(--white);
    transform: translateY(-2px);
  }

  /* ---- SHARED SIDEBAR ELEMENTS ---- */
  .sidebar-social {
    position: absolute;
    left: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sidebar-social a {
    color: var(--gray);
    font-size: 14px;
    text-decoration: none;
    transition: color 0.2s, transform 0.2s;
  }

  .sidebar-social a:hover {
    color: var(--white);
    transform: translateX(3px);
  }

  .sidebar-scroll {
    position: absolute;
    right: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .sidebar-scroll span {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gray);
    writing-mode: vertical-rl;
  }

  .sidebar-scroll-bar {
    width: 1px;
    height: 50px;
    background: rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }

  .sidebar-scroll-bar::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
    animation: scrollLine 2.5s ease-in-out infinite 0.5s;
  }

  /* ---- ANIMATIONS ---- */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scrollLine {
    0% { top: -100%; }
    50% { top: 0%; }
    100% { top: 100%; }
  }

  /* ---- NOISE TEXTURE OVERLAY ---- */
  .noise-overlay {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ---- SECTION DIVIDER ---- */
  .section-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
    margin: 0;
  }

  /* ---- CURSOR GLOW ---- */
  .cursor-glow {
    pointer-events: none;
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    z-index: 9998;
    transition: transform 0.1s linear;
  }

  /* ---- RESPONSIVE ---- */
  @media (max-width: 768px) {
    .navbar { padding: 20px 24px; }
    .hero-social, .scroll-line { display: none; }
    .contact { padding: 100px 24px 60px; }
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
    .sidebar-social, .sidebar-scroll { display: none; }
    .portfolio-img-wrap:nth-child(1) { width: 180px; height: 150px; }
    .portfolio-img-wrap:nth-child(2) { width: 160px; height: 200px; }
    .portfolio-img-wrap:nth-child(3) { width: 160px; height: 150px; }
  }
`;

// SVG icons
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleMouse = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="noise-overlay" />
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">HE</div>
        <ul className="nav-links">
          <li><a href="#portfolio">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-bg-text">HARUN</div>

        <p className="hero-sub">I AM</p>
        <h1 className="hero-name">HARUN</h1>
        <p className="hero-role">UI/UX DESIGNER</p>

        <div className="hero-social">
          <a href="#"><FacebookIcon /></a>
          <a href="#"><InstagramIcon /></a>
          <a href="#"><XIcon /></a>
        </div>

        <div className="scroll-line">
          <span>SCROLL</span>
          <div className="scroll-line-bar" />
        </div>
      </section>

      <div className="section-divider" />

      {/* PORTFOLIO SECTION */}
      <section className="portfolio" id="portfolio">
        <div style={{ position: "absolute", top: 24, left: 40 }}>
          <div className="nav-logo">HE</div>
        </div>
        <div style={{ position: "absolute", top: 24, right: 40, display: "flex", gap: 32 }}>
          <a href="#portfolio" style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Projects</a>
          <a href="#contact" style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contact</a>
        </div>

        <div className="portfolio-images">
          <div className="portfolio-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1513171920216-2640b288471b?w=400&q=80"
              alt="eye"
            />
          </div>
          <div className="portfolio-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1605852967399-8e500bac048e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="glasses"
            />
          </div>
          <div className="portfolio-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80"
              alt="couple"
            />
          </div>
        </div>

        <div className="portfolio-content">
          <h2 className="portfolio-title">MY PORTFOLİO</h2>
          <p className="portfolio-desc">HELLO, I AM HARUN ERDOĞAN UI/UX DESIGNER</p>
          <a href="#" className="btn-view">VIEW PROJECT</a>
        </div>

        <div className="sidebar-social">
          <a href="#"><FacebookIcon /></a>
          <a href="#"><InstagramIcon /></a>
          <a href="#"><XIcon /></a>
        </div>

        <div className="sidebar-scroll">
          <span>SCROLL</span>
          <div className="sidebar-scroll-bar" />
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <div style={{ position: "absolute", top: 24, left: 40 }}>
          <div className="nav-logo">HE</div>
        </div>
        <div style={{ position: "absolute", top: 24, right: 40, display: "flex", gap: 32 }}>
          <a href="#portfolio" style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Projects</a>
          <a href="#contact" style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contact</a>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div className="contact-left">
            <h2>CONTACT</h2>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.
            </p>
            <div className="contact-detail">
              <h4>Address</h4>
              <p>Hatay/İskenderun 5331 sok No 14</p>
            </div>
            <div className="contact-detail">
              <h4>E-mail</h4>
              <p>harunerdogan@gmail.com</p>
            </div>
          </div>

          {/* Right */}
          <div className="contact-right">
            <h2>CONTACT FORM</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Your phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-send">SEND MESSAGE</button>
            </form>
          </div>
        </div>

        <div className="sidebar-social">
          <a href="#"><FacebookIcon /></a>
          <a href="#"><InstagramIcon /></a>
          <a href="#"><XIcon /></a>
        </div>

        <div className="sidebar-scroll">
          <span>SCROLL</span>
          <div className="sidebar-scroll-bar" />
        </div>
      </section>
    </>
  );
}
