# 🛡️ AI World Models for Predictive Cyber Defence

> **Smart India Hackathon (SIH) Prototype**  
> *From Reactive Detection to Predictive Defence*

A polished SOC-style web dashboard that demonstrates how an AI World Model can learn evolving network behaviour, simulate future states, and **predict where a cyber attack is likely to go next** — before it happens.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Open http://localhost:5173

# Production build
npm run build

# Preview production build locally
npm run preview
# → Open http://localhost:4173
```

**Requirements:** Node.js ≥ 18, npm ≥ 9

---

## 🌐 Deploy in 1 Click

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

1. Push this repository to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — click **Deploy**
4. Done. Zero config needed (`vercel.json` handles everything)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/YOUR_REPO)

1. Push to GitHub
2. Connect repo at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build` · Publish directory: `dist`
4. Done. (`netlify.toml` handles routing and headers)

### GitHub Pages (CI/CD)
The `.github/workflows/deploy.yml` workflow auto-deploys on every push to `main`:

1. Push to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Every push to `main` triggers a build and deployment

---

## 📐 Architecture

```
src/
├── data/
│   └── demoScenario.js       ← Single source of truth for all 8 pages
├── services/
│   ├── trafficService.js     ← PCAP/CSV ingestion interface (swap → FastAPI)
│   └── predictionService.js  ← World Model prediction interface (swap → FastAPI)
├── components/
│   ├── Sidebar.jsx           ← SOC navigation
│   ├── Topbar.jsx            ← Live clock, system status, quick actions
│   ├── MetricCard.jsx        ← KPI widgets
│   ├── RiskCard.jsx          ← Current situation + trajectory strip
│   ├── EarlyWarning.jsx      ← Lead-time alert card
│   ├── HowItWorks.jsx        ← Pipeline architecture diagram
│   ├── WorldModelDiagram.jsx ← LSTM/Transformer flow diagram
│   ├── NetworkStateCard.jsx  ← State vector cards (S1–S5)
│   ├── AttackTimeline.jsx    ← Multi-stage trajectory visualisation
│   ├── RiskChart.jsx         ← Recharts risk projection curve
│   ├── MitreTimeline.jsx     ← ATT&CK technique cards
│   ├── ExplainabilityChart.jsx ← SHAP feature attribution
│   └── NetworkGraph.jsx      ← Animated SVG topology map
└── pages/
    ├── Overview.jsx          ← Executive SOC dashboard (most impressive)
    ├── TrafficAnalysis.jsx   ← Traffic ingestion & flow summary
    ├── NetworkStates.jsx     ← State vector timeline (S1–S5)
    ├── WorldModel.jsx        ← Core innovation: temporal model diagram
    ├── AttackSimulation.jsx  ← K-step future simulation + risk chart
    ├── MitreAttack.jsx       ← MITRE ATT&CK mapping
    ├── Explainability.jsx    ← XAI feature attribution
    └── NetworkGraphPage.jsx  ← Network topology + attack path
```

---

## 🔬 Demo Scenario (2-Minute SIH Judge Flow)

| Step | Action |
|------|--------|
| 1 | Open **Overview** page |
| 2 | Click **"Load Demo Scenario"** |
| 3 | Click **"Start Predictive Analysis"** |
| 4 | Auto-navigates to **Network States** (S1→S5 timeline) |
| 5 | Open **World Model** — see LSTM/Transformer architecture |
| 6 | Open **Attack Simulation** — K-step: S3→S4→S5→S6 + Risk Chart |
| 7 | Open **MITRE ATT&CK** — T1046, T1110, T1021 mapping |
| 8 | Open **Explainability** — SHAP-style feature contributions |
| 9 | Open **Network Graph** — animated lateral movement path |
| 10 | **Early Warning** visible throughout: ~15 min lead time |

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Data | Local mock JSON (no backend required) |
| Build | esbuild (via Vite) |
| Deploy | Vercel / Netlify / GitHub Pages |

---

## 🔮 Future Integration Roadmap

```
PCAP / Flow CSV
      ↓
Scapy / PyShark  (Python parsing)
      ↓
Feature Extraction (Pandas / NumPy)
      ↓
World Model Training (PyTorch LSTM / Transformer)
      ↓
Explainability (SHAP)
      ↓
FastAPI Backend  ← Replace trafficService.js + predictionService.js
      ↓
React Frontend (this app — no changes needed)
```

The service layer (`src/services/`) is intentionally decoupled.  
Replacing the demo with a real FastAPI backend only requires updating the two service files.

---

## ⚠️ Important Disclaimers

- This is a **prototype/demo** for SIH — no real AI model is running
- All data is simulated to represent realistic attack telemetry
- No claims of specific accuracy or detection rates are made
- Labels like "Demo Prediction", "Projected Risk", and "Simulated" are used throughout

---

## 📄 License

MIT — Free for educational and hackathon use.
