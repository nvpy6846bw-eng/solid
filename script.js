
/* ========================================
   SOLIDGRAMS — SCRIPT.JS
======================================== */


/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navItems.forEach((item) => {
        item.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            !menuToggle.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {
            closeMenu();
        }
    });
}


/* ========================================
   STICKY HEADER
======================================== */

const header = document.querySelector(".header");

function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 35);
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* ========================================
   SCROLL REVEAL ANIMATIONS
======================================== */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* ========================================
   CONTACT INQUIRY BUTTONS
======================================== */

const inquiryButtons = document.querySelectorAll(".inquiry-option");

const instagramProfile = "https://www.instagram.com/solid.grams/";

inquiryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const topic = button.dataset.topic || "I have an inquiry.";

        const message =
            `Hi SolidGrams! ${topic} I'd like to discuss the details.`;

        /*
          Instagram profile links do not reliably prefill
          a DM message on every device. Copy the suggested
          message first, then open the profile.
        */

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(message)
                .then(() => {
                    window.open(
                        instagramProfile,
                        "_blank",
                        "noopener,noreferrer"
                    );

                    showInquiryFeedback(
                        button,
                        "Message copied! Paste it into Instagram."
                    );
                })
                .catch(() => {
                    window.open(
                        instagramProfile,
                        "_blank",
                        "noopener,noreferrer"
                    );

                    showInquiryFeedback(
                        button,
                        "Instagram opened. Send us your inquiry."
                    );
                });
        } else {
            window.open(
                instagramProfile,
                "_blank",
                "noopener,noreferrer"
            );

            showInquiryFeedback(
                button,
                "Instagram opened. Send us your inquiry."
            );
        }
    });
});


/* ========================================
   INQUIRY BUTTON FEEDBACK
======================================== */

function showInquiryFeedback(button, message) {
    const originalText = button.querySelector("span");

    if (!originalText) return;

    const savedText = originalText.textContent;

    originalText.textContent = message;

    button.classList.add("inquiry-success");

    window.setTimeout(() => {
        originalText.textContent = savedText;
        button.classList.remove("inquiry-success");
    }, 3500);
}


/* ========================================
   IMAGE FALLBACKS
======================================== */

/*
  If a gallery photo has not been added yet,
  keep the tile dark instead of showing a broken icon.
*/

document.querySelectorAll(".gallery-item img, .hero-image, .about-image-wrap img")
    .forEach((image) => {
        image.addEventListener("error", () => {
            image.style.display = "none";

            const parent = image.parentElement;

            if (parent) {
                parent.classList.add("image-unavailable");
            }
        });
    });


/* ========================================
   AUTOMATIC COPYRIGHT YEAR
======================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ========================================
   CLOSE MENU WITH ESCAPE KEY
======================================== */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
