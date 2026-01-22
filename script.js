/* =========================================
   1. CONFIGURATIE & HELPER FUNCTIES
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateDynamicContent();
    initSmoothScroll();
});

/**
 * Berekent de leeftijd op basis van een geboortedatum
 */
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Als de verjaardag nog niet is geweest dit jaar, trek er 1 af
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* =========================================
   2. THEMA (DARK / LIGHT MODE)
   ========================================= */

function initTheme() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const storedTheme = localStorage.getItem('theme');
    
    // Standaard thema is 'dark', tenzij anders opgeslagen of ingesteld
    const currentTheme = storedTheme || 'dark';

    // Instellen bij laden pagina
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (toggleSwitch) {
        // Zet schakelaar goed
        toggleSwitch.checked = (currentTheme === 'dark');

        // Luister naar kliks
        toggleSwitch.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/* =========================================
   3. DYNAMISCHE CONTENT (JAAR & LEEFTIJD)
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
        ageSpan.textContent = calculateAge("2004-08-03"); // Jouw verjaardag
    }
}

/* =========================================
   4. INTERACTIE (SCROLL & KAARTEN)
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

/**
 * Wordt aangeroepen vanuit de HTML: onclick="toggleCard(this)"
 * Zorgt voor een Accordion-effect (eentje open, rest dicht).
 */
window.toggleCard = function(clickedCard) {
    // Check of de aangeklikte kaart al open was
    const wasActive = clickedCard.classList.contains('active');

    // 1. Sluit EERST alle kaarten
    document.querySelectorAll('.job-card').forEach(card => {
        card.classList.remove('active');
    });

    // 2. Was hij nog niet open? Open hem dan nu.
    // (Was hij wel al open, dan hebben we hem bij stap 1 gesloten en blijft hij dicht)
    if (!wasActive) {
        clickedCard.classList.add('active');
    }
};