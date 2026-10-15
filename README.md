# ⚡ GitPulse CLI

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,24,30&height=180&section=header&text=GitPulse%20CLI&fontSize=48&fontColor=38BDF8&animation=fadeIn&fontAlignY=38&desc=Terminal%20Git%20Analytics%2C%20Code%20Churn%20%26%20Impact%20Visualizer&descAlignY=58&descSize=16" width="100%" alt="GitPulse Banner" />

<p align="center">
  <strong>Interactive terminal Git analytics, contributor impact breakdown, file churn visualizer, and commit activity heatmaps.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Environment-Node.js_CLI-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Dependencies-Zero_External_Deps-38BDF8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Platform-Windows_%7C_macOS_%7C_Linux-010101?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge" />
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> &bull;
  <a href="#-features">Features</a> &bull;
  <a href="#-command-options">Options</a> &bull;
  <a href="#-author">Author</a>
</p>

</div>

---

## 🌟 Overview

**GitPulse** is a lightning-fast, zero-dependency command-line utility that transforms any local Git repository's history into actionable visual intelligence directly inside your terminal.

Whether you're conducting a codebase audit, reviewing contributor velocity before a release, or identifying file churn hotspots, GitPulse renders clean ASCII visualizations without requiring external analytics SaaS or uploading your private source code.

---

## ⚡ Quick Start

Run it directly in **any** Git repository without installing:

```bash
npx gitpulse
```

Or install globally:

```bash
npm install -g gitpulse-cli
gitpulse
```

---

## 🚀 Key Features

* **👥 Contributor Leaderboard:** Ranked breakdown of author commits, percentage impact bars, and commit ratios.
* **🔥 File Churn & Hotspot Detection:** Identifies which source files are modified most frequently to pinpoint tech debt and potential bug clusters.
* **📈 30-Day Commit Rhythm:** ASCII frequency charts showing recent development velocity.
* **⚡ Zero External Dependencies:** Pure Node.js standard library architecture — executes in under 50ms.
* **🤖 CI/CD Ready (`--json`):** Export structured analytics JSON directly into GitHub Actions or automated reporting scripts.

---

## ⌨️ Command Options

```bash
gitpulse             # Full interactive visual audit
gitpulse --json      # Export repository metrics as structured JSON
gitpulse --help      # Show options & help reference
```

---

## 👨‍💻 Author

**Sahil Chauhan (Sahil Rajput)**
* GitHub: [@SahilRajput2266](https://github.com/SahilRajput2266)
* Email: [sahilrajput6244@gmail.com](mailto:sahilrajput6244@gmail.com)
* LinkedIn: [Sahil Chauhan](https://www.linkedin.com/in/sahil-chauhan-6bb687237)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
