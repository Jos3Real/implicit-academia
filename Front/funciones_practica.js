    // ═══════════════════════════════════════
    //  SIDEBAR
    // ═══════════════════════════════════════
    const menuBtn  = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');

    function openSidebar()  { sidebar.classList.remove('translate-x-full'); overlay.classList.remove('opacity-0','pointer-events-none'); overlay.classList.add('opacity-100'); }
    function closeSidebar() { sidebar.classList.add('translate-x-full'); overlay.classList.add('opacity-0','pointer-events-none'); overlay.classList.remove('opacity-100'); }
    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // ═══════════════════════════════════════
    //  SCORE STATE
    // ═══════════════════════════════════════
    const TOTAL_Q = 12;
    let score    = 0;
    let streak   = 0;
    const answered = {}; // qid -> 'correct'|'incorrect'

    function updateScoreUI() {
        document.getElementById('score-display').textContent = score;
        document.getElementById('cta-score').textContent     = score;
        document.getElementById('score-bar').style.width     = `${(score / TOTAL_Q) * 100}%`;
        // animate
        const disp = document.getElementById('score-display');
        disp.classList.remove('score-pulse');
        void disp.offsetWidth;
        disp.classList.add('score-pulse');
    }

    function updateStreak(won) {
        if (won) { streak = Math.min(streak + 1, 5); }
        else      { streak = 0; }
        document.querySelectorAll('.streak-dot').forEach((dot, i) => {
            dot.classList.toggle('lit', i < streak);
        });
    }

    // ═══════════════════════════════════════
    //  QUIZ LOGIC
    // ═══════════════════════════════════════
    document.querySelectorAll('.quiz-card').forEach(card => {
        const qid      = card.dataset.qid;
        const optGroup = card.querySelector('[data-correct]');
        const correct  = optGroup.dataset.correct;
        const options  = card.querySelectorAll('.option-btn');
        const feedback = card.querySelector('.feedback-msg');
        const solPanel = card.querySelector('.solution-panel');
        const retryBtn = card.querySelector('.retry-btn');

        options.forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered[qid]) return; // already answered

                const chosen = btn.dataset.opt;
                const isCorrect = chosen === correct;
                answered[qid] = isCorrect ? 'correct' : 'incorrect';

                // Disable all options
                options.forEach(b => b.setAttribute('disabled', true));

                if (isCorrect) {
                    btn.classList.add('correct');
                    score++;
                    updateScoreUI();
                    updateStreak(true);
                    showFeedback(feedback, true);
                    openSolution(solPanel);
                } else {
                    btn.classList.add('incorrect');
                    // Highlight correct answer
                    options.forEach(b => { if (b.dataset.opt === correct) b.classList.add('reveal-correct'); });
                    updateStreak(false);
                    showFeedback(feedback, false);
                    openSolution(solPanel);
                    retryBtn.classList.remove('hidden');
                }

                // Re-render KaTeX if needed
                if (window.renderMathInElement) {
                    renderMathInElement(solPanel, {
                        delimiters: [
                            {left:'$$',right:'$$',display:true},
                            {left:'\\(',right:'\\)',display:false}
                        ]
                    });
                }
            });
        });

        retryBtn.addEventListener('click', () => {
            // Reset this question
            delete answered[qid];
            options.forEach(b => {
                b.removeAttribute('disabled');
                b.classList.remove('correct','incorrect','reveal-correct');
            });
            feedback.classList.add('hidden');
            feedback.innerHTML = '';
            solPanel.classList.remove('open');
            retryBtn.classList.add('hidden');
            if (answered[qid] === 'correct') { score = Math.max(0, score - 1); updateScoreUI(); }
        });
    });

    function showFeedback(el, correct) {
        el.classList.remove('hidden');
        if (correct) {
            el.innerHTML = `<div class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-2.5 rounded-xl font-medium">
                <i class="fa-solid fa-circle-check text-emerald-500"></i>
                ¡Correcto! Revisa el procedimiento completo a continuación.
            </div>`;
        } else {
            el.innerHTML = `<div class="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-2.5 rounded-xl font-medium">
                <i class="fa-solid fa-circle-xmark text-rose-500"></i>
                Incorrecto. Se ha revelado la respuesta correcta y el procedimiento.
            </div>`;
        }
    }

    function openSolution(panel) {
        panel.classList.add('open');
    }

    // ═══════════════════════════════════════
    //  CATEGORY FILTER
    // ═══════════════════════════════════════
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            document.querySelectorAll('.quiz-card').forEach(card => {
                card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
            });
        });
    });

    // ═══════════════════════════════════════
    //  SCROLL FADE-IN
    // ═══════════════════════════════════════
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
    }, { threshold: 0.06 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));