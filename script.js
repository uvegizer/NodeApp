// Typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    }
});

// Start typing animations
window.onload = () => {
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    
    typeWriter(mainTitle, 'Anything The 2nd:', 100);
    setTimeout(() => {
        typeWriter(subTitle, 'A new and improved computer program!', 50);
    }, 2000);
};

// Modified transition
document.getElementById('transitionButton').addEventListener('click', function() {
    this.classList.add('clicked');
    
    // Create explosion particles
    const particles = 30;
    for(let i = 0; i < particles; i++) {
        createParticle(this.offsetLeft + this.offsetWidth/2, this.offsetTop + this.offsetHeight/2);
    }

    setTimeout(() => {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.login-container').style.display = 'block';
        // Get username from websim
        const username = window.webSimUsername || 'User';
        document.getElementById('username').value = username;
    }, 1000);
});

// Add login button handler
document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    document.querySelector('.login-container').style.display = 'none';
    document.body.classList.add('transition');
    
    // Show desktop interface
    setTimeout(() => {
        document.querySelector('.desktop-interface').style.display = 'block';
        document.getElementById('menuUsername').textContent = username;
        updateClock();
        setInterval(updateClock, 1000);
    }, 500);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const destinationX = x + (Math.random() - 0.5) * 200;
    const destinationY = y + (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--dx', `${destinationX}px`);
    particle.style.setProperty('--dy', `${destinationY}px`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    particle.style.animationDelay = `${delay}ms`;

    setTimeout(() => particle.remove(), 1000);
}

// Desktop interface functions
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeString;
}

// Start menu toggle
document.querySelector('.start-menu-button').addEventListener('click', function() {
    const startMenu = document.querySelector('.start-menu');
    const isVisible = startMenu.style.display === 'block';
    startMenu.style.display = isVisible ? 'none' : 'block';
});

// Close start menu when clicking outside
document.addEventListener('click', function(e) {
    const startMenu = document.querySelector('.start-menu');
    const startButton = document.querySelector('.start-menu-button');
    
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.style.display = 'none';
    }
});

// Desktop icon click handlers
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const app = this.dataset.app;
        console.log(`Opening ${app}`);
        // Placeholder for app launching
    });
});

// Modified menu item click handlers in the start menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.textContent.trim();
        switch(action) {
            case '🔒 Lock Screen':
                lockScreen();
                break;
            case '🔄 Restart':
                restartSystem();
                break;
            case '⚡ Shutdown':
                shutdownSystem();
                break
        }
        // Hide start menu after action
        document.querySelector('.start-menu').style.display = 'none';
    });
});

function lockScreen() {
    document.querySelector('.desktop-interface').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
    document.getElementById('password').value = ''; // Clear password field
}

function restartSystem() {
    // Create and show restart overlay
    const overlay = document.createElement('div');
    overlay.className = 'system-overlay';
    overlay.innerHTML = `
        <div class="restart-content">
            <div class="spinner"></div>
            <div class="restart-text">Restarting...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Simulate restart sequence
    setTimeout(() => {
        overlay.remove();
        lockScreen();
    }, 3000);
}

function shutdownSystem() {
    // Create and show shutdown overlay
    const overlay = document.createElement('div');
    overlay.className = 'system-overlay shutdown';
    overlay.textContent = "It's now safe to turn off your computer.";
    document.body.appendChild(overlay);
    
    // Hide all other interface elements
    document.querySelector('.desktop-interface').style.display = 'none';
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('particles-js').style.display = 'none';
}

// Settings window functionality
const openSettingsWindow = () => {
    document.querySelector('.settings-window').style.display = 'flex';
};

// Desktop icon click for Settings app
document.querySelectorAll('.desktop-icon[data-app="settings"]').forEach(icon => {
    icon.addEventListener('click', openSettingsWindow);
});

// Start menu click for Settings
document.querySelectorAll('.menu-item').forEach(item => {
    if (item.textContent.trim() === '⚙️ Settings') {
        item.addEventListener('click', openSettingsWindow);
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.settings-window').style.display = 'none';
});

// Sidebar navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.settings-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const sectionId = `${item.dataset.section}-section`;
        document.getElementById(sectionId).style.display = 'block';
    });
});

// Theme selector
document.getElementById('theme-selector').addEventListener('change', function() {
    const theme = this.value;
    if (theme === 'light') {
        document.documentElement.style.setProperty('--bg-color', '#f0f0f0');
        document.documentElement.style.setProperty('--text-color', '#333');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#fff');
    }
});

// Color options
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        const color = option.dataset.color;
        document.documentElement.style.setProperty('--accent-color', color);
    });
});

// Volume slider
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
volumeSlider.addEventListener('input', () => {
    const value = volumeSlider.value;
    volumeValue.textContent = `${value}%`;
});

// Sound effects toggle
document.getElementById('sound-effects-toggle').addEventListener('change', function() {
    // Toggle system sound effects
    window.systemSoundEffects = this.checked;
});