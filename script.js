// Initialize Lucide Icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Toggle icon
    if (mobileMenu.classList.contains('active')) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu on link click
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(enquiryForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            message: formData.get('message') || ''
        };

        // Validate
        if (!data.name || !data.phone) {
            alert('Please fill in all required fields');
            return;
        }

        const submitBtn = enquiryForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // For static version, you can replace this with your actual API endpoint
            // const response = await fetch('YOUR_API_ENDPOINT/api/enquiry', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            // Simulate API call for static version
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Thank you for your enquiry! We will contact you soon.');
            enquiryForm.reset();
        } catch (error) {
            alert('Failed to submit enquiry. Please try again or call us directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .feature-card, .program-card, .review-card, .membership-card, .gallery-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Console welcome message
console.log('%c CITY GYM - Imphal\'s Premier Fitness Destination ', 'background: #39FF14; color: #000; font-size: 14px; font-weight: bold; padding: 10px;');
console.log('%c Transform Your Body Today! ', 'background: #050505; color: #39FF14; font-size: 12px; padding: 5px;');
