/* =========================================
   1. CONFIGURATIE & HELPER FUNCTIES
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateDynamicContent();
    initSmoothScroll();
});

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* =========================================
   2. DYNAMISCHE CONTENT (JAAR & LEEFTIJD)
   ========================================= */

function updateDynamicContent() {
    // 1. Footer Jaartal
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Leeftijd (automatisch up-to-date)
    const ageSpan = document.getElementById("age");
    if (ageSpan) {
        ageSpan.textContent = calculateAge("2004-08-03");
    }
}

/* =========================================
   3. INTERACTIE (SCROLL & KAARTEN)
   ========================================= */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Wordt aangeroepen vanuit de HTML: onclick="toggleCard(this)"
window.toggleCard = function(clickedCard) {
    const wasActive = clickedCard.classList.contains('active');

    // Sluit eerst alles
    document.querySelectorAll('.job-card').forEach(card => {
        card.classList.remove('active');
    });

    // Open alleen als hij dicht was
    if (!wasActive) {
        clickedCard.classList.add('active');
    }
};

/* =========================================
   SCROLL ANIMATIES (INTERSECTION OBSERVER)
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Als het element in beeld is
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optioneel: Stop met kijken na 1 keer (zodat hij niet steeds opnieuw animeert als je scrollt)
            // observer.unobserve(entry.target); 
        } 
        // Wil je dat het weggaat als je weer naar boven scrollt? Haal dan de '//' hieronder weg:
        // else {
        //     entry.target.classList.remove('show');
        // }
    });
}, {
    threshold: 0.1 // Animeer zodra 10% van het element zichtbaar is
});

// Zoek alle elementen met de class 'hidden' en let erop
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));