// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Language Switcher (will be imported from language.js)
    if (typeof initializeLanguageSwitcher === 'function') {
        initializeLanguageSwitcher();
    }
    
    // Mobile Menu Functionality
    initializeMobileMenu();
    
    // Scroll Animations
    initializeScrollAnimations();
    
    // Counter Animations
    initializeCounterAnimations();
    
    // Smooth Scrolling
    initializeSmoothScrolling();
    
    // Header Background Change
    initializeHeaderScroll();
    
    // Form Enhancements
    initializeFormEnhancements();
    
    // Add dynamic error styles
    addErrorStyles();
});

// Mobile Menu Toggle Functions
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const languageSwitcherMobile = document.getElementById('language-switcher-mobile');
    
    // Open mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking on links or language switcher
    const mobileMenuItems = mobileMenu?.querySelectorAll('a, #language-switcher-mobile');
    if (mobileMenuItems) {
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu?.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            e.target !== mobileMenuButton &&
            e.target !== languageSwitcherMobile) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll Animation Functions
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('animate');
            }
        });
    };
    
    // Use requestAnimationFrame for smoother performance
    const throttledCheck = () => {
        requestAnimationFrame(checkVisibility);
    };
    
    // Initial check
    throttledCheck();
    
    // Check on scroll with throttling
    window.addEventListener('scroll', throttledCheck);
    window.addEventListener('resize', throttledCheck);
}

// Counter Animation Functions
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const speed = 200;
    let hasAnimated = false;
    
    const animateCounters = () => {
        const countersSection = document.querySelector('#about');
        if (!countersSection) return;
        
        const sectionTop = countersSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75 && !hasAnimated) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const countersSection = document.querySelector('#about');
    if (countersSection) {
        observer.observe(countersSection);
    }
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a language switcher
            if (this.id === 'language-switcher' || this.id === 'language-switcher-mobile') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu?.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = 'auto';
                }
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Functions
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    
    const updateHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };
    
    // Initial check
    updateHeader();
    
    // Check on scroll with throttling
    window.addEventListener('scroll', requestTick);
}

// Form Enhancement Functions
function initializeFormEnhancements() {
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate inputs
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error');
                isValid = false;
            } else {
                formData[input.name] = input.value.trim();
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Remove error classes
            inputs.forEach(input => input.classList.remove('error'));
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Add dynamic error styles
function addErrorStyles() {
    if (!document.querySelector('style[data-dynamic-error-styles]')) {
        document.head.insertAdjacentHTML('beforeend', `
            <style data-dynamic-error-styles>
                input.error, textarea.error {
                    border-color: #ff4444 !important;
                    box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2) !important;
                }
            </style>
        `);
    }
}

// Export functions for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMobileMenu,
        initializeScrollAnimations,
        initializeCounterAnimations,
        initializeSmoothScrolling,
        initializeHeaderScroll,
        initializeFormEnhancements
    };
}