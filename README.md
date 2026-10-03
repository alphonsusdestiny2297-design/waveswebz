# Waves — SME Digital Transformation & Business Websites

> **Your Business. Your Digital Home.**  
> Fast, reliable, mobile-first business websites engineered for Nigerian SMEs to establish credibility, capture qualified leads, and power customer action directly through WhatsApp.

---

## ✨ Features

- **Liquid Glass UI & Dynamic Theming**: Deep obsidian dark mode and high-visibility light mode with smooth theme toggling and zero flash on load.
- **Mobile-First Architecture**: Ultra-responsive layout engineered for low-latency smartphone browsing and emerging market networks.
- **5-Stage Customer Journey Engine**: Discovery → Understanding → Credibility → Enquiry → Action.
- **Three Service Tiers**: Launch, Growth, and AI Growth packages tailored for small and medium enterprises.
- **9-Step Engineering Pipeline**: Transparent step-by-step client process from discovery to handover.
- **Integrated WhatsApp Conversion**: Pre-filled consultation messages with context for instant 1-tap customer outreach.
- **Interactive AI Website Concierge**: Powered by Google Gemini with smart deterministic fallback guardrails for pricing, scope, and FAQ policies.
- **Full Progressive Web App (PWA) with Offline Access**:
  - Web App Manifest (`/public/manifest.json`) compliant with Android, iOS, Chrome, and Edge standards.
  - Workbox & standalone Service Worker precaching core assets for immediate offline loading.
  - In-app **Install App** button with automatic iOS Safari Share sheet modal guide.
  - Real-time offline indicator alerting users when browsing from local cache.
- **Full Social Sharing & WhatsApp Preview**: Dedicated 1200×630 OpenGraph social banner (`/public/og-image.jpg`) formatted for WhatsApp, Facebook, LinkedIn, and X link cards.
- **SEO & AI Engine Optimization**:
  - `public/robots.txt` open to Googlebot, Bingbot, Applebot, GPTBot, ClaudeBot, and PerplexityBot.
  - `public/sitemap.xml` with priority indexation for all core sections.
  - Schema.org JSON-LD structured data (`WebSite`, `ProfessionalService`, `FAQPage`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS + Custom Liquid Glass Design System
- **Icons & Assets**: Lucide Icons & Custom SVG system
- **AI Integration**: `@google/genai` TypeScript SDK (with deterministic local fallback)

---

## 🚀 Quick Start

### Prerequisites
- Node.js `20.x` or later
- npm `10.x` or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/waves-website.git
   cd waves-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables (Optional)

Create a `.env.local` file in the root directory (refer to `.env.example`):

```bash
# Optional: unlocks generative responses for the interactive AI concierge.
# If omitted, the app safely defaults to deterministic knowledge guardrails.
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🏗️ Production Build & Verification

```bash
# Run TypeScript type check
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 One-Click Deployment

### 1. Deploy on Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Vercel automatically detects Vite.
4. The included `vercel.json` ensures clean URLs and Single Page App (SPA) route rewrites without 404 errors.
5. (Optional) Add `GEMINI_API_KEY` under **Environment Variables**.
6. Click **Deploy**.

### 2. Deploy on Netlify
1. Connect your GitHub repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `public/_redirects` file automatically handles SPA routing.

### 3. Deploy on Cloudflare Pages
1. Select your GitHub repository in the Cloudflare Pages dashboard.
2. Build command: `npm run build`
3. Output directory: `dist`

### 4. Deploy on GitHub Pages
1. Go to repository **Settings** → **Pages** → Source: **GitHub Actions**.
2. Select standard Static Vite deployment.
3. The included `public/404.html` preserves path routing.

---

## 🔒 Security & Git Hygiene Audit

- ✅ **No Hardcoded Secrets**: Scanned and verified zero API keys or credentials committed in the repository.
- ✅ **Hardened `.gitignore`**: Excludes `.env*`, `node_modules/`, `dist/`, and local temporary files.
- ✅ **Deterministic Fallback**: Concierge functions safely and securely even if no environment variable is supplied.
- ✅ **Automated CI**: GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting and build checks on all pushes and PRs.

---

## 📄 License

Private & Proprietary — Waves Digital Homes. All rights reserved.
