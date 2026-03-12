// ----------------------------------------------
//  CSS ANIMATIONS SHOWCASE — main.js
//  DevPanicZone | vanilla JS, no dependencies
// ----------------------------------------------



// Palettes - switch per loop, all sections affected 
const palettes = [
    {
        hero: { bg: "#3d1f0d", color: "#f2e9d0" },
        sectionDark: { bg: "#2a1208", color: "#f2e9d0" },
        sectionMid: { bg: "#3d1f0d", color: "#f2e9d0" },
        sectionAccent: { bg: "#c8a96e", color: "#3d1f0d" },
        inlineNav: { bg: "#1a0c05", color: "#fcf2d7" },
    },
    {
        hero: { bg: "#e5d9b8", color: "#3d1f0d" },
        sectionDark: { bg: "#dbcca1", color: "#301809" },
        sectionMid: { bg: "#e5d7ac", color: "#3d1f0d" },
        sectionAccent: { bg: "#3d1f0d", color: "#f2e9d0" },
        inlineNav: { bg: "#c3b692", color: "#2a1208" },
    },
    {
        hero: { bg: "#c8a96e", color: "#3d1f0d" },
        sectionDark: { bg: "#bc985b", color: "#2a1208" },
        sectionMid: { bg: "#3d1f0d", color: "#c8a96e" },
        sectionAccent: { bg: "#e9d7a6", color: "#3d1f0d" },
        inlineNav: { bg: "#705427", color: "#fcf2d4" },
    },
];

let loopCount = 0;

// Disable browser scroll restoration 
// Prevents the browser from restoring the previous scroll position on reload
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// DOM-References
const main = document.getElementById("main-content");
const intro = document.getElementById("intro");

// INTRO
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
            // After intro exit: make sure we land on the hero
            scrollToHero();
        }, { once: true });
    }, INTRO_DURATION);
}

// ----------------------------------------------
//  ENDLESS LOOP - pre-clone + post-clone
//
//  DOM stack:
//  [ pre-clone ]   - inserted before originals
//  [ originals ]   - the real content
//  [ post-clone ]  - appended after originals
//
//  Scroll starts at originalHeight (shows originals)
//  Reset upward:   scrollY < originalHeight        + originalHeight
//  Reset downward: scrollY >= 2 × originalHeight   - originalHeight
// ----------------------------------------------

const originals = Array.from(main.children);

// Post-Clone (scroll down)
originals.forEach(el => {
    const clone = el.cloneNode(true);
    clone.classList.add("is-clone", "is-clone--post");
    clone.setAttribute("inert", "");       // remove from tab order + screen readers
    clone.setAttribute("aria-hidden", "true");
    main.appendChild(clone);
});

// Pre-Clone (scroll up)
originals.forEach(el => {
    const clone = el.cloneNode(true);
    clone.classList.add("is-clone", "is-clone--pre");
    clone.setAttribute("inert", "");
    clone.setAttribute("aria-hidden", "true");
    main.insertBefore(clone, main.firstChild);
});

// Utility: height of original elements
function getOriginalHeight() {
    let h = 0;
    originals.forEach(el => { h += el.offsetHeight; });
    return h;
}

// Scroll start position: directly on the hero in the original stack
function scrollToHero() {
    const heroEl = originals.find(el => el.id === "hero");
    if (!heroEl) return;
    const h = getOriginalHeight();
    // offsetTop of original + h = position in the middle stack
    const targetY = heroEl.offsetTop + h - originals[0].offsetTop;
    window.scrollTo({ top: targetY, behavior: "instant" });
}

window.addEventListener("load", () => {
    scrollToHero();
});

// Scroll-reset in both directions
let isResetting = false;

window.addEventListener("scroll", () => {
    if (isResetting) return;
    const h = getOriginalHeight();

    if (window.scrollY < h) {
        isResetting = true;
        const dirBefore = scrollDir; // Remember direction before reset
        window.scrollTo({ top: window.scrollY + h, behavior: "instant" });
        scrollDir = dirBefore;     // Ignore the reset jump
        lastScrollY = window.scrollY;
        isResetting = false;
    } else if (window.scrollY >= h * 2) {
        isResetting = true;
        const dirBefore = scrollDir;
        window.scrollTo({ top: window.scrollY - h, behavior: "instant" });
        scrollDir = dirBefore;
        lastScrollY = window.scrollY;
        isResetting = false;
    }
}, { passive: true });

