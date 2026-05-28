/**
 * ImplicitAcademia - Lógica de Navegación Interactiva
 * Gestión del Menú Desplegable (Slide-over Menu) de forma responsiva.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos del DOM
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    /**
     * Abre el menú lateral con transiciones fluidas.
     * Desactiva el scroll del fondo para mejorar la usabilidad móvil.
     */
    const openMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100');
            document.body.classList.add('overflow-hidden');
        }
    };

    /**
     * Cierra el menú lateral y restaura el comportamiento por defecto de la página.
     */
    const closeMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Asignación de manejadores de eventos (Listeners)
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Accesibilidad: Cerrar el menú presionando la tecla Escape (ESC)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar && !sidebar.classList.contains('translate-x-full')) {
            closeMenu();
        }
    });
});