document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. Menú de Navegación Responsivo (Hamburguesa)
    // -------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar el icono de hamburguesa
            document.body.classList.toggle('no-scroll'); // Evitar scroll del body cuando el menú está abierto
        });
        // Cerrar el menú si se hace clic en un enlace (útil en móviles)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }
    // -------------------------------------------------------------------
    // 2. Animaciones al Desplazar (Reveal on Scroll)
    // -------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll'); // Elementos a revelar
    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.1 // El elemento es visible si al menos el 10% está en el viewport
    };
    const observer = new IntersectionObserver((entries, observer) => { // Callback cuando los elementos entran en el viewport
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed'); // Añadir clase para animar
                observer.unobserve(entry.target); // Dejar de observar una vez revelado
            }
        });
    }, observerOptions);
    revealElements.forEach(el => {
        observer.observe(el);
    });
    // -------------------------------------------------------------------
    // 3. Resaltar Enlace de Navegación Activo
    // -------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('.main-header').offsetHeight; // Altura del header sticky
    const highlightNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight; // Ajusta por la altura del header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink); // Asegurar que se resalta al cargar la página
    // -------------------------------------------------------------------
    // 4. Botón "Volver Arriba"
    // -------------------------------------------------------------------
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        // Mostrar/ocultar el botón basado en el scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Muestra el botón después de 300px de scroll
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        // Smooth scroll al hacer clic
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // -------------------------------------------------------------------
    // Opcional: Desplazamiento suave para todos los enlaces internos
    // -------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight; // Ajusta por el header sticky
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});