// Jaartal automatisch updaten
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll voor anker-links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dark Mode Functionaliteit
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// Check of er al een thema was opgeslagen
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
} else {
    // Standaard dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

/* =========================================
   4. KAARTEN UITKLAPPEN (ACCORDION)
   ========================================= */

function toggleCard(card) {
    // 1. Toggle de klasse 'active' op de kaart die aangeklikt is
    card.classList.toggle('active');
    
    // OPTIONEEL: Wil je dat de andere kaarten dichtgaan als je er eentje opent?
    // Haal dan de commentaarstrepen (//) hieronder weg:
    
    /*
    const allCards = document.querySelectorAll('.job-card');
    allCards.forEach(item => {
        if (item !== card) {
            item.classList.remove('active');
        }
    });
    */
}