// ══════════════════════════════════════════════
//  CSS ANIMATIONS SHOWCASE — main.js
//  DevPanicZone | vanilla JS, no dependencies
// ══════════════════════════════════════════════

// ── Paletten — wechseln pro Loop, alle Sections betroffen ──
const palettes = [
    {
        hero: { bg: "#3d1f0d", color: "#f2e9d0" },
        sectionDark: { bg: "#2a1208", color: "#f2e9d0" },
        sectionMid: { bg: "#3d1f0d", color: "#f2e9d0" },
        sectionAccent: { bg: "#c8a96e", color: "#3d1f0d" },
        inlineNav: { bg: "#1a0c05", color: "#f2e9d0" },
    },
    {
        hero: { bg: "#f2e9d0", color: "#3d1f0d" },
        sectionDark: { bg: "#e8dfc4", color: "#3d1f0d" },
        sectionMid: { bg: "#d4c9a8", color: "#3d1f0d" },
        sectionAccent: { bg: "#3d1f0d", color: "#f2e9d0" },
        inlineNav: { bg: "#c8bfa4", color: "#3d1f0d" },
    },
    {
        hero: { bg: "#c8a96e", color: "#3d1f0d" },
        sectionDark: { bg: "#b8955a", color: "#f2e9d0" },
        sectionMid: { bg: "#3d1f0d", color: "#c8a96e" },
        sectionAccent: { bg: "#f2e9d0", color: "#3d1f0d" },
        inlineNav: { bg: "#9c7a42", color: "#f2e9d0" },
    },
];

let loopCount = 0;

// ── DOM-Referenzen ──
const main = document.getElementById("main-content");
const intro = document.getElementById("intro");

// ── INTRO ──
document.body.classList.add("intro-active");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.style.display = "none";
    document.body.classList.remove("intro-active");
} else {
    const INTRO_DURATION = 2900;

    setTimeout(() => {
        intro.classList.add("intro--exit");
        intro.addEventListener("animationend", () => {
            intro.style.display = "none";
            document.body.classList.remove("intro-active");
        }, { once: true });
    }, INTRO_DURATION);
}

// ══════════════════════════════════════════════
//  ENDLESS LOOP — Pre-Klon + Post-Klon
//
//  Stack im DOM:
//  [ pre-clone ]   ← eingefügt vor den Originals
//  [ originals ]   ← der echte Inhalt
//  [ post-clone ]  ← angehängt nach den Originals
//
//  Scroll startet bei originalHeight (zeigt Originals)
//  Reset nach oben:  scrollY < originalHeight        → + originalHeight
//  Reset nach unten: scrollY >= 2 × originalHeight   → - originalHeight
// ══════════════════════════════════════════════

const originals = Array.from(main.children);

// Post-Klon (nach unten scrollen)
originals.forEach(el => {
    const clone = el.cloneNode(true);
    clone.classList.add("is-clone", "is-clone--post");
    main.appendChild(clone);
});

// Pre-Klon (nach oben scrollen)
originals.forEach(el => {
    const clone = el.cloneNode(true);
    clone.classList.add("is-clone", "is-clone--pre");
    main.insertBefore(clone, main.firstChild);
});

// Hilfsfunktion: Gesamthöhe der Original-Elemente
function getOriginalHeight() {
    let h = 0;
    originals.forEach(el => { h += el.offsetHeight; });
    return h;
}

// Scroll-Startposition: mitten im Stack (zeigt Originals)
window.addEventListener("load", () => {
    const h = getOriginalHeight();
    window.scrollTo({ top: h, behavior: "instant" });
});

// Scroll-Reset in beide Richtungen
let isResetting = false;

window.addEventListener("scroll", () => {
    if (isResetting) return;
    const h = getOriginalHeight();

    if (window.scrollY < h) {
        isResetting = true;
        window.scrollTo({ top: window.scrollY + h, behavior: "instant" });
        isResetting = false;
    } else if (window.scrollY >= h * 2) {
        isResetting = true;
        window.scrollTo({ top: window.scrollY - h, behavior: "instant" });
        isResetting = false;
    }
}, { passive: true });

// ══════════════════════════════════════════════
//  INLINE NAV — Anchor-Links abfangen
//
//  IDs existieren 3× im DOM (pre-clone, original, post-clone).
//  href="#about" würde immer zum pre-clone (ganz oben) springen.
//  Fix: scrollY des Originals berechnen + originalHeight addieren
//  damit wir immer im mittleren (Original-)Stack landen.
// ══════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href").slice(1);
        // Original-Element finden (nicht clone)
        const target = Array.from(
            document.querySelectorAll(`#${targetId}`)
        ).find(el => !el.closest(".is-clone"));

        if (!target) return;
        e.preventDefault();

        const h = getOriginalHeight();
        // offsetTop des Originals + originalHeight = Position im mittleren Stack
        const targetY = target.offsetTop + h - originals[0].offsetTop;

        window.scrollTo({ top: targetY, behavior: "smooth" });
    });
});

