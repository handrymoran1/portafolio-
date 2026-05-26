const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

// Elementos DOM
const preloader = document.getElementById('preloader');
const preloaderText = document.querySelector('.preloader-text');
const contentWrapper = document.getElementById('content-wrapper');
const heroSection = document.getElementById('hero');

const frameCount = 270;
const currentFrame = index => (
  `assets/frames/frames${index.toString().padStart(8, '0')}.png`
);

// LÓGICA DE PRECARGA 
let imagesLoaded = 0;
const images = [];
const sequence = { frame: frameCount - 1 }; 

let lightTrailsActive = false;

const imageLoad = () => {
    imagesLoaded++;
    const progress = Math.floor((imagesLoaded / frameCount) * 100);
    preloaderText.textContent = `Cargando ${imagesLoaded} / ${frameCount}`;

    if (imagesLoaded === frameCount) {
        initApp();
    }
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = imageLoad;
  images.push(img);
}

// INICIALIZACIÓN DE LA APP
function initApp() {
    gsap.to(preloader, { opacity: 0, duration: 0.8, onComplete: () => {
        preloader.style.display = 'none';
    }});

    gsap.to([contentWrapper, heroSection], { css: { visibility: 'visible' }, duration: 0 });

    setTimeout(() => { window.scrollTo(0, document.body.scrollHeight); }, 50);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    render();
    initLightTrails(); 
    setupScrollAnimations();
}

// RENDERIZADO DEL CANVAS PRINCIPAL
function render() {
  const frameIndex = Math.round(sequence.frame);
  if (!images[frameIndex] || !images[frameIndex].complete) return;
  const img = images[frameIndex];

  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// ANIMACIONES DE SCROLL (GSAP)
function setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(sequence, {
        frame: 0,
        snap: "frame",
        ease: "none",
        onUpdate: render, 
        scrollTrigger: {
            trigger: "#hero",
            start: "center center",
            end: "+=200%",
            scrub: 1.5,
            pin: true,
            onLeaveBack: () => { 
                if (!lightTrailsActive) {
                    lightTrailsActive = true;
                    window.initParticles();
                }
            },
            onEnter: () => { 
                lightTrailsActive = false;
            }
        }
    });

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, 
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", 
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

// LÓGICA PARA PARTÍCULAS
function initLightTrails() {
    const bgCanvas = document.getElementById('background-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    let particles = [];
    let width, height;

    const particleConfig = {
        count: 75,
        minSpeed: 1,
        maxSpeed: 2.5,
        minSize: 2,
        maxSize: 3,
        colors:  ['#0044ff', '#ff2200', '#aa00ff', '#ff4dd8'],
        // --- PARÁMETROS SENCILLOS PARA LA EXPLOSIÓN ---
        explosionFactor: 15, // Qué tan fuerte es la explosión. Prueba entre 5 y 30.
        drag: 0.96 // Qué tan rápido frenan. Más cercano a 1, frenan más lento. Prueba entre 0.92 y 0.98.
    };

    function resizeCanvas() {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
    }

    function createParticle() {
        const color = particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)];
        
        const normalVx = (Math.random() * particleConfig.maxSpeed) - (particleConfig.maxSpeed / 2);
        const normalVy = -(Math.random() * (particleConfig.maxSpeed - particleConfig.minSpeed) + particleConfig.minSpeed);

        return {
            x: width / 2, 
            y: height,    
            vx: normalVx * particleConfig.explosionFactor, // Velocidad inicial multiplicada
            vy: normalVy * particleConfig.explosionFactor, // Velocidad inicial multiplicada
            normalVx: normalVx, // Guardamos la velocidad normal para después
            normalVy: normalVy,
            size: Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize,
            color: color
        };
    }
    
    window.initParticles = function() {
        particles = [];
        for (let i = 0; i < particleConfig.count; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
    
        if (lightTrailsActive) {
            bgCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            bgCtx.fillRect(0, 0, width, height);
    
            particles.forEach(p => {
                // Aplicar freno (drag) si la partícula es más rápida que su velocidad normal
                const currentSpeedSq = p.vx * p.vx + p.vy * p.vy;
                const normalSpeedSq = p.normalVx * p.normalVx + p.normalVy * p.normalVy;
                if (currentSpeedSq > normalSpeedSq) {
                    p.vx *= particleConfig.drag;
                    p.vy *= particleConfig.drag;
                }

                p.x += p.vx;
                p.y += p.vy;

                if ((p.x >= width - p.size && p.vx > 0) || (p.x <= p.size && p.vx < 0)) {
                    p.vx *= -1;
                }
                if ((p.y >= height - p.size && p.vy > 0) || (p.y <= p.size && p.vy < 0)) {
                    p.vy *= -1;
                }

                bgCtx.fillStyle = p.color;
                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                bgCtx.fill();
            });
        } else {
            bgCtx.clearRect(0, 0, width, height);
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        if (lightTrailsActive) {
            window.initParticles();
        }
    });

    resizeCanvas();
    animate();
}