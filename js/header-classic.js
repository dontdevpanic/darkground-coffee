// ══════════════════════════════════════════════
//  DARKGROUND COFFEE — header-classic.js
//  Classic header version — no endless loop
//  DevPanicZone | vanilla JS, no dependencies
// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
//  SCROLL ANIMATIONS
// ══════════════════════════════════════════════

// ── Track scroll direction ──
let lastScrollY = window.scrollY;
let scrollDir = "down";

window.addEventListener("scroll", () => {
    const current = window.scrollY;
    scrollDir = current >= lastScrollY ? "down" : "up";
    lastScrollY = current;
}, { passive: true });

// Standard observer — reveal, stagger, typewriter, contact sequence
// Animations trigger on scroll down, reset only when element leaves above
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
            el.classList.add("is-visible");
        } else {
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
    ".reveal-sequence--contact",
].join(", ");

document.querySelectorAll(standardSelectors).forEach(el => {
    scrollObserver.observe(el);
});

// Separate observer for slide-in elements —
// translateX(±100vw) pushes element out of viewport immediately,
// so we reset via animationend instead of observer exit.
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting && !el.dataset.animating) {
            el.dataset.animating = "true";
            el.classList.add("is-visible");

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

// ══════════════════════════════════════════════
//  SCROLL SPY
//
//  When a section is ≥ 20% visible, its matching
//  nav link gets class "is-active".
// ══════════════════════════════════════════════

const navLinks = document.querySelectorAll(".header-nav a[href^='#']");

function setActiveLink(id) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
    });
}

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section[id]").forEach(el => {
    spyObserver.observe(el);
});

// ══════════════════════════════════════════════
//  BACK TO TOP BUTTON
//
//  Appears after scrolling past 40% of the page.
//  Smooth scrolls to top on click.
// ══════════════════════════════════════════════

const toTopBtn = document.createElement("button");
toTopBtn.className = "to-top";
toTopBtn.setAttribute("aria-label", "Back to top");
toTopBtn.innerHTML = "&#x2191;";
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    toTopBtn.classList.toggle("is-visible", scrolled > 0.15);
}, { passive: true });

toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ══════════════════════════════════════════════
//  MOBILE NAV TOGGLE
// ══════════════════════════════════════════════

const navToggle = document.querySelector(".nav-toggle");
const headerNav = document.querySelector(".header-nav");

if (navToggle && headerNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = headerNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close nav when a link is clicked
    headerNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            headerNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ══════════════════════════════════════════════
//  CONSOLE EASTER EGG
// ══════════════════════════════════════════════

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