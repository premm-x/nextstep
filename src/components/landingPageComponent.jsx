

export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg: #0a0a0a;
    --bg-secondary: #111111;
    --bg-card: #1a1a1a;
    --border: rgba(255,255,255,0.08);
    --border-hover: rgba(255,255,255,0.15);
    --text-primary: #ffffff;
    --text-secondary: rgba(255,255,255,0.5);
    --text-muted: rgba(255,255,255,0.3);
    --accent: #0055ff;
    --accent-hover: #1a6aff;
    --accent-light: rgba(0,85,255,0.15);
    --radius: 12px;
    --radius-sm: 8px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .framer-app {
    min-height: 100vh;
  }

  /* ========== NAV ========== */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 24px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.5px;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 450;
    padding: 6px 10px;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
  }

  .nav-links a:hover {
    color: white;
    background: rgba(255,255,255,0.06);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-ghost {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 450;
    padding: 7px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
    font-family: inherit;
  }

  .btn-ghost:hover {
    color: white;
    background: rgba(255,255,255,0.06);
  }

  .btn-primary {
    background: white;
    border: none;
    color: black;
    font-size: 14px;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    font-family: inherit;
  }

  .btn-primary:hover {
    background: rgba(255,255,255,0.9);
    transform: translateY(-1px);
  }

  /* ========== HERO ========== */
  .hero {
    padding-top: 140px;
    padding-bottom: 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(ellipse, rgba(0,85,255,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 5px 14px 5px 6px;
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 28px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .hero-badge:hover {
    border-color: var(--border-hover);
  }

  .hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00d4aa;
    display: inline-block;
  }

  .hero-badge-tag {
    background: rgba(0,85,255,0.25);
    color: #4d8fff;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .hero-heading {
    font-size: clamp(44px, 7vw, 80px);
    font-weight: 750;
    letter-spacing: -3px;
    line-height: 1.0;
    margin-bottom: 24px;
    color: white;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-subtext {
    font-size: 17px;
    color: var(--text-secondary);
    max-width: 480px;
    margin: 0 auto 36px;
    line-height: 1.6;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn-hero-primary {
    background: white;
    color: #000;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
  }

  .btn-hero-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255,255,255,0.15);
  }

  .btn-hero-secondary {
    background: rgba(255,255,255,0.06);
    color: white;
    border: 1px solid var(--border);
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-hero-secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: var(--border-hover);
  }

  /* ========== MARQUEE / GALLERY ========== */
  .gallery-section {
    padding: 60px 0 0;
    overflow: hidden;
    position: relative;
  }

  .marquee-row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    animation: marqueeLeft 35s linear infinite;
    width: max-content;
  }

  .marquee-row:nth-child(2) {
    animation: marqueeRight 40s linear infinite;
  }

  .marquee-row:nth-child(3) {
    animation: marqueeLeft 30s linear infinite;
  }

  @keyframes marqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes marqueeRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .gallery-card {
    width: 280px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    position: relative;
  }

  .gallery-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .gallery-card:hover img {
    transform: scale(1.05);
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 60%, rgba(0,0,0,0.3));
    pointer-events: none;
  }

  /* Gallery fade edges */
  .gallery-section::before,
  .gallery-section::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    z-index: 2;
    pointer-events: none;
  }
  .gallery-section::before {
    left: 0;
    background: linear-gradient(to right, var(--bg), transparent);
  }
  .gallery-section::after {
    right: 0;
    background: linear-gradient(to left, var(--bg), transparent);
  }

  /* ========== LOGOS ========== */
  .logos-section {
    padding: 80px 24px 60px;
    text-align: center;
  }

  .logos-label {
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-bottom: 32px;
    text-transform: uppercase;
  }

  .logos-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }

  .logo-item {
    color: rgba(255,255,255,0.2);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.5px;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .logo-item:hover {
    color: rgba(255,255,255,0.5);
  }

  /* ========== FEATURES ========== */
  .features-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #0055ff;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .section-heading {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 730;
    letter-spacing: -2px;
    line-height: 1.05;
    margin-bottom: 16px;
    max-width: 560px;
  }

  .section-subtext {
    font-size: 16px;
    color: var(--text-secondary);
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: 60px;
  }

  .features-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 48px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0;
  }

  .tab-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    padding: 10px 18px;
    cursor: pointer;
    font-family: inherit;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.15s, border-color 0.15s;
  }

  .tab-btn.active {
    color: white;
    border-bottom-color: white;
  }

  .tab-btn:hover:not(.active) {
    color: rgba(255,255,255,0.7);
  }

  .feature-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  @media (max-width: 768px) {
    .feature-content {
      grid-template-columns: 1fr;
    }
    .nav-links { display: none; }
  }

  .feature-text h3 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
    margin-bottom: 16px;
  }

  .feature-text p {
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 1.65;
    margin-bottom: 28px;
  }

  .feature-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 2px;
    transition: border-color 0.2s;
  }

  .feature-link:hover {
    border-color: white;
  }

  .feature-visual {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* AI Feature mockup */
  .ai-mockup {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }

  .ai-mockup::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(0,85,255,0.15) 0%, transparent 70%);
  }

  .ai-chat-bubble {
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--text-secondary);
    max-width: 80%;
  }

  .ai-chat-bubble.ai {
    background: var(--accent-light);
    border-color: rgba(0,85,255,0.2);
    color: #6699ff;
    align-self: flex-end;
    margin-left: auto;
  }

  .ai-result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
  }

  .ai-result-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--text-muted);
  }

  /* Design mockup */
  .design-mockup {
    width: 100%;
    height: 100%;
    padding: 16px;
    position: relative;
  }

  .canvas-frame {
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.02);
    border-radius: 8px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .canvas-element {
    position: absolute;
    border-radius: 6px;
  }

  .elem-hero {
    top: 15%;
    left: 10%;
    right: 10%;
    height: 30%;
    background: linear-gradient(135deg, rgba(0,85,255,0.2), rgba(120,0,255,0.15));
    border: 1px solid rgba(0,85,255,0.2);
  }

  .elem-card-1 {
    top: 55%;
    left: 10%;
    width: 35%;
    height: 28%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
  }

  .elem-card-2 {
    top: 55%;
    left: 55%;
    width: 35%;
    height: 28%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
  }

  .selection-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 45%;
    border: 2px solid #0055ff;
    border-radius: 6px;
    pointer-events: none;
  }

  .selection-handle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
    border: 2px solid #0055ff;
    border-radius: 2px;
  }

  .sh-tl { top: -4px; left: -4px; }
  .sh-tr { top: -4px; right: -4px; }
  .sh-bl { bottom: -4px; left: -4px; }
  .sh-br { bottom: -4px; right: -4px; }

  /* ========== STATS SECTION ========== */
  .stats-section {
    padding: 80px 24px;

  }

  .stats-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-number {
    font-size: 48px;
    font-weight: 750;
    letter-spacing: -2px;
    color: white;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 400;
  }

  /* ========== CMS SECTION ========== */
  .cms-section {
    padding: 100px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .cms-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }

  @media (max-width: 768px) {
    .cms-grid { grid-template-columns: 1fr; }
  }

  .cms-table {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .cms-table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 0;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cms-table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    align-items: center;
    transition: background 0.15s;
  }

  .cms-table-row:last-child { border-bottom: none; }

  .cms-table-row:hover {
    background: rgba(255,255,255,0.03);
  }

  .cms-thumbnail {
    width: 36px;
    height: 28px;
    border-radius: 4px;
    background: linear-gradient(135deg, #1a2a4a, #0a1530);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .cms-title-cell {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }

  .cms-date {
    color: var(--text-muted);
    font-size: 12px;
  }

  .cms-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 500;
    background: rgba(0,85,255,0.15);
    color: #4d8fff;
  }

  .cms-badge.green {
    background: rgba(0,200,100,0.15);
    color: #00c864;
  }

  .cms-badge.purple {
    background: rgba(120,0,255,0.15);
    color: #9b6fff;
  }

  /* ========== COLLAB SECTION ========== */
  .collab-section {
    padding: 80px 24px;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
  }

  .collab-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  @media (max-width: 768px) {
    .collab-inner { grid-template-columns: 1fr; }
  }

  .avatar-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .collab-cursor {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 6px 14px 6px 8px;
    font-size: 12px;
    width: fit-content;
    position: relative;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .cursor-dot.blue { background: #0055ff; }
  .cursor-dot.green { background: #00c864; }
  .cursor-dot.orange { background: #ff6b35; }

  .collab-mockup-screen {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 16/10;
    position: relative;
  }

  .collab-screen-inner {
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .collab-page-preview {
    width: 60%;
    height: 80%;
    background: rgba(255,255,255,0.04);
    border-radius: 8px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .preview-header {
    height: 12px;
    background: rgba(255,255,255,0.06);
    border-bottom: 1px solid var(--border);
  }

  .preview-body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .preview-line {
    height: 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);
  }

  .preview-line.short { width: 60%; }
  .preview-line.medium { width: 80%; }

  .cursor-indicator {
    position: absolute;
    display: flex;
    align-items: flex-start;
    gap: 4px;
    animation: float 3s ease-in-out infinite;
  }

  .cursor-indicator-1 {
    top: 30%;
    left: 20%;
    animation-delay: 0s;
  }

  .cursor-indicator-2 {
    bottom: 25%;
    right: 20%;
    animation-delay: 1.5s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(4px, -4px); }
  }

  .cursor-arrow {
    width: 16px;
    height: 16px;
  }

  .cursor-label {
    background: #0055ff;
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    white-space: nowrap;
    margin-top: 14px;
  }

  .cursor-label.green-bg { background: #00c864; }

  /* ========== PRICING SECTION ========== */
  .pricing-section {
    padding: 100px 24px;
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  .pricing-toggle {
    display: inline-flex;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 4px;
    gap: 2px;
    margin-bottom: 60px;
  }

  .toggle-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    padding: 7px 18px;
    border-radius: 100px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
  }

  .toggle-btn.active {
    background: white;
    color: black;
    font-weight: 600;
  }

  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    text-align: left;
  }

  @media (max-width: 900px) {
    .pricing-cards { grid-template-columns: 1fr; }
  }

  .pricing-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    position: relative;
    transition: border-color 0.2s;
  }

  .pricing-card:hover {
    border-color: var(--border-hover);
  }

  .pricing-card.featured {
    border-color: rgba(0,85,255,0.4);
    background: rgba(0,85,255,0.05);
  }

  .pricing-card.featured::before {
    content: 'Popular';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #0055ff;
    color: white;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 14px;
    border-radius: 100px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .price-plan {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  }

  .price-amount {
    font-size: 40px;
    font-weight: 750;
    letter-spacing: -2px;
    margin-bottom: 4px;
  }

  .price-period {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  .price-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .price-cta {
    display: block;
    width: 100%;
    padding: 11px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
    transition: all 0.15s;
    text-decoration: none;
    margin-bottom: 24px;
  }

  .price-cta.outlined {
    background: transparent;
    border: 1px solid var(--border);
    color: white;
  }

  .price-cta.outlined:hover {
    background: rgba(255,255,255,0.06);
    border-color: var(--border-hover);
  }

  .price-cta.solid {
    background: white;
    border: 1px solid transparent;
    color: black;
  }

  .price-cta.solid:hover {
    background: rgba(255,255,255,0.9);
  }

  .price-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .price-features li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .check-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(0,200,100,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #00c864;
    font-size: 10px;
  }

  /* ========== TESTIMONIALS ========== */
  .testimonials-section {
    padding: 80px 24px;
  }

  .testimonials-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 60px;
  }

  @media (max-width: 900px) {
    .testimonials-grid { grid-template-columns: 1fr; }
  }

  .testimonial-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: border-color 0.2s;
  }

  .testimonial-card:hover {
    border-color: var(--border-hover);
  }

  .testimonial-text {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.8);
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: auto;
  }

  .author-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0055ff, #7800ff);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: white;
  }

  .author-name {
    font-size: 13px;
    font-weight: 600;
  }

  .author-title {
    font-size: 12px;
    color: var(--text-muted);
  }

  /* ========== CTA SECTION ========== */
  .cta-section {
    padding: 120px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(0,85,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-heading {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 750;
    letter-spacing: -2.5px;
    line-height: 1.05;
    margin-bottom: 24px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-subtext {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 36px;
  }

  /* ========== FOOTER ========== */
  .footer {
    border-top: 1px solid var(--border);
    padding: 60px 24px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr);
    gap: 40px;
    margin-bottom: 60px;
  }

  @media (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  .footer-brand p {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-top: 12px;
    max-width: 240px;
  }

  .footer-col h4 {
    font-size: 13px;
    font-weight: 600;
    color: white;
    margin-bottom: 16px;
  }

  .footer-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-col ul li a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 13px;
    transition: color 0.15s;
  }

  .footer-col ul li a:hover {
    color: rgba(255,255,255,0.7);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  .footer-copyright {
    font-size: 12px;
    color: var(--text-muted);
  }

  .footer-social {
    display: flex;
    gap: 16px;
  }

  .footer-social a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 13px;
    transition: color 0.15s;
  }

  .footer-social a:hover {
    color: rgba(255,255,255,0.7);
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
`;

// logo SVG
export const NLogo = () => (
    <svg className="logo-icon" viewBox="0 0 28 28" fill="none">
        {/* Left vertical bar */}
        <rect x="6" y="5" width="5" height="18" fill="white" />

        {/* Diagonal middle */}
        <path d="M11 5 L18 23 L14 23 L7 5 Z" fill="rgba(255,255,255,0.6)" />

        {/* Right vertical bar */}
        <rect x="17" y="5" width="5" height="18" fill="rgba(255,255,255,0.3)" />
    </svg>
);

export const GALLERY_IMAGES = [
    { bg: "linear-gradient(135deg, #0f1729, #1a2b4a)", label: "SaaS Dashboard" },
    { bg: "linear-gradient(135deg, #1a0a2e, #2d1b4e)", label: "Portfolio" },
    { bg: "linear-gradient(135deg, #0a1f0a, #1a3a1a)", label: "E-commerce" },
    { bg: "linear-gradient(135deg, #2a1a0a, #4a2d0a)", label: "Agency" },
    { bg: "linear-gradient(135deg, #1a1a2e, #2d2d4e)", label: "Tech Startup" },
    { bg: "linear-gradient(135deg, #2e0a0a, #4e1a1a)", label: "Blog" },
    { bg: "linear-gradient(135deg, #0a2a2a, #1a4a4a)", label: "Creative Studio" },
    { bg: "linear-gradient(135deg, #2a0a2a, #4a1a4a)", label: "Mobile App" },
];

export const GALLERY_ROW_2 = [
    { bg: "linear-gradient(135deg, #0d1b2a, #1e3a5f)", label: "Consulting" },
    { bg: "linear-gradient(135deg, #1a2e0a, #2e4a1a)", label: "Fintech" },
    { bg: "linear-gradient(135deg, #2e2a0a, #4e421a)", label: "Healthcare" },
    { bg: "linear-gradient(135deg, #0a2e2a, #1a4e42)", label: "Education" },
    { bg: "linear-gradient(135deg, #2a0a1a, #4a1a2e)", label: "Media" },
    { bg: "linear-gradient(135deg, #1a0a2e, #3a1a4e)", label: "NFT" },
    { bg: "linear-gradient(135deg, #0a1a2e, #1a2e4e)", label: "Analytics" },
    { bg: "linear-gradient(135deg, #2a1a0a, #4a2e1a)", label: "Social" },
];

export const GalleryCard = ({ bg, label }) => (
    <div className="gallery-card">
        <div style={{ width: "100%", height: "100%", background: bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", padding: "16px" }}>
            {/* Mock website layout */}
            <div style={{ height: "12px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", marginBottom: "10px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flex: 1 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.06)" }} />
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.06)" }} />
            </div>
            <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                <div style={{ height: "6px", width: "60%", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }} />
                <div style={{ height: "6px", width: "30%", background: "rgba(255,255,255,0.04)", borderRadius: "3px" }} />
            </div>
            <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,85,255,0.3)", borderRadius: "6px", padding: "4px 10px", fontSize: "10px", color: "#6699ff", fontWeight: 600 }}>
                {label}
            </div>
        </div>
        <div className="gallery-overlay" />
    </div>
);

export const FeatureVisualAI = () => (
    <div className="feature-visual">
        <div className="ai-mockup">
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Wireframer AI</div>
            <div className="ai-chat-bubble">
                Create three landing page concepts for a dark mode design studio
            </div>
            <div className="ai-chat-bubble ai">
                Generated 3 unique landing pages ✓
            </div>
            <div className="ai-result-grid">
                {["Landing Page 1", "Landing Page 2", "Landing Page 3"].map((label, i) => (
                    <div key={i} className="ai-result-card" style={{ background: i === 1 ? "rgba(0,85,255,0.08)" : undefined, border: i === 1 ? "1px solid rgba(0,85,255,0.2)" : undefined }}>
                        <div>
                            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>{label}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                {[70, 50, 80, 40].map((w, j) => (
                                    <div key={j} style={{ height: "4px", width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "auto", padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Ask AI to modify...</span>
                <div style={{ marginLeft: "auto", background: "#0055ff", borderRadius: "5px", padding: "3px 10px", fontSize: "11px", color: "white", fontWeight: 600 }}>Send</div>
            </div>
        </div>
    </div>
);

export const FeatureVisualDesign = () => (
    <div className="feature-visual">
        <div className="design-mockup">
            <div className="canvas-frame">
                <div className="canvas-element elem-hero" />
                <div className="canvas-element elem-card-1" />
                <div className="canvas-element elem-card-2" />
                <div className="selection-box">
                    <div className="selection-handle sh-tl" />
                    <div className="selection-handle sh-tr" />
                    <div className="selection-handle sh-bl" />
                    <div className="selection-handle sh-br" />
                </div>
                {/* Toolbar at top */}
                <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "4px", background: "rgba(30,30,30,0.95)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px 8px" }}>
                    {["A", "⊞", "◻", "✦"].map((t, i) => (
                        <div key={i} style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: i === 1 ? "white" : "var(--text-muted)", background: i === 1 ? "rgba(255,255,255,0.1)" : "none", borderRadius: "4px" }}>{t}</div>
                    ))}
                </div>
                {/* Right panel */}
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48px", background: "rgba(20,20,20,0.9)", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "6px", padding: "8px 4px" }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", margin: "0 4px" }} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const CmsTableMock = () => {
    const items = [
        { title: "Server API", date: "Feb 12", cat: "Integration", color: "blue" },
        { title: "CMS Components", date: "Feb 10", cat: "CMS", color: "green" },
        { title: "Empty States in CMS", date: "Jan 29", cat: "CMS", color: "green" },
        { title: "Plugins 3.10: CMS", date: "Jan 28", cat: "Plugins", color: "purple" },
        { title: "January Update: Fonts", date: "Jan 22", cat: "Design", color: "blue" },
    ];

    return (
        <div className="cms-table">
            <div className="cms-table-header">
                <div>Title</div>
                <div>Date</div>
                <div>Category</div>
                <div>Slug</div>
            </div>
            {items.map((item, i) => (
                <div key={i} className="cms-table-row">
                    <div className="cms-title-cell">
                        <div className="cms-thumbnail" style={{ background: `linear-gradient(135deg, rgba(0,85,255,0.${i + 1}), rgba(120,0,255,0.${i + 1}))` }} />
                        <span style={{ fontSize: "13px" }}>{item.title}</span>
                    </div>
                    <span className="cms-date">{item.date}</span>
                    <span className={`cms-badge ${item.color}`}>{item.cat}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.title.toLowerCase().replace(/ /g, "-").slice(0, 12)}</span>
                </div>
            ))}
        </div>
    );
};

export const CollabVisual = () => (
    <div className="collab-mockup-screen">
        <div className="collab-screen-inner">
            <div className="collab-page-preview">
                <div className="preview-header" />
                <div className="preview-body">
                    <div className="preview-line medium" />
                    <div className="preview-line short" />
                    <div style={{ height: "30px", background: "rgba(0,85,255,0.1)", borderRadius: "6px", border: "1px solid rgba(0,85,255,0.15)", marginTop: "4px" }} />
                    <div className="preview-line" style={{ width: "90%" }} />
                    <div className="preview-line short" />
                </div>
            </div>
            <div className="cursor-indicator cursor-indicator-1">
                <svg className="cursor-arrow" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l8 4-4 2-2 8L2 2z" fill="#0055ff" />
                </svg>
                <div className="cursor-label">Benjamin</div>
            </div>
            <div className="cursor-indicator cursor-indicator-2">
                <svg className="cursor-arrow" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l8 4-4 2-2 8L2 2z" fill="#00c864" />
                </svg>
                <div className="cursor-label green-bg">Paul</div>
            </div>
        </div>
    </div>
);

