
// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegación suave (Smooth Scroll)
    // Esto hace que al dar clic en el menú, baje suavemente
    const links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href');
            const section = document.querySelector(sectionId);
            
            window.scrollTo({
                top: section.offsetTop - 70, // Espacio para el menú fijo
                behavior: 'smooth'
            });
        });
    });

    // 2. Efecto de scroll en la barra de navegación
    // El menú cambia de color cuando bajas la página
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = '#020c1b';
            nav.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        } else {
            nav.style.background = 'rgba(10, 25, 47, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });

    // 3. Animación simple para las tarjetas de proyectos
    // Similar a la lógica de objetos de tu taller de "tienda"
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#64ffda';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'transparent';
        });
    });
});