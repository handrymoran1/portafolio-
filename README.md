# Portafolio Personal Interactivo – Handry Morán

![Portafolio Screenshot](![alt text](image.png))
*<p align="center">Reemplaza la imagen de arriba con una captura o GIF de tu portafolio.</p>*

---

### Resumen del Proyecto

Este es el código fuente de mi portafolio personal, una aplicación web de una sola página (SPA) diseñada para mostrar mis habilidades como Desarrollador Full Stack. El objetivo principal era crear una experiencia de usuario memorable y diferenciadora, alejándose de las plantillas tradicionales.

La aplicación presenta una navegación inversa ("scroll-up"), donde el usuario comienza en la parte inferior y avanza hacia arriba a través de una animación inmersiva para revelar el contenido principal.

### Funcionalidades

-   **Animación de Hero Controlada por Scroll:** La sección principal es una secuencia de 270 imágenes PNG renderizadas en un `<canvas>`. La "reproducción" de esta secuencia está directamente vinculada al scroll del usuario, creando un efecto de video interactivo.
-   **Precarga de Activos:** Un preloader se encarga de cargar todos los frames de la animación antes de iniciar la aplicación para garantizar una experiencia fluida y sin interrupciones.
-   **Efecto de Fondo con Canvas:** El contenido principal tiene un fondo dinámico con un efecto de "estelas de luz" (light trails) generado en un segundo `<canvas>` para añadir atmósfera.
-   **Animaciones de UI con GSAP:** Se utiliza la librería `GSAP` (GreenSock Animation Platform) y su plugin `ScrollTrigger` para:
    -   Fijar la sección del `hero` mientras dura la animación (`pin`).
    -   Controlar el frame de la animación basado en la posición del scroll (`scrub`).
    -   Animar la aparición del contenido de las secciones a medida que el usuario se desplaza.
-   **Diseño Totalmente Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla, desde móviles hasta ordenadores de escritorio.

---

### Instrucciones de Instalación

Este es un proyecto web estático (HTML, CSS, JavaScript) y no requiere un proceso de build complejo.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    ```

2.  **Navegar al directorio:**
    ```bash
    cd TU_REPOSITORIO
    ```

3.  **Ejecutar un servidor local:**
    Para evitar problemas con las políticas de CORS del navegador al cargar archivos, se recomienda usar un servidor local. Si tienes `VS Code`, una excelente opción es la extensión **Live Server**.
    -   Haz clic derecho sobre el archivo `index.html`.
    -   Selecciona "Open with Live Server".

    Si no usas VS Code, puedes usar cualquier servidor simple de Python:
    ```bash
    # Para Python 3
    python -m http.server
    ```
    Luego, abre tu navegador y ve a `http://localhost:8000`.

---

### Guía de Uso

Una vez que la aplicación esté cargada en el navegador:

1.  La página se cargará y posicionará automáticamente en la parte inferior, mostrando las secciones de "Hablemos", "Proyectos" y "Sobre Mí".
2.  Haz **scroll hacia arriba** para iniciar la experiencia.
3.  A medida que te desplazas hacia arriba, la animación principal del `hero` se desarrollará hasta revelar la escena completa.
4.  Continúa haciendo scroll para que la sección del `hero` se desvanezca y dé paso al contenido principal de la web.

---

### Manejo de Errores

-   **Tiempos de Carga:** El principal "error" que podría ocurrir es una experiencia de animación lenta o entrecortada debido al gran tamaño de los activos. Esto se mitiga con un **sistema de precarga** que asegura que todos los frames de la animación estén en la memoria del navegador antes de que el usuario pueda interactuar con la página. El preloader muestra el progreso de la carga.
-   **Errores de Script:** El código está contenido en un único script principal (`script.js`), por lo que no hay dependencias complejas que puedan fallar en la carga.

---

### Información de la API

Este proyecto no utiliza APIs de datos externas. Sin embargo, hace uso de las siguientes librerías de terceros a través de CDN:

-   **GSAP & ScrollTrigger:** Para todas las animaciones complejas y el control del scroll.
-   **Iconify:** Para la carga eficiente de los iconos SVG utilizados en la interfaz.
-   **Google Fonts:** Para cargar las tipografías personalizadas (`Bebas Neue`, `DM Sans`, `DM Mono`).

### Mejoras Futuras

Aunque el proyecto cumple su objetivo principal, siempre hay espacio para mejorar:

-   **[Rendimiento] Optimización de Activos:** Convertir la secuencia de 270 imágenes PNG a un formato de video como `.webm` o `.mp4`. Esto reduciría drásticamente el tiempo de carga inicial y mejoraría el rendimiento en dispositivos de gama baja.
-   **[Accesibilidad] Mejorar Semántica y `aria-labels`:** Añadir `aria-label` a los enlaces que solo contienen iconos para que sean descriptivos para los lectores de pantalla.
-   **[Mantenibilidad] Refactorizar a Módulos JS:** Separar la lógica de `script.js` en módulos (ESM) para la animación del `hero`, el fondo de estelas y las animaciones de la UI, mejorando la organización y mantenibilidad del código.
-   **[Contenido] Demos Funcionales:** Desplegar los proyectos listados en las tarjetas y añadir enlaces a las demos en vivo para proporcionar pruebas tangibles de mis habilidades.
