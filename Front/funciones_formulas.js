/**
 * ImplicitAcademia - Sistema de Navegación y Usabilidad Global
 * Arquitectura modular adaptada a cualquier tamaño de dispositivo táctil o de escritorio.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    /**
     * Muestra el menú lateral y bloquea el scroll del fondo (ideal para celulares)
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
     * Oculta el menú lateral y restaura el scroll
     */
    const closeMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Asignación de eventos solo si los elementos existen en el HTML
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Cierra el menú con la tecla ESC para usuarios de teclado/computadora
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar && !sidebar.classList.contains('translate-x-full')) {
            closeMenu();
        }
    });
});