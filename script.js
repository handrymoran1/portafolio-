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

// Bandera para controlar la animación de las estelas
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

// INICIALIZACIÓN DE LA APP (cuando todo está cargado)
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
    setupScrollAnimations();
    initLightTrails(); 
}

// Animaciones y render
function render() {
  const frameIndex = Math.round(sequence.frame);
  const img = images[frameIndex];
  if (!img || !img.complete) return;

  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(sequence, {
        frame: 0,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "center center",
            end: "+=200%",
            scrub: 1.5,
            pin: true,
        },
        onUpdate: () => {
            render();
            // Activar las estelas de luz cuando la animación del hero termina (frame 0)
            if (Math.round(sequence.frame) === 0 && !lightTrailsActive) {
                lightTrailsActive = true;
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

// LÓGICA PARA ESTELAS EFECTO
function initLightTrails() {
    const bgCanvas = document.getElementById('background-canvas');
    const bgCtx = bgCanvas.getContext('2d');

    let width, height;
    let particles = [];

    const particleConfig = {
        count: 75,
        minSpeed: 1,
        maxSpeed: 2.5,
        minSize: 2,
        maxSize: 3,
        colors:  ['#0044ff', '#ff2200', '#aa00ff', '#ff4dd8']
    };

    function resizeCanvas() {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
    }

    function createParticle() {
        const color = particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)];
        return {
            x: width / 2, // Origen: centro horizontal
            y: height,    // Origen: borde inferior
            vx: (Math.random() * particleConfig.maxSpeed) - (particleConfig.maxSpeed / 2), // Velocidad horizontal aleatoria para dispersión
            vy: -(Math.random() * (particleConfig.maxSpeed - particleConfig.minSpeed) + particleConfig.minSpeed), // Velocidad vertical siempre hacia arriba
            size: Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize,
            color: color
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleConfig.count; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        // Solo dibujar si la animación principal ha terminado
        if (lightTrailsActive) {
            bgCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            bgCtx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Si la partícula sale de la pantalla (por arriba, izquierda o derecha),reiniciamos
                if (p.y < 0 || p.x < 0 || p.x > width) {
                    Object.assign(p, createParticle());
                }

                bgCtx.fillStyle = p.color;
                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                bgCtx.fill();
            });
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        // Si las estelas ya están activas, reinicio las partículas para que se adapten al nuevo tamaño
        if (lightTrailsActive) {
            initParticles();
        }
    });

    resizeCanvas();
    initParticles(); // Prepara las partículas, pero aún no son visibles
    animate();       // Inicia el bucle de animación
}
