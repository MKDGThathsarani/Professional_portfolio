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
    
    // Initialize resources page components if on resources page
    if (window.location.pathname.includes('resources.html') || 
        document.querySelector('.publications-filters') || 
        document.querySelector('.blog-filters')) {
        initResourceFilters();
        initResourcesAnimations();
    }
    
    // Add initial animations
    animateElementsOnLoad();
});

// Navigation Functions
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle) return;
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                link.getAttribute('href') === `index.html#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on element
                if (entry.target.classList.contains('section-title') || 
                    entry.target.classList.contains('section-subtitle')) {
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
                
                // Add general fade-in animation for cards
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('timeline-content') ||
                    entry.target.classList.contains('certification-card') ||
                    entry.target.classList.contains('download-card')) {
                    entry.target.classList.add('fade-in-up');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section-title, .section-subtitle, .skill-progress, .stat-number, .project-card, .timeline-content, .certification-card, .download-card').forEach(el => {
        observer.observe(el);
    });
}

// Typewriter Effect - Updated with LinkedIn About content
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;
    
    const texts = [
        'Information Systems Designer',
        'System Design & Requirements Analyst',
        'Frontend Web Developer',
        'Healthcare Technology Enthusiast',
        'Building Smarter Solutions'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Project Filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
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
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                inputs.forEach(input => {
                    input.style.borderColor = '';
                });
            }, 1500);
        }
    });
    
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

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
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
        stat.textContent = '0';
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
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
    
    element.classList.add('loading');
}

// Initial Load Animations
function animateElementsOnLoad() {
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
    
    const heroImage = document.querySelector('.image-frame');
    if (heroImage) {
        heroImage.classList.add('fade-in-right');
        heroImage.style.animationDelay = '0.5s';
    }
}

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value && emailInput.value.includes('@')) {
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
});

// Filter functionality for Resources page
function initResourceFilters() {
    // Publication filters
    const pubFilterButtons = document.querySelectorAll('.publications-filters .filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    pubFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            pubFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            publicationCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Blog filters
    const blogFilterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const shouldShow = filterValue === 'all' || categories.includes(filterValue);
                
                if (shouldShow) {
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

// Initialize animations for resources page
function initResourcesAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('certification-card') ||
                    entry.target.classList.contains('download-card') ||
                    entry.target.classList.contains('publication-card') ||
                    entry.target.classList.contains('blog-card') ||
                    entry.target.classList.contains('stat-card')) {
                    entry.target.classList.add('animated');
                    
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber) {
                        animateCounter(statNumber);
                    }
                }
                
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('fade-in-up');
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.certification-card, .download-card, .publication-card, .blog-card, .stat-card, .blog-cta').forEach(el => {
        observer.observe(el);
    });
}