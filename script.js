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
});

// Mobile Menu Toggle Functions
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    // Open mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu?.querySelectorAll('