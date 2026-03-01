// ============================================
// UI — SellerTrackr
// ============================================

export const initUI = () => {
    if (window.lucide) window.lucide.createIcons();
    initRevealAnimations();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
};

const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 80);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => obs.observe(el));
};

const initNavbarScroll = () => {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 80);
    }, { passive: true });
};

const initMobileMenu = () => {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
};

// ============================================
// Toast (light-theme, accessible)
// ============================================
const TOAST_ICONS = {
    success: 'check-circle',
    error:   'x-circle',
    warning: 'alert-triangle',
    info:    'info'
};

export const showToast = (message, type = 'info') => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i data-lucide="${TOAST_ICONS[type]}" class="toast__icon ${type}" style="width:18px;height:18px;flex-shrink:0"></i>
        <span style="flex:1;font-size:0.875rem;line-height:1.4">${message}</span>
        <button onclick="this.parentElement.remove()" style="flex-shrink:0;opacity:0.5;font-size:1rem;line-height:1;cursor:pointer;background:none;border:none;color:inherit">&times;</button>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(12px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 260);
    }, 3800);
};

document.addEventListener('DOMContentLoaded', initUI);

export default { initUI, showToast };
