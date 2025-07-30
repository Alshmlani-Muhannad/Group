// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add any additional initialization here
});

// Mobile Menu Toggle Functions
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
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
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            e.target !== mobileMenuButton) {
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
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Check on resize
    window.addEventListener('resize', checkVisibility);
}

// Counter Animation Functions
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
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
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    // Initial check
    animateCounters();
    
    // Check on scroll
    window.addEventListener('scroll', animateCounters);
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu.classList.contains('open')) {
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
    const heroSection = document.querySelector('#home');
    
    if (!heroSection) return;
    
    const updateHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initial check
    updateHeader();
    
    // Check on scroll
    window.addEventListener('scroll', updateHeader);
}

// Form Enhancement Functions
function initializeFormEnhancements() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
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
}
// script.js
import { initializeLanguageSwitcher } from './language.js';

document.addEventListener('DOMContentLoaded', function() {
  initializeLanguageSwitcher();
  
  // Rest of your existing initialization code
  initializeMobileMenu();
  initializeScrollAnimations();
  // ... etc
});
// Add error class style dynamically
document.head.insertAdjacentHTML('beforeend', `
    <style>
        input.error, textarea.error {
            border-color: #ff4444 !important;
            box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2) !important;
        }
    </style>
`);