// ═══════════════════════════════════════
    //  SIDEBAR (same logic as index)
    // ═══════════════════════════════════════
    const menuBtn  = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
    }
    function closeSidebar() {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-100');
    }
    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // ═══════════════════════════════════════
    //  STEP ACCORDION
    // ═══════════════════════════════════════
    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isOpen  = content.classList.contains('open');

            // Close all steps in same example
            const parent = btn.closest('article');
            parent.querySelectorAll('.step-content').forEach(c => c.classList.remove('open'));
            parent.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));

            if (!isOpen) {
                content.classList.add('open');
                btn.classList.add('active');
                // Mark step number as done (visual only)
                btn.querySelector('.step-num').classList.add('done');
            }
        });
    });

    // ═══════════════════════════════════════
    //  PROGRESS TRACKER
    // ═══════════════════════════════════════
    const TOTAL    = 6;
    const STORAGE_KEY = 'ia_examples_done';
    let done = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    function updateProgress() {
        const count = done.length;
        document.getElementById('progress-text').textContent = `${count} / ${TOTAL}`;
        document.getElementById('progress-bar').style.width  = `${(count / TOTAL) * 100}%`;

        // Style done cards
        done.forEach(id => {
            const card = document.querySelector(`.example-card[data-id="${id}"]`);
            if (card) {
                card.style.borderColor = '#d1fae5';
                const btn = card.querySelector('.mark-done-btn');
                if (btn) {
                    btn.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-500"></i><span class="text-emerald-600">Revisado</span>';
                    btn.disabled = true;
                }
            }
        });
    }

    document.querySelectorAll('.mark-done-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (!done.includes(id)) {
                done.push(id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
                updateProgress();
            }
        });
    });

    updateProgress();

    // ═══════════════════════════════════════
    //  CATEGORY FILTER
    // ═══════════════════════════════════════
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.dataset.cat;
            document.querySelectorAll('.example-card').forEach(card => {
                if (cat === 'all' || card.dataset.cat === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ═══════════════════════════════════════
    //  SCROLL FADE-IN
    // ═══════════════════════════════════════
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));