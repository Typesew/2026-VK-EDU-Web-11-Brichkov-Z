/* ============================================================
   AskMe — собственная логика интерфейса
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Виджет голосования (3 состояния) ----------
       ничего не нажато / нажат лайк / нажат дизлайк            */
    document.querySelectorAll('.vote-widget').forEach((widget) => {
        const likeBtn = widget.querySelector('.vote-like');
        const dislikeBtn = widget.querySelector('.vote-dislike');
        const countEl = widget.querySelector('.vote-count');

        const base = parseInt(widget.dataset.base || '0', 10) || 0;

        const render = () => {
            let value = base;
            if (widget.classList.contains('is-liked')) {
                value = base + 1;
            } else if (widget.classList.contains('is-disliked')) {
                value = base - 1;
            }
            countEl.textContent = value;
        };

        likeBtn.addEventListener('click', () => {
            if (widget.classList.contains('is-liked')) {
                widget.classList.remove('is-liked');
            } else {
                widget.classList.remove('is-disliked');
                widget.classList.add('is-liked');
            }
            render();
        });

        dislikeBtn.addEventListener('click', () => {
            if (widget.classList.contains('is-disliked')) {
                widget.classList.remove('is-disliked');
            } else {
                widget.classList.remove('is-liked');
                widget.classList.add('is-disliked');
            }
            render();
        });

        render();
    });

    /* ---------- Правильный ответ (2 состояния) ----------
       отмечен / не отмечен; только один на страницу вопроса   */
    document.querySelectorAll('.answer-card').forEach((card) => {
        const input = card.querySelector('.correct-input');
        if (!input) return;

        const sync = () => {
            if (input.checked) {
                const group = card.dataset.group;
                document
                    .querySelectorAll(`.answer-card[data-group="${group}"]`)
                    .forEach((other) => {
                        const otherInput = other.querySelector('.correct-input');
                        if (otherInput && otherInput !== input) {
                            otherInput.checked = false;
                            other.classList.remove('is-correct');
                        }
                    });
                card.classList.add('is-correct');
            } else {
                card.classList.remove('is-correct');
            }
        };

        input.addEventListener('change', sync);
        sync();
    });
});
