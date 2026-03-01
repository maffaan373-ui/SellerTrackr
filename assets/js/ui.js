export const initUI = () => {

    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (window.gsap && document.querySelector('.reveal')) {
        window.gsap.to('.reveal', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.reveal',
                start: "top 85%"
            }
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }


    document.querySelectorAll('[data-dropdown-toggle]').forEach(el => {
        el.addEventListener('click', (e) => {
            const dropdownId = el.getAttribute('data-dropdown-toggle');
            const dropdown = document.getElementById(dropdownId);
            if(dropdown) dropdown.classList.toggle('hidden');
        });
    });
};

export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white transform transition-all duration-300 translate-y-20 ${type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-y-20'), 100);
    setTimeout(() => {
        toast.classList.add('translate-y-20');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

document.addEventListener('DOMContentLoaded', initUI);
