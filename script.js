// ==========================================
// Diamond Dental Clinic - JavaScript
// ==========================================

// Configuration - Easy to change contact details
const CLINIC_CONFIG = {
    phone: '+91XXXXXXXXXX',
    whatsapp: '91XXXXXXXXXX',
    email: 'diamondclinic@email.com',
    address: 'Uripok Kangchup Rd, Khwai Brahmapur Nagamapal, Uripok, Imphal, Manipur 795001'
};

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    lucide.createIcons();
    
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReviewsCarousel();
    initAppointmentForm();
    initFloatingButtons();
    setCurrentYear();
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    let isOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('active', isOpen);
        
        // Update icon
        menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    });
    
    // Close menu when clicking a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            isOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Reviews Carousel
// ==========================================
function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = 3;
    
    // Check if we're on mobile (single slide view) or desktop (2 slides view)
    function getVisibleSlides() {
        return window.innerWidth >= 768 ? 2 : 1;
    }
    
    function getMaxIndex() {
        return Math.ceil(totalSlides / getVisibleSlides()) - 1;
    }
    
    function updateCarousel() {
        const slideWidth = getVisibleSlides() === 2 ? 50 : 100;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    function nextSlide() {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Handle resize
    window.addEventListener('resize', updateCarousel);
}

// ==========================================
// Appointment Form - WhatsApp Redirect
// ==========================================
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email') || 'Not provided';
        const treatment = formData.get('treatment');
        const date = formData.get('date');
        const message = formData.get('message') || 'No additional message';
        
        // Format date for better readability
        const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create WhatsApp message
        const whatsappMessage = `🦷 *New Appointment Request*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Treatment:* ${treatment}
*Preferred Date:* ${formattedDate}
*Message:* ${message}

Sent from Diamond Dental Clinic Website`;

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Optional: Show success message
        showToast('Opening WhatsApp to complete your booking...');
    });
}

// ==========================================
// Floating Buttons - Update with config
// ==========================================
function initFloatingButtons() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    const callBtn = document.querySelector('.floating-call');
    
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${CLINIC_CONFIG.whatsapp}`;
    }
    
    if (callBtn) {
        callBtn.href = `tel:${CLINIC_CONFIG.phone}`;
    }
}

// ==========================================
// Set Current Year in Footer
// ==========================================
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i data-lucide="check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        bottom: 10rem;
        left: 50%;
        transform: translateX(-50%);
        background: #0F172A;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 100;
        animation: slideUp 0.3s ease-out;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(toast);
    
    // Initialize icon
    lucide.createIcons();
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==========================================
// Scroll Reveal Animation (Optional Enhancement)
// ==========================================
function initScrollReveal() {
    const elements = document.querySelectorAll('.service-card, .trust-badge, .gallery-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Initialize scroll reveal after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure page is fully rendered
    setTimeout(initScrollReveal, 100);
});
