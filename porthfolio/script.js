// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initScrollAnimations();
    initTypewriter();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initStatsCounter();
    
    // Add initial animations
    animateElementsOnLoad();
});

// Navigation Functions
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on element
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animated');
                }
                if (entry.target.classList.contains('section-subtitle')) {
                    entry.target.classList.add('animated');
                }
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.style.width;
                    entry.target.style.setProperty('--target-width', width);
                    entry.target.classList.add('animated');
                }
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Add general fade-in animation
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section-title, .section-subtitle, .skill-progress, .stat-number, .project-card, .timeline-content').forEach(el => {
        observer.observe(el);
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    const texts = ['Web Design & Development', 'Health Information Systems', 'Technology Enthusiast', 'Healthcare Innovator'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if text is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Project Filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#f44336';
                    isValid = false;
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // In a real application, you would send data to a server here
                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Reset border colors
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#4CAF50';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        // Set initial value to 0
        stat.textContent = '0';
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.classList.remove('loading');
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
    
    // Add loading indicator
    element.classList.add('loading');
}

// Initial Load Animations
function animateElementsOnLoad() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
    
    // Animate hero image
    const heroImage = document.querySelector('.image-frame');
    if (heroImage) {
        heroImage.classList.add('fade-in-right');
        heroImage.style.animationDelay = '0.5s';
    }
}

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && emailInput.value.includes('@')) {
                // Simulate subscription
                const submitBtn = this.querySelector('button');
                const originalHTML = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    alert('Thank you for subscribing to my newsletter!');
                    emailInput.value = '';
                    submitBtn.innerHTML = originalHTML;
                }, 1000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});