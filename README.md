# Edoardo Tammaro – Personal Portfolio Website

A responsive, high-performance personal portfolio website built with clean semantic HTML5, modern CSS3, and vanilla JavaScript. Designed with a cyber / terminal aesthetic for recruiters, professors, and technology professionals in Cybersecurity, Artificial Intelligence, and Data Modeling.

Hosted on **GitHub Pages**: [https://edotammaro.github.io](https://edotammaro.github.io)

---

## 🚀 Features

- **Cyber / Terminal Aesthetic**: Deep dark theme with glowing cyan (`#00f3ff`) and electric green (`#00ff9d`) accents, matrix grid lines, scanlines, and terminal prompt badges.
- **Typing Animation**: Dynamic terminal cycling through core competencies:
  - *Cybersecurity*
  - *Machine Learning*
  - *SAR & Remote Sensing*
  - *Full-Stack Development*
- **Theme Switcher**: Instant Dark/Light mode toggle (`⚡` / `🌙`) stored in `localStorage`.
- **Responsive Layout**: Designed mobile-first, tested across 360px (mobile), 768px (tablet), and 1440px+ (desktop).
- **Smooth Navigation & ScrollSpy**: Sticky navigation bar with live section highlighting and smooth scrolling.
- **Zero Build Dependencies**: Pure HTML, CSS, and vanilla JS. No node modules, no Webpack/Vite build steps.
- **Accessibility & Performance First**: Semantic markup, keyboard navigation support, high contrast ratios, and strict `prefers-reduced-motion` compliance.

---

## 📁 File Structure

```text
edotammaro.github.io/
├── index.html                   # Main single-page HTML5 document
├── css/
│   └── style.css                # CSS variables, cyber terminal styling, responsive media queries
├── js/
│   └── main.js                  # Vanilla JS: typewriter effect, theme switch, ScrollSpy, mobile nav
├── assets/
│   ├── favicon.svg              # High-res SVG terminal cursor favicon
│   ├── profile.jpg              # Profile picture placeholder (can be overwritten with your photo)
│   ├── profile.svg              # SVG source for profile placeholder
│   └── CV_Tammaro_Edoardo.pdf   # Place your PDF resume here
└── README.md                    # Documentation & setup guide
```

---

## 💻 How to Run Locally

Because the project is built entirely on standard web technologies with relative URLs, you can run it locally in any of the following ways:

### Option A: VS Code Live Server
1. Open the repository folder in **VS Code**.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. It will open at `http://127.0.0.1:5500`.

### Option B: Python Local Server
Run in PowerShell / Terminal inside the project root:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option C: Direct Browser File (Offline)
Simply double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

---

## 📌 Step-by-Step GitHub Pages Deployment

1. **Initialize & Commit your code**:
   ```bash
   git add .
   git commit -m "feat: complete cyber terminal portfolio website"
   ```
2. **Push to GitHub**:
   Ensure your remote is set to your user repository (`edotammaro.github.io`):
   ```bash
   git branch -M main
   git remote add origin https://github.com/edotammaro/edotammaro.github.io.git
   git push -u origin main
   ```
3. **Verify GitHub Pages Settings**:
   - Go to your repository on GitHub: `https://github.com/edotammaro/edotammaro.github.io`
   - Navigate to **Settings** > **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main`, Folder: `/ (root)`
     - Click **Save**.
   - Your site will be published at `https://edotammaro.github.io/` in a few minutes.

---

## 📝 TODOs for Edoardo (Customization Checklist)

Here are the few personal assets you should drop in before sharing:

1. **Profile Picture**:
   - Place your real headshot / photo in `assets/profile.jpg` (or change the file extension in `index.html` line 102). A square crop (at least 600x600 px) is recommended.
2. **CV & Tesi Triennale PDF**:
   - Salva il tuo CV compilato in: `assets/CV_Tammaro_Edoardo.pdf`
   - Salva il PDF della tua tesi triennale in: `assets/Tesi_Triennale_Tammaro_Edoardo.pdf` (il pulsante "Read Thesis (.pdf)" nella sezione Projects e il link nella sezione Education punteranno subito al file).
3. **LinkedIn Profile**:
   - Tuo profilo LinkedIn configurato: `https://www.linkedin.com/in/edoardo-tammaro-3a20361b5/`
   - Telefono: `+39 3888834242` e Email: `edutammaro@gmail.com` già integrati nella sezione Contact.
4. **Additional Project Repositories**:
   - As you publish new repositories or thesis materials, update the links in the `<section id="projects">` cards.

---

## 🛡️ Privacy & Security Note

As specified in the project requirements:
- No private phone number or home address is published.
- Direct communication uses an obfuscation-friendly `mailto:edutammaro@gmail.com` link, eliminating the need for server-side forms or spam bots.
- External links use `rel="noopener noreferrer"` for tab-nabbing security.
