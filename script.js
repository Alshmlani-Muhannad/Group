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
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto'; // Restore scrolling
            });
        });
    }
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(event.target) && 
            event.target !== mobileMenuButton) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}