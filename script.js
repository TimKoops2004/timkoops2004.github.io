/* =========================================
   1. ALGEMENE FUNCTIONALITEIT
   ========================================= */

// Update het jaartal automatisch
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* =========================================
   2. DARK MODE LOGICA
   ========================================= */

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleSwitch) toggleSwitch.checked = false;
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleSwitch) toggleSwitch.checked = true; 
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    initParticles(); // Herstart animatie voor nieuwe kleuren
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
}

/* =========================================
   3. RUSTIGE ACHTERGROND (AANGEPAST)
   ========================================= */

const canvas = document.getElementById('canvas1');

if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor(x, y, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                // Dark mode: iets groter = iets transparanter maken voor rust
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; 
            } else {
                ctx.fillStyle = 'rgba(37, 99, 235, 0.15)'; 
            }
            
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        
        // --- AANPASSING 1: AANTAL ---
        // Hoe hoger het getal waardoor je deelt, hoe MINDER bolletjes.
        // Was: 15000. Nu: 25000 (dus minder bolletjes)
        let numberOfParticles = (canvas.height * canvas.width) / 25000; 

        for (let i = 0; i < numberOfParticles; i++) {
            
            // --- AANPASSING 2: GROOTTE ---
            // (Math.random() * A) + B
            // A = variatie in grootte, B = minimale grootte
            // Dit maakt bolletjes tussen de 2px en 7px groot
            let size = (Math.random() * 5) + 2; 

            let x = Math.random() * (innerWidth - size * 2) + size * 2;
            let y = Math.random() * (innerHeight - size * 2) + size * 2;
            
            // --- AANPASSING 3: SNELHEID ---
            // We delen de random waarde door een groter getal om het trager te maken
            // Dit is nu extreem traag en rustgevend
            let speedX = (Math.random() * 0.2) - 0.1; 
            let speedY = (Math.random() * 0.2) - 0.1; 
            
            particlesArray.push(new Particle(x, y, size, speedX, speedY));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        initParticles();
    });
}