// ----------------------------------------------
//  INLINE NAV - intercept anchor links
//
//  IDs exist 3× in the DOM (pre-clone, original, post-clone).
//  href="#about" would always jump to the pre-clone (very top).
//  Fix: calculate offsetTop of original + add originalHeight
//  so we always land in the middle (original) stack.
// ----------------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href").slice(1);
        // find original element (not clone)
        const target = Array.from(
            document.querySelectorAll(`#${targetId}`)
        ).find(el => !el.closest(".is-clone"));

        if (!target) return;
        e.preventDefault();

        const h = getOriginalHeight();
        // offsetTop of original + originalHeight = position in middle stack
        const targetY = target.offsetTop + h - originals[0].offsetTop;

        window.scrollTo({ top: targetY, behavior: "smooth" });
    });
});

// ----------------------------------------------
//  FARBWECHSEL - when hero is almost fully visible
//
//  threshold: 0.95 = hero must be 95% in viewport
//  (meaning: top edge is nearly at the top of the screen)
//  Cooldown prevents flickering on minimal back-and-forth scrolling.
// ----------------------------------------------

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
        if (heroVisitCount === 1) return; // First visit, no palette change
        loopCount++;
        applyPalette(loopCount);
    });
}, { threshold: 0.95 });

document.querySelectorAll(".hero").forEach(el => heroObserver.observe(el));

// ----------------------------------------------
//  SCROLL-ANIMATIONS
// ----------------------------------------------

// Track scroll direction
let lastScrollY = window.scrollY;
let scrollDir = "down"; // "down" | "up"

window.addEventListener("scroll", () => {
    const current = window.scrollY;
    scrollDir = current >= lastScrollY ? "down" : "up";
    lastScrollY = current;
}, { passive: true });

// Standard observer for reveal, stagger, typewriter
// Animations only play when scrolling down.
// When scrolling back up, is-visible stays — no reset, no restart.
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
            el.classList.add("is-visible");
        } else {
            // Only reset if element has scrolled out above
            // AND we're scrolling down — it will animate fresh on the next loop
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
    ".reveal-sequence--contact", ".reveal-brand",
].join(", ");

document.querySelectorAll(standardSelectors).forEach(el => {
    scrollObserver.observe(el);
});

// ----------------------------------------------
// Separate observer for slide-in elements —
// The problem: translateX(±100vw) immediately pushes the element
// back out of the viewport → observer removes is-visible → animation breaks.
// Fix: remove is-visible after animationend, not on observer exit.
// ----------------------------------------------
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting && !el.dataset.animating) {
            el.dataset.animating = "true";
            el.classList.add("is-visible");

            // Reset flag after animation ends
            // so it animates again on the next loop
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

// ----------------------------------------------
//  CONSOLE EASTER EGG
// ----------------------------------------------

console.log(
    "%cDarkground Coffee Roasters",
    "font-size: 1.4rem; font-weight: bold; color: #c8a96e; background: #1a0c05; padding: 8px 16px; border-radius: 4px;"
);
console.log(
    "%cBuilt by DevPanicZone  |  github.com/dontdevpanic",
    "font-size: 0.85rem; color: #f2e9d0; background: #2a1208; padding: 4px 16px;"
);
console.log(
    "%c⚠️  Warning: May cause CSS animation overdose.\nSide effects include obsessive keyframe tweaking\nand an inability to leave opacity at 1.",
    "font-size: 0.85rem; color: #f2e9d0; background: #3d1f0d; padding: 8px 16px; border-left: 3px solid #c8a96e;"
);
console.log(
    "%c👀 Nosy? Check out the repo:\nhttps://github.com/dontdevpanic/darkground-coffee",
    "font-size: 0.85rem; color: #c8a96e; background: #1a0c05; padding: 8px 16px;"
);