// ══════════════════════════════════════════════
//  FARBWECHSEL — wenn Hero fast vollständig sichtbar
//
//  threshold: 0.95 = Hero muss zu 95% im Viewport sein
//  (entspricht: obere Kante liegt nahezu am oberen Bildschirmrand)
//  Cooldown verhindert Flackern bei minimalem Hin-und-Her-Scrollen.
// ══════════════════════════════════════════════

function applyPalette(index) {
    const p = palettes[index % palettes.length];

    document.querySelectorAll(".hero").forEach(el => {
        el.style.background = p.hero.bg;
        el.style.color = p.hero.color;
    });
    document.querySelectorAll(".section--dark").forEach(el => {
        el.style.background = p.sectionDark.bg;
        el.style.color = p.sectionDark.color;
    });
    document.querySelectorAll(".section--mid").forEach(el => {
        el.style.background = p.sectionMid.bg;
        el.style.color = p.sectionMid.color;
    });
    document.querySelectorAll(".section--accent").forEach(el => {
        el.style.background = p.sectionAccent.bg;
        el.style.color = p.sectionAccent.color;
    });
    document.querySelectorAll(".inline-nav").forEach(el => {
        el.style.background = p.inlineNav.bg;
    });
    document.querySelectorAll(".inline-nav a").forEach(el => {
        el.style.color = p.inlineNav.color;
    });
}

applyPalette(0);

let heroVisitCount = 0;
let lastPaletteChange = 0;
const PALETTE_COOLDOWN = 800; // ms

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const now = Date.now();
        if (now - lastPaletteChange < PALETTE_COOLDOWN) return;
        lastPaletteChange = now;

        heroVisitCount++;
        if (heroVisitCount === 1) return; // Startpalette, kein Wechsel
        loopCount++;
        applyPalette(loopCount);
    });
}, { threshold: 0.95 });

document.querySelectorAll(".hero").forEach(el => heroObserver.observe(el));

// ══════════════════════════════════════════════
//  SCROLL-ANIMATIONEN
// ══════════════════════════════════════════════

// ── Scroll-Richtung tracken ──
let lastScrollY = window.scrollY;
let scrollDir = "down"; // "down" | "up"

window.addEventListener("scroll", () => {
    const current = window.scrollY;
    scrollDir = current >= lastScrollY ? "down" : "up";
    lastScrollY = current;
}, { passive: true });

// Standard-Observer für reveal, stagger, typewriter
// Animationen spielen nur beim nach-unten-scrollen.
// Beim Hochscrollen bleibt is-visible drauf — kein Reset, kein Neustart.
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
            el.classList.add("is-visible");
        } else {
            // Nur resetten wenn Element oben raus ist (wurde bereits passiert)
            // UND man nach unten scrollt — dann kommt es beim nächsten Loop neu
            const above = entry.boundingClientRect.top < 0;
            if (scrollDir === "down" && above) {
                el.classList.remove("is-visible");
            }
        }
    });
}, { threshold: 0.15 });

const standardSelectors = [
    ".reveal",
    ".stagger-item",
    ".typewriter",
].join(", ");

document.querySelectorAll(standardSelectors).forEach(el => {
    scrollObserver.observe(el);
});

// Separater Observer für slide-in Elemente —
// Das Problem: translateX(±100vw) schiebt das Element sofort wieder
// aus dem Viewport → Observer entfernt is-visible → Animation bricht ab.
// Fix: is-visible erst nach animationend entfernen, nicht beim Observer-Exit.
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting && !el.dataset.animating) {
            el.dataset.animating = "true";
            el.classList.add("is-visible");

            // Nach Ende der Animation Flag zurücksetzen
            // damit beim nächsten Loop wieder animiert wird
            el.addEventListener("animationend", () => {
                delete el.dataset.animating;
            }, { once: true });
        }

        if (!entry.isIntersecting && !el.dataset.animating) {
            const above = entry.boundingClientRect.top < 0;
            if (scrollDir === "down" && above) {
                el.classList.remove("is-visible");
            }
        }
    });
}, {
    threshold: 0,
    rootMargin: "200px 0px 200px 0px"
});

document.querySelectorAll(".slide-in-left, .slide-in-right").forEach(el => {
    slideObserver.observe(el);
});