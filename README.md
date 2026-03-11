# Darkground Coffee — CSS Animation Showcase & Endless Loop Demo

**A real-world demo site built with vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies. No regrets.**  
This project implements the techniques from [css-animations-showcase](https://github.com/dontdevpanic/css-animations-showcase) and [vertical-fullscreen-loop-scroll](https://github.com/dontdevpanic/vertical-fullscreen-loop-scroll) in a fictional coffee roastery website.

> ⚠️ Warning: May cause CSS animation overdose. Side effects include obsessive keyframe tweaking and an inability to leave opacity at 1.


[![Live Demo](https://img.shields.io/badge/Live-Demo-5d351c)](https://dontdevpanic.github.io/darkground-coffee/)


---

## What's in the box

The site is built from modular, self-contained UI blocks. Take what you need, leave what you don't — not every project needs a team gallery, and not everything has to wiggle.

| Section | Animation / Technique | Optional |
|---|---|---|
| **Intro** | Word flash sequence (`wordFlash`) | ✓ |
| **Hero** | Steam float, brand reveal (scale + opacity) | ✓ |
| **About** | Scroll reveal (`reveal`) | ✓ |
| **Gallery** | Responsive image grid | ✓ |
| **Origin** | CSS ticker loop | ✓ |
| **Roasts** | Stagger word reveal | ✓ |
| **Visit** | Slide in left / right | ✓ |
| **Menu** | Typewriter effect | ✓ |
| **Coffee** | Card grid | ✓ |
| **Team** | Profile grid | ✓ |
| **Contact** | Soft word sequence + fade-in (`wordSoft` / `wordFinal`) | ✓ |

Everything sits inside a **clone-based endless vertical loop** — sections repeat seamlessly in both scroll directions without JavaScript scroll hijacking.

---

## Reusable layout blocks

### Split layout (2-column grid)
```html
<!-- Image left, text right -->
<div class="split-layout">
    <div class="split-media"><img src="..." alt="..."></div>
    <div class="section-inner">...</div>
</div>

<!-- Text left, image right -->
<div class="split-layout split-layout--reverse">
    <div class="section-inner">...</div>
    <div class="split-media"><img src="..." alt="..."></div>
</div>
```
Collapses to single column on mobile automatically.

### Scroll animations
Add a class, the IntersectionObserver handles the rest:
```html
<p class="reveal">Fades in on scroll</p>
<span class="stagger-item">Staggers in with siblings</span>
<span class="slide-in-left">Slides in from the left</span>
<span class="slide-in-right">Slides in from the right</span>
<span class="typewriter tw-1">Types itself out</span>
```

### Inline navigation
```html
<!-- Standard nav -->
<nav class="inline-nav" aria-label="Page navigation">
    <a href="#hero">Top</a>
    <a href="#about">About</a>
</nav>

<!-- Brand nav with logo -->
<nav class="inline-nav inline-nav--brand" aria-label="Page navigation">
    <a href="#hero" class="brand-link">
        <svg class="brand-logo" ...>...</svg>
        Your Brand Name
    </a>
</nav>
```

---

## Accessibility

- `inert` + `aria-hidden` on all clones — Tab order only runs through original sections
- `prefers-reduced-motion` respected: intro hidden, animations disabled
- `history.scrollRestoration = "manual"` — always lands on hero after reload
- Visually hidden fallback text for all animated/decorative content
- Semantic structure: `<main>`, `<nav aria-label>`, `<footer>`, `<h1>`–`<h3>` hierarchy

---

## Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Zero dependencies, zero CDN calls
- GitHub Pages ready

## Images

All images used in this demo are AI-generated and created specifically for this project. No stock photos, no licenses to worry about.

---

## DevPanicZone

Part of the [DevPanicZone](https://github.com/dontdevpanic) project collection — small tools and demos built in vanilla code, owned line by line.

---
---

# Darkground Coffee — CSS Animation Showcase & Endless Loop Demo

**Eine Demo-Seite in vanilla HTML, CSS und JavaScript. Keine Frameworks. Keine Abhängigkeiten. Keine Ausreden.**  
Dieses Projekt setzt die Techniken aus [css-animations-showcase](https://github.com/dontdevpanic/css-animations-showcase) und [vertical-fullscreen-loop-scroll](https://github.com/dontdevpanic/vertical-fullscreen-loop-scroll) in einer fiktiven Kaffeerösterei-Website um.

> ⚠️ Warnung: Kann zu CSS Animation Overdose führen. Nebenwirkungen umfassen obsessives Keyframe-Tuning und die Unfähigkeit, opacity einfach bei 1 zu lassen.


[![Live Demo](https://img.shields.io/badge/Live-Demo-red)](https://dontdevpanic.github.io/darkground-coffee/)


---

## Was steckt drin

Die Seite besteht aus modularen, eigenständigen UI-Blöcken. Nimm was du brauchst, lass den Rest — nicht jedes Projekt braucht eine Team-Galerie, und nicht alles muss sich bewegen.

| Section | Animation / Technik | Optional |
|---|---|---|
| **Intro** | Wort-Flash-Sequenz (`wordFlash`) | ✓ |
| **Hero** | Dampf-Animation, Brand-Reveal (scale + opacity) | ✓ |
| **About** | Scroll-Reveal (`reveal`) | ✓ |
| **Galerie** | Responsives Bildraster | ✓ |
| **Origin** | CSS-Ticker-Loop | ✓ |
| **Roasts** | Gestaffeltes Wort-Reveal | ✓ |
| **Visit** | Slide in links / rechts | ✓ |
| **Menu** | Typewriter-Effekt | ✓ |
| **Kaffee** | Karten-Raster | ✓ |
| **Team** | Profil-Raster | ✓ |
| **Contact** | Weiche Wortsequenz + Einblenden (`wordSoft` / `wordFinal`) | ✓ |

Alles sitzt in einem **klon-basierten Endlos-Vertikal-Loop** — Sections wiederholen sich nahtlos in beide Scroll-Richtungen, ohne JavaScript Scroll-Hijacking.

---

## Wiederverwendbare Layout-Blöcke

### Split Layout (2-Spalten-Raster)
```html
<!-- image left, text right -->
<div class="split-layout">
    <div class="split-media"><img src="..." alt="..."></div>
    <div class="section-inner">...</div>
</div>

<!-- text left, image richt -->
<div class="split-layout split-layout--reverse">
    <div class="section-inner">...</div>
    <div class="split-media"><img src="..." alt="..."></div>
</div>
```
Wechselt auf Mobile automatisch zur Einzelspalte.

### Scroll-Animationen
Klasse hinzufügen, der IntersectionObserver erledigt den Rest:
```html
<p class="reveal">Blendet beim Scrollen ein</p>
<span class="stagger-item">Staffelt sich mit Geschwistern ein</span>
<span class="slide-in-left">Gleitet von links rein</span>
<span class="slide-in-right">Gleitet von rechts rein</span>
<span class="typewriter tw-1">Tippt sich selbst aus</span>
```

### Inline-Navigation
```html
<!-- Standard-Nav -->
<nav class="inline-nav" aria-label="Page navigation">
    <a href="#hero">Top</a>
    <a href="#about">About</a>
</nav>

<!-- Brand-Nav with Logo -->
<nav class="inline-nav inline-nav--brand" aria-label="Page navigation">
    <a href="#hero" class="brand-link">
        <svg class="brand-logo" ...>...</svg>
        Dein Markenname
    </a>
</nav>
```

---

## Barrierefreiheit

- `inert` + `aria-hidden` auf allen Klonen — Tab-Reihenfolge läuft nur durch Original-Sections
- `prefers-reduced-motion` wird respektiert: Intro versteckt, Animationen deaktiviert
- `history.scrollRestoration = "manual"` — landet nach Reload immer beim Hero
- Visuell verborgener Fallback-Text für alle animierten / dekorativen Inhalte
- Semantische Struktur: `<main>`, `<nav aria-label>`, `<footer>`, `<h1>`–`<h3>` Hierarchie

---

## Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Null Abhängigkeiten, keine CDN-Aufrufe
- Direkt für GitHub Pages geeignet

## Bilder

Alle in dieser Demo verwendeten Bilder sind KI-generiert und speziell für dieses Projekt erstellt. Keine Stockfotos, keine Lizenzfragen.

---

## DevPanicZone

Teil der [DevPanicZone](https://github.com/dontdevpanic) Projektsammlung — kleine Tools und Demos in vanilla Code, jede Zeile selbst verstanden.