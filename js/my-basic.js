document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Animação inicial do Hero
    setTimeout(() => {
        document.getElementById('hero-title').classList.remove('opacity-0', 'translate-y-10');
        document.getElementById('hero-subtitle').classList.remove('opacity-0');
        document.getElementById('hero-counter').classList.remove('opacity-0');
        document.getElementById('hero-btns').classList.remove('opacity-0');
        showToast();
    }, 800);

    // Definir a data do evento
    const eventDate = new Date("2026-06-26T19:30:00"); // substitua pela data real do AcampBetel

    // Função para atualizar o contador
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // Evento passou
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return; // para não mostrar números negativos
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d.toString().padStart(2, '0');
        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
    }

    // Chamar a função a cada segundo
    updateCountdown(); // chama imediatamente para não esperar 1s
    setInterval(updateCountdown, 1000);

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Mobile Menu
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.classList.toggle('menu-open');
        mobileMenu.classList.toggle('active');

        // Melhora a acessibilidade
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em qualquer link mobile
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('menu-open');
            mobileMenu.classList.remove('active');
        });
    });
});

// Função Copiar PIX
function copyPix() {
    const key = document.getElementById('pix-key').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = key;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Feedback visual no botão
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Copiado!';
    btn.classList.replace('bg-betel-gold', 'bg-green-600');
    lucide.createIcons();

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.replace('bg-green-600', 'bg-betel-gold');
        lucide.createIcons();
    }, 2000);
}

// Nova Notificação Melhorada
function showToast() {
    const toast = document.getElementById('welcome-toast');
    const progress = document.getElementById('toast-progress');

    // Inicia visibilidade
    toast.classList.add('show');

    // Reinicia e inicia barra de progresso com atraso mínimo para garantir transição
    progress.style.transition = 'none';
    progress.style.width = '100%';

    setTimeout(() => {
        progress.style.transition = 'width 7000ms linear';
        progress.style.width = '0%';
    }, 50);

    // Auto-ocultar após o tempo da barra
    const autoHide = setTimeout(() => {
        hideToast();
    }, 7100);

    // Guardar timer para poder cancelar se necessário (ex: fechar manualmente)
    window.toastTimer = autoHide;
}

function hideToast() {
    const toast = document.getElementById('welcome-toast');
    toast.classList.remove('show');
    if (window.toastTimer) clearTimeout(window.toastTimer);
}

setTimeout(() => {
    const header = document.getElementById('main-header');
    header.classList.remove('opacity-0', '-translate-y-full');
    showToast();
}, 300);
