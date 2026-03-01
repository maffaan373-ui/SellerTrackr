// Premium UI Interactions and Animations (Mobile Friendly - Fixed)

export const initUI = () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Premium Reveal Animations
    initRevealAnimations();
    
    // Initialize GSAP Animations (if available)
    initGSAPAnimations();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Mobile Menu
    initMobileMenu();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Form Interactions
    initFormInteractions();
};

// Reveal Animations
const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => revealObserver.observe(reveal));
};

// GSAP Animations
const initGSAPAnimations = () => {
    if (!window.gsap) return;
    
    if (document.querySelector('.hero-section')) {
        gsap.from('.hero-section h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out'
        });
        
        gsap.from('.hero-section p', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: 'power4.out'
        });
        
        gsap.from('.hero-section .btn-primary', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            delay: 0.4,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    if (document.querySelectorAll('.feature-card').length > 0) {
        gsap.from('.feature-card', {
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.feature-card',
                start: 'top 85%'
            }
        });
    }
    
    animateCounters();
};

// Animate Numbers
const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
};

// Navbar Scroll
const initNavbarScroll = () => {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
};

// Mobile Menu
const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            if (!mobileMenu.classList.contains('hidden')) {
                const items = mobileMenu.querySelectorAll('a');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Form Interactions
const initFormInteractions = () => {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(0, 245, 160, 0.1), 0 0 20px rgba(0, 245, 160, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
};

// Toast Notification
export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    const iconMap = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    
    const colorMap = {
        success: 'rgba(0, 245, 160, 1)',
        error: 'rgba(239, 68, 68, 1)',
        warning: 'rgba(245, 158, 11, 1)',
        info: 'rgba(59, 130, 246, 1)'
    };
    
    toast.className = 'premium-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        left: 2rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 1.25rem 1.5rem;
        background: rgba(26, 31, 58, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 4px solid ${colorMap[type]};
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        color: white;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    `;
    
    toast.innerHTML = `
        <i data-lucide="${iconMap[type]}" style="color: ${colorMap[type]}; width: 20px; height: 20px; flex-shrink: 0;"></i>
        <span style="flex: 1;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
};

// Initialize
document.addEventListener('DOMContentLoaded', initUI);

export default {
    initUI,
    showToast
};
