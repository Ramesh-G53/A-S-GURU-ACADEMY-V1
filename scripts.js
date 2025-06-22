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


// Enhanced Configuration object for easy customization
const slidingPngConfig = {
    width: '80%',           // Width of the PNG container (desktop)
    height: '70%',          // Height of the PNG container (desktop)
    slideInDelay: 500,      // Delay before sliding in (ms)
    slideOutDelay: 5000,    // Delay after sliding in before sliding out (5 seconds)
    animationDuration: 1500, // Duration of slide animation (slower)
    autoSlideOut: true,     // Whether to automatically slide out
    scrollTrigger: true     // Whether to re-trigger on scroll
};

// Track animation state
let pngAnimationState = {
    hasSlideIn: false,
    isVisible: false,
    isAnimating: false,     // Track if currently animating
    slideOutTimer: null,
    heroSection: null,
    observer: null
};

// Function to apply custom sizing
function applySlidingPngConfig() {
    const container = document.querySelector('.sliding-png-container');
    if (container) {
        // Only apply desktop sizes via JS, mobile handled by CSS
        if (window.innerWidth >= 768) {
            container.style.width = slidingPngConfig.width;
            container.style.height = slidingPngConfig.height;
        }
        
        // Update CSS transition duration
        const png = document.querySelector('.sliding-png');
        if (png) {
            const duration = `${slidingPngConfig.animationDuration}ms`;
            png.style.transitionDuration = duration;
            // Set both transform and opacity transitions
            png.style.transition = `transform ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        }
    }
}

// Function to slide PNG in
function slidePngIn() {
    const slidingPng = document.getElementById('slidingPng');
    if (slidingPng && !pngAnimationState.isVisible && !pngAnimationState.isAnimating) {
        // console.log('Sliding PNG in...');
        
        pngAnimationState.isAnimating = true;
        
        // Clear any existing slide out timer
        if (pngAnimationState.slideOutTimer) {
            clearTimeout(pngAnimationState.slideOutTimer);
            pngAnimationState.slideOutTimer = null;
        }
        
        // Remove slide-out class first
        slidingPng.classList.remove('slide-out');
        
        // Force a reflow to ensure the removal takes effect
        slidingPng.offsetHeight;
        
        // Add slide-in class
        slidingPng.classList.add('slide-in');
        
        // Update state
        pngAnimationState.isVisible = true;
        pngAnimationState.hasSlideIn = true;
        
        // Wait for animation to complete before allowing other animations
        setTimeout(() => {
            pngAnimationState.isAnimating = false;
        }, slidingPngConfig.animationDuration);
        
        // Set timer to slide out after specified delay
        if (slidingPngConfig.autoSlideOut) {
            pngAnimationState.slideOutTimer = setTimeout(() => {
                slidePngOut();
            }, slidingPngConfig.slideOutDelay);
        }
    }
}

// Function to slide PNG out - Fixed to properly slide out smoothly
function slidePngOut() {
    const slidingPng = document.getElementById('slidingPng');
    if (slidingPng && pngAnimationState.isVisible && !pngAnimationState.isAnimating) {
        // console.log('Sliding PNG out...');
        
        pngAnimationState.isAnimating = true;
        
        // Clear the slide out timer
        if (pngAnimationState.slideOutTimer) {
            clearTimeout(pngAnimationState.slideOutTimer);
            pngAnimationState.slideOutTimer = null;
        }
        
        // Remove slide-in class first
        slidingPng.classList.remove('slide-in');
        
        // Force a reflow to ensure the removal takes effect
        slidingPng.offsetHeight;
        
        // Add slide-out class
        slidingPng.classList.add('slide-out');
        
        // Update state
        pngAnimationState.isVisible = false;
        
        // Wait for animation to complete before allowing other animations
        setTimeout(() => {
            pngAnimationState.isAnimating = false;
        }, slidingPngConfig.animationDuration);
    }
}

// Function to reset animation state (for scroll trigger)
function resetPngAnimation() {
    // console.log('Resetting PNG animation...');
    
    const slidingPng = document.getElementById('slidingPng');
    if (slidingPng) {
        // Clear timers and state
        if (pngAnimationState.slideOutTimer) {
            clearTimeout(pngAnimationState.slideOutTimer);
            pngAnimationState.slideOutTimer = null;
        }
        
        pngAnimationState.hasSlideIn = false;
        pngAnimationState.isVisible = false;
        pngAnimationState.isAnimating = false;
        
        // Remove all animation classes
        slidingPng.classList.remove('slide-in', 'slide-out');
        
        // Force a reflow
        slidingPng.offsetHeight;
    }
}

// Enhanced typing function with PNG animations
function typeCharWithPng() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const text = "Empowering individuals through transformative online and Live self-development programs.";
    let currentCharIndex = 0;

    function typeChar() {
        if (currentCharIndex < text.length) {
            typingText.textContent = text.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            const nextDelay = text[currentCharIndex - 1] === ' ' ? 20 : 40;
            setTimeout(typeChar, nextDelay);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                typingText.classList.add('typing-complete');
            }, 1000);
        }
    }

    // Start typing
    typeChar();
}

// Intersection Observer for scroll-based triggering
function setupScrollTrigger() {
    if (!slidingPngConfig.scrollTrigger) return;
    
    pngAnimationState.heroSection = document.querySelector('.hero');
    if (!pngAnimationState.heroSection) return;

    // Create intersection observer
    pngAnimationState.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero section is visible
                console.log('Hero section visible, triggering PNG slide in...');
                if (!pngAnimationState.hasSlideIn || !pngAnimationState.isVisible) {
                    setTimeout(() => {
                        slidePngIn();
                    }, slidingPngConfig.slideInDelay);
                }
            } else {
                // Hero section is not visible - reset for next time
                console.log('Hero section not visible, resetting PNG...');
                if (pngAnimationState.hasSlideIn) {
                    setTimeout(() => {
                        resetPngAnimation();
                    }, 500); // Small delay to avoid flickering
                }
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of hero section is visible
        rootMargin: '0px'
    });

    // Start observing
    pngAnimationState.observer.observe(pngAnimationState.heroSection);
}

// Initialize sliding PNG functionality
function initSlidingPng() {
    // console.log('Initializing sliding PNG...');
    
    // Apply configuration
    applySlidingPngConfig();
    
    // Setup scroll trigger
    setupScrollTrigger();
    
    // Initial slide in after delay (only if hero section is in view)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isInView) {
            // console.log('Hero in view, starting initial slide in...');
            setTimeout(() => {
                slidePngIn();
            }, slidingPngConfig.slideInDelay);
        }
    }
    
    // Start typing animation if element exists
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        setTimeout(() => {
            typeCharWithPng();
        }, 1200);
    }
}

// Cleanup function
function cleanupSlidingPng() {
    if (pngAnimationState.observer) {
        pngAnimationState.observer.disconnect();
    }
    if (pngAnimationState.slideOutTimer) {
        clearTimeout(pngAnimationState.slideOutTimer);
    }
}

// Handle window resize to reapply config
function handleResize() {
    applySlidingPngConfig();
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sliding PNG
    initSlidingPng();
});

// Handle resize events
window.addEventListener('resize', handleResize);

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupSlidingPng);

// Placeholder for scrollToServices function (add your existing implementation)
function scrollToServices() {
    // Add your scroll to services functionality here
    // console.log('Scrolling to services...');
}

// Enhanced utility functions for manual control
window.slidingPngUtils = {
    slideIn: slidePngIn,
    slideOut: slidePngOut,
    reset: resetPngAnimation,
    updateConfig: function(newConfig) {
        Object.assign(slidingPngConfig, newConfig);
        applySlidingPngConfig();
        
        // Restart scroll trigger if changed
        if (newConfig.hasOwnProperty('scrollTrigger')) {
            cleanupSlidingPng();
            setupScrollTrigger();
        }
    },
    getCurrentConfig: function() {
        return { ...slidingPngConfig };
    },
    getState: function() {
        return { ...pngAnimationState };
    },
    forceSlideIn: function() {
        resetPngAnimation();
        setTimeout(() => slidePngIn(), 100);
    },
    forceSlideOut: function() {
        slidePngOut();
    },
    // New utility functions
    isAnimating: function() {
        return pngAnimationState.isAnimating;
    },
    isVisible: function() {
        return pngAnimationState.isVisible;
    }
};

// Enhanced class-based controller with fixed slide out
class EnhancedSlidingPngController {
    constructor(elementId, config = {}) {
        this.element = document.getElementById(elementId);
        this.container = this.element?.parentElement;
        this.config = { ...slidingPngConfig, ...config };
        this.isVisible = false;
        this.hasSlideIn = false;
        this.isAnimating = false;
        this.slideOutTimer = null;
        this.observer = null;
        
        this.init();
    }
    
    init() {
        if (this.container && this.element) {
            this.applyConfig();
            if (this.config.scrollTrigger) {
                this.setupScrollTrigger();
            }
        }
    }
    
    applyConfig() {
        if (window.innerWidth >= 768) {
            this.container.style.width = this.config.width;
            this.container.style.height = this.config.height;
        }
        const duration = `${this.config.animationDuration}ms`;
        this.element.style.transition = `transform ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }
    
    slideIn() {
        if (this.element && !this.isVisible && !this.isAnimating) {
            this.isAnimating = true;
            
            if (this.slideOutTimer) {
                clearTimeout(this.slideOutTimer);
                this.slideOutTimer = null;
            }
            
            this.element.classList.remove('slide-out');
            this.element.offsetHeight; // Force reflow
            this.element.classList.add('slide-in');
            
            this.isVisible = true;
            this.hasSlideIn = true;
            
            setTimeout(() => {
                this.isAnimating = false;
            }, this.config.animationDuration);
            
            if (this.config.autoSlideOut) {
                this.slideOutTimer = setTimeout(() => {
                    this.slideOut();
                }, this.config.slideOutDelay);
            }
        }
    }
    
    slideOut() {
        if (this.element && this.isVisible && !this.isAnimating) {
            this.isAnimating = true;
            
            if (this.slideOutTimer) {
                clearTimeout(this.slideOutTimer);
                this.slideOutTimer = null;
            }
            
            this.element.classList.remove('slide-in');
            this.element.offsetHeight; // Force reflow
            this.element.classList.add('slide-out');
            
            this.isVisible = false;
            
            setTimeout(() => {
                this.isAnimating = false;
            }, this.config.animationDuration);
        }
    }
    
    reset() {
        if (this.slideOutTimer) {
            clearTimeout(this.slideOutTimer);
            this.slideOutTimer = null;
        }
        
        this.hasSlideIn = false;
        this.isVisible = false;
        this.isAnimating = false;
        
        if (this.element) {
            this.element.classList.remove('slide-in', 'slide-out');
            this.element.offsetHeight; // Force reflow
        }
    }
    
    setupScrollTrigger() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.hasSlideIn || !this.isVisible) {
                        setTimeout(() => {
                            this.slideIn();
                        }, this.config.slideInDelay);
                    }
                } else {
                    if (this.hasSlideIn) {
                        setTimeout(() => {
                            this.reset();
                        }, 500);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });

        this.observer.observe(heroSection);
    }
    
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        this.applyConfig();
        
        if (newConfig.hasOwnProperty('scrollTrigger')) {
            if (this.observer) {
                this.observer.disconnect();
            }
            if (this.config.scrollTrigger) {
                this.setupScrollTrigger();
            }
        }
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.slideOutTimer) {
            clearTimeout(this.slideOutTimer);
        }
    }
}

// Example usage of the enhanced class-based approach:
// const pngController = new EnhancedSlidingPngController('slidingPng', {
//     width: '90%',
//     height: '80%',
//     slideOutDelay: 3000,
//     scrollTrigger: true
// });