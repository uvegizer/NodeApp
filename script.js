document.getElementById('loginButton').addEventListener('click', function() {
// =========================
// NODE OS™ DESKTOP UI JS
// =========================

// Efecto de máquina de escribir para la pantalla de bienvenida
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

// Inicializar partículas de fondo
particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    color: { value: '#0FDABB' },
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

// Animación de bienvenida
window.onload = () => {
  const mainTitle = document.getElementById('mainTitle');
  const subTitle = document.getElementById('subTitle');
  typeWriter(mainTitle, 'Node OS™ Desktop UI', 80);
  setTimeout(() => {
    typeWriter(subTitle, 'Un entorno cyber-futurista minimalista', 40);
  }, 1200);
};

// Transición de bienvenida a login
document.getElementById('transitionButton').addEventListener('click', function() {
  this.classList.add('clicked');
  // Partículas de explosión
  const particles = 30;
  for(let i = 0; i < particles; i++) {
    createParticle(this.offsetLeft + this.offsetWidth/2, this.offsetTop + this.offsetHeight/2);
  }
  setTimeout(() => {
    document.querySelector('.boot-screen').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
    const username = window.webSimUsername || 'User';
    document.getElementById('username').value = username;
  }, 1000);
});

// Login
document.getElementById('loginButton').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  document.querySelector('.login-container').style.display = 'none';
  document.body.classList.add('transition');
  setTimeout(() => {
    document.querySelector('.desktop-interface').style.display = 'block';
    document.getElementById('menuUsername').textContent = username;
    updateClocks();
    setInterval(updateClocks, 1000);
  }, 500);
});

// Partículas de explosión
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

// Actualización de reloj en topbar y taskbar
function updateClocks() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const clock = document.getElementById('clock');
  const topbarClock = document.getElementById('topbar-clock');
  if (clock) clock.textContent = timeString;
  if (topbarClock) topbarClock.textContent = timeString;
}

// Menú Start
document.querySelector('.start-menu-button').addEventListener('click', function(e) {
  e.stopPropagation();
  const startMenu = document.querySelector('.start-menu');
  startMenu.style.display = (startMenu.style.display === 'block' || startMenu.style.display === '') ? 'none' : 'block';
});
document.addEventListener('click', function(e) {
  const startMenu = document.querySelector('.start-menu');
  const startButton = document.querySelector('.start-menu-button');
  if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
    startMenu.style.display = 'none';
  }
});

// Widgets (puedes expandir la lógica para abrir/cerrar widgets)
document.querySelectorAll('.widget').forEach(widget => {
  widget.addEventListener('click', () => {
    widget.classList.toggle('hide');
  });
});

// Menú Start: acciones del sistema
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
    const action = this.textContent.trim();
    switch(action) {
      case '🔒 Bloquear':
        lockScreen();
        break;
      case '🔄 Reiniciar':
        restartSystem();
        break;
      case '⚡ Apagar':
        shutdownSystem();
        break;
    }
    document.querySelector('.start-menu').style.display = 'none';
  });
});

function lockScreen() {
  document.querySelector('.desktop-interface').style.display = 'none';
  document.querySelector('.login-container').style.display = 'flex';
  document.getElementById('password').value = '';
}
function restartSystem() {
  const overlay = document.createElement('div');
  overlay.className = 'system-overlay';
  overlay.innerHTML = `
    <div class="restart-content">
      <div class="spinner"></div>
      <div class="restart-text">Reiniciando...</div>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
    lockScreen();
  }, 3000);
}
function shutdownSystem() {
  const overlay = document.createElement('div');
  overlay.className = 'system-overlay shutdown';
  overlay.textContent = "Ahora puedes apagar tu computadora.";
  document.body.appendChild(overlay);
  document.querySelector('.desktop-interface').style.display = 'none';
  document.querySelector('.login-container').style.display = 'none';
  document.getElementById('particles-js').style.display = 'none';
}

// Configuración: abrir/cerrar ventana
const openSettingsWindow = () => {
  document.querySelector('.settings-window').style.display = 'flex';
};
document.querySelectorAll('.menu-item').forEach(item => {
  if (item.textContent.trim() === '⚙️ Configuración') {
    item.addEventListener('click', openSettingsWindow);
  }
});
document.querySelector('.close-button').addEventListener('click', () => {
  document.querySelector('.settings-window').style.display = 'none';
});

// Navegación de sidebar en settings
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('.settings-section').forEach(section => {
      section.style.display = 'none';
    });
    const sectionId = `${item.dataset.section}-section`;
    document.getElementById(sectionId).style.display = 'block';
  });
});

// Selector de tema
document.getElementById('theme-selector').addEventListener('change', function() {
  const theme = this.value;
  if (theme === 'light') {
    document.documentElement.style.setProperty('--bg-main', '#f0f0f0');
    document.documentElement.style.setProperty('--text-main', '#222');
  } else {
    document.documentElement.style.setProperty('--bg-main', '#000000');
    document.documentElement.style.setProperty('--text-main', '#fff');
  }
});

// Selector de color neón
document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    const color = option.dataset.color;
    document.documentElement.style.setProperty('--accent', color);
  });
});

// Volumen
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
if (volumeSlider && volumeValue) {
  volumeSlider.addEventListener('input', () => {
    const value = volumeSlider.value;
    volumeValue.textContent = `${value}%`;
  });
}

// Efectos de sonido (placeholder)
const soundToggle = document.getElementById('sound-effects-toggle');
if (soundToggle) {
  soundToggle.addEventListener('change', function() {
    window.systemSoundEffects = this.checked;
  });
}