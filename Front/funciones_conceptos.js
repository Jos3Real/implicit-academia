/**
 * ImplicitAcademia - Sistema de Navegación y Usabilidad Global
 * Arquitectura modular adaptada a cualquier tamaño de dispositivo táctil o de escritorio.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Selección de componentes del DOM de la barra superior y lateral
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    /**
     * Muestra el menú lateral deslizable aplicando transiciones CSS nativas.
     * Bloquea el scroll del body para evitar comportamientos erráticos en iOS y Android.
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
     * Oculta el menú lateral y restaura la libertad de scroll en la pantalla.
     */
    const closeMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Asignación segura de listeners (Solo se ejecutan si el elemento existe en el HTML actual)
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Accesibilidad de teclado: Cierra la navegación al presionar la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar && !sidebar.classList.contains('translate-x-full')) {
            closeMenu();
        }
    });
});