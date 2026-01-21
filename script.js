/* =========================================
   1. ALGEMENE FUNCTIONALITEIT
   ========================================= */

// Update het jaartal automatisch in de footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll functionaliteit voor navigatie links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Zoek het element waar we naartoe moeten
        const targetElement = document.querySelector(this.getAttribute('href'));
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* =========================================
   2. DARK MODE LOGICA (STANDAARD AAN)
   ========================================= */

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// INITIALISATIE:
// Check of er een voorkeur is opgeslagen.
// - Als 'light' is opgeslagen -> Zet Light Mode aan.
// - Anders (eerste bezoek of 'dark' opgeslagen) -> Zet Dark Mode aan.
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleSwitch) toggleSwitch.checked = false;
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleSwitch) toggleSwitch.checked = true; // Zet de switch visueel aan
}

// FUNCTIE: Wissel tussen thema's als er geklikt wordt
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Onthoud keuze
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Onthoud keuze
    }
}

// Event Listener toevoegen (alleen als de switch bestaat)
if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
}