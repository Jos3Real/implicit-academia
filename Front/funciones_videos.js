/**
 * funciones_videos.js - Interactividad para el Aula Virtual
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ════════════════════════════════════════════════
       1. MENÚ LATERAL (SIDEBAR)
       ════════════════════════════════════════════════ */
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // Función para abrir el menú
    const openSidebar = () => {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden'; // Evitar scroll principal
    };

    // Función para cerrar el menú
    const closeSidebar = () => {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = ''; // Restaurar scroll
    };

    // Event Listeners del Menú
    if(menuBtn && closeBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }

    /* ════════════════════════════════════════════════
       2. ANIMACIONES ON SCROLL (Intersection Observer)
       ════════════════════════════════════════════════ */
    const fadeElements = document.querySelectorAll('.fade-up');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Dispara un poco antes de que llegue al fondo
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Dejamos de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    /* ════════════════════════════════════════════════
       3. SISTEMA DE FILTRADO DE VIDEOS
       ════════════════════════════════════════════════ */
    const filterButtons = document.querySelectorAll('.topic-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Actualizar el estilo del botón activo
            filterButtons.forEach(b => {
                b.classList.remove('active', 'text-white');
                b.classList.add('text-slate-600');
            });
            btn.classList.add('active');
            btn.classList.remove('text-slate-600');

            // 2. Obtener el filtro seleccionado
            const filterValue = btn.getAttribute('data-topic');

            // 3. Filtrar las tarjetas de video
            videoCards.forEach(card => {
                // Pequeña animación para suavizar la transición
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    const cardTopic = card.getAttribute('data-topic');
                    
                    if (filterValue === 'all' || filterValue === cardTopic) {
                        card.style.display = 'block';
                        // Forzar reflow para la animación
                        void card.offsetWidth; 
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // 300ms de espera sincronizado con la transición visual
            });
        });
    });

    /* ════════════════════════════════════════════════
       4. OCULTAR PLACEHOLDERS AL HACER CLIC
       (Para fines de diseño, mientras pones tus enlaces reales de YouTube)
       ════════════════════════════════════════════════ */
    const placeholders = document.querySelectorAll('.video-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 300);
        });
    });
});