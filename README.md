
# Portafolio Personal Interactivo – Handry Morán

Este repositorio contiene el código fuente de mi portafolio personal, una aplicación web de una sola página (SPA) diseñada para mostrar mis habilidades como Desarrollador Full Stack. El objetivo principal fue crear una experiencia de usuario memorable y diferenciadora, utilizando una navegación inversa ("scroll-up") y animaciones inmersivas controladas por el usuario.

**Puedes ver la versión en vivo aquí:** [handrymoran.com](https://handrymoran.com) *(<-- Reemplaza esto con tu URL cuando la tengas desplegada)*

---

### Funcionalidades

-   **Animación de Hero Controlada por Scroll:** La sección principal es una secuencia de 270 imágenes PNG renderizadas en un `<canvas>`. La "reproducción" de esta secuencia está directamente vinculada al scroll del usuario, creando un efecto de video interactivo.
-   **Navegación Inversa:** La página se carga en la parte inferior y el usuario avanza "hacia arriba" a través del contenido, una metáfora visual para el descubrimiento progresivo.
-   **Precarga de Activos:** Un preloader se encarga de cargar los 270 frames de la animación antes de iniciar la aplicación para garantizar una experiencia fluida y sin interrupciones desde el primer momento.
-   **Diseño Totalmente Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla. Se implementaron soluciones específicas para:
    -   **Escritorio:** Los bloques de texto laterales no invaden la animación central, incluso en pantallas ultra-anchas.
    -   **Móvil:** Los elementos se apilan verticalmente de forma coherente para una lectura cómoda.
-   **Accesibilidad Mejorada:** El orden del contenido en el HTML (DOM) es lógico y secuencial (Presentación -> Sobre mí -> Proyectos -> Contacto), asegurando una experiencia coherente para los lectores de pantalla. El orden visual inverso se logra de forma no disruptiva mediante CSS (`flex-direction: column-reverse`), manteniendo la visión del diseñador sin sacrificar la accesibilidad.
-   **Animaciones de UI con GSAP:** Se utiliza la librería `GSAP` (GreenSock Animation Platform) y su plugin `ScrollTrigger` para animaciones fluidas, como la aparición de las secciones de contenido.
-   **Fondo Dinámico:** El contenido principal tiene un fondo con un efecto de "estelas de luz" generado en un segundo `<canvas>` para añadir profundidad y atmósfera.

### Instrucciones de Instalación

Este es un proyecto web estático (HTML, CSS, JavaScript) y no requiere un proceso de build complejo.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/handrymoran1/portafolio-personal.git
    ```

2.  **Navegar al directorio:**
    ```bash
    cd portafolio-personal
    ```

3.  **Ejecutar un servidor local:**
    Para evitar problemas con las políticas de CORS del navegador, se recomienda usar un servidor local. Si tienes `VS Code`, una excelente opción es la extensión **Live Server**.
    -   Haz clic derecho sobre el archivo `index.html`.
    -   Selecciona "Open with Live Server".

    Si no, puedes usar el servidor simple de Python:
    ```bash
    # Para Python 3
    python -m http.server
    ```
    Luego, abre tu navegador y ve a `http://localhost:8000`.

### Guía de Uso

1.  La aplicación cargará todos los activos (verás el preloader).
2.  Una vez cargada, la página se posicionará en la parte inferior.
3.  **Haz scroll hacia arriba** para iniciar la experiencia.
4.  A medida que te desplazas, la animación principal se desarrollará hasta revelar la escena completa.

### Manejo de Errores

El principal cuello de botella potencial es el tiempo de carga de los 270 frames de la animación. Esto se mitiga con un **sistema de precarga** que bloquea la interacción hasta que todos los activos estén en la memoria del navegador, garantizando una animación fluida.

### Información de la API

Este proyecto no utiliza APIs de datos externas, pero sí consume librerías de terceros a través de CDN:

-   **GSAP & ScrollTrigger:** Para las animaciones y el control del scroll.
-   **Iconify:** Para la carga eficiente de los iconos SVG.
-   **Google Fonts:** Para las tipografías personalizadas (`Bebas Neue`, `DM Sans`, `DM Mono`).

### Mejoras Futuras

-   **[Rendimiento] Optimización de Activos:** Convertir la secuencia de imágenes PNG a un formato de video como `.webm`. Esto reduciría drásticamente el tiempo de carga y mejoraría el rendimiento.
-   **[Mantenibilidad] Refactorizar a Módulos JS:** Separar la lógica de `script.js` en módulos (ESM) para una mejor organización.
-   **[Contenido] Demos Funcionales:** Añadir enlaces a las demos en vivo de los proyectos listados.
