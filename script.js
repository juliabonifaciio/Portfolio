// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
    rect.bottom >= 0
  );
}

// Função para adicionar a classe de animação aos elementos visíveis
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('animated')) {
      element.classList.add('animated');
    }
  });
}

// Inicialização das animações
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.add('animate-on-scroll'));

  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    skill.classList.add('animate-on-scroll');
    skill.style.transitionDelay = `${index * 0.1}s`;
  });

  const projects = document.querySelectorAll('.project');
  projects.forEach((project, index) => {
    project.classList.add('animate-on-scroll');
    project.style.transitionDelay = `${index * 0.2}s`;
  });

  const featureBoxes = document.querySelectorAll('.feature-box');
  featureBoxes.forEach((box, index) => {
    box.classList.add('animate-on-scroll');
    box.style.transitionDelay = `${index * 0.15}s`;
  });

  handleScrollAnimation();
  window.addEventListener('scroll', handleScrollAnimation);
});

// Função para o menu mobile
function toggleMenu() {
  const navbarMenu = document.getElementById('navbarNav');
  navbarMenu.classList.toggle('active');
}

// Scroll suave para as âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const navbarMenu = document.getElementById('navbarNav');
    if (navbarMenu.classList.contains('active')) navbarMenu.classList.remove('active');
    
    const targetElement = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

// Função para mudar o estilo da navbar durante o scroll
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', handleNavbarScroll);

// Animação de partículas
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles-network');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = {
    lines: 'rgba(138, 43, 226, 0.15)',
    dots: 'rgba(155, 77, 219, 0.7)'
  };

  const particlesConfig = {
    particleCount: 70,
    particleRadius: 2,
    particleMaxRadius: 3.5,
    lineLength: 150,
    particleLife: 3,
    mouseRange: 200
  };

  let mousePosition = { x: null, y: null };
  let particles = [];

  window.addEventListener('mousemove', e => {
    mousePosition.x = e.x;
    mousePosition.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mousePosition.x = null;
    mousePosition.y = null;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * particlesConfig.particleRadius + 1;
      this.speedX = (Math.random() - 0.5) * 1;
      this.speedY = (Math.random() - 0.5) * 1;
      this.life = 0;
      this.maxLife = Math.random() * particlesConfig.particleLife + 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (mousePosition.x && mousePosition.y) {
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < particlesConfig.mouseRange) {
          this.speedX += dx * 0.003;
          this.speedY += dy * 0.003;
        }
      }

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

      this.speedX = Math.max(Math.min(this.speedX, 2), -2);
      this.speedY = Math.max(Math.min(this.speedY, 2), -2);
      this.life += 0.01;
      if (this.life > this.maxLife) this.life = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.dots;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particlesConfig.particleCount; i++) {
      particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
      particle.update();
      particle.draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particle.x - particles[j].x;
        const dy = particle.y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < particlesConfig.lineLength) {
          ctx.strokeStyle = colors.lines;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
  }

  init();
  animate();
});