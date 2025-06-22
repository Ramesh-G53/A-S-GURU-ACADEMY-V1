// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (dropdownBtn && dropdownContent) {
        // Toggle dropdown with animation on button click
        dropdownBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            const isDisplayed = dropdownContent.style.display === 'block';
            
            // Toggle menu icon animation if it exists
            if (menuIcon) {
                if (isDisplayed) {
                    menuIcon.classList.remove('active');
                } else {
                    menuIcon.classList.add('active');
                }
            }
            
            dropdownContent.style.display = isDisplayed ? 'none' : 'block';
        });
        
        // Close dropdown when clicking a link
        const dropdownLinks = dropdownContent.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Check for mobile view
                if (window.innerWidth < 992) {
                    setTimeout(() => {
                        dropdownContent.style.display = 'none';
                        if (menuIcon) menuIcon.classList.remove('active');
                    }, 100);
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.matches('.dropdown-btn') && !dropdownContent.contains(event.target)) {
                dropdownContent.style.display = 'none';
                if (menuIcon) menuIcon.classList.remove('active');
            }
        });
    }
    
    // Handle window resize to fix mobile/desktop menu transitions
    window.addEventListener('resize', function() {
        if (dropdownContent) {
            // For mobile-desktop transitions, reset style but don't hide dropdown
            if (window.innerWidth >= 992) {
                // Don't reset display property on desktop - allow hover to control it
                if (menuIcon) menuIcon.classList.remove('active');
            } else {
                // On mobile, hide the dropdown when resizing down
                dropdownContent.style.display = 'none';
                if (menuIcon) menuIcon.classList.remove('active');
            }
        }
    });

    // Image Carousel Functionality
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;

    function showNextImage() {
        // Remove active and zoom-in classes from current image
        carouselImages[currentImageIndex].classList.remove('active');
        carouselImages[currentImageIndex].classList.remove('zoom-in');
        
        // Move to next image (loop back to 0 if at end)
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        
        // Add active and zoom-in classes to new current image for zoom effect
        carouselImages[currentImageIndex].classList.add('active');
        carouselImages[currentImageIndex].classList.add('zoom-in');
    }

    // Initialize first image with zoom effect
    if (carouselImages.length > 0) {
        carouselImages[0].classList.add('zoom-in');
    }

    // Start carousel after initial delay (let first image show and zoom)
    setTimeout(() => {
        setInterval(showNextImage, 4000); // Change image every 4 seconds (increased for better zoom effect viewing)
    }, 3000); // Wait 3 seconds before starting carousel

    // Intersection Observer for section title animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    }, observerOptions);

    // Observe all section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 60; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Faster alphabet-by-alphabet typing animation for hero description
    const typingText = document.getElementById('typing-text');
    const text = "Empowering individuals through transformative online and Live self-development programs.";
    let currentCharIndex = 0;

    function typeChar() {
        if (currentCharIndex < text.length) {
            typingText.textContent = text.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            // Faster timing: reduced delays for both spaces and letters
            const nextDelay = text[currentCharIndex - 1] === ' ' ? 20 : 40;
            setTimeout(typeChar, nextDelay);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                typingText.classList.add('typing-complete');
            }, 1000);
        }
    }

    // Start typing animation after hero text slides in
    setTimeout(() => {
        typeChar();
    }, 1200);

    // Function for scroll to services (if needed)
    window.scrollToServices = function() {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const headerOffset = 60;
            const elementPosition = servicesSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Add pulse effect to button after page loads
    setTimeout(() => {
        const activateBtn = document.querySelector('.activate-btn');
        if (activateBtn) {
            activateBtn.classList.add('pulse');
        }
    }, 2000);
});