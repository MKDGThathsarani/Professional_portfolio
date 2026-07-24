// ============================================================
// DOM CONTENT LOADED
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initTypewriter();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initStatsCounter();
    initThemeToggle();
    initGitHubAPI();
    initProjectModal();
    initNewsletterForm();
    
    // Initialize Resources components
    initResourceFilters();
    initResourcesAnimations();
    
    // ===== NEW FEATURES =====
    initCustomCursor();
    initScrollProgress();
    initAccordion();
    initJourneyTimeline();
    initEnhancedProjectFilters();
    initParallax();
    
    // Add initial animations
    animateElementsOnLoad();
});

// ============================================================
// NAVIGATION
// ============================================================
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle) return;
    
    mobileToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', isOpen);
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Update active nav link on scroll (Scrollspy)
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
            link.removeAttribute('aria-current');
            const href = link.getAttribute('href');
            if (href === `#${current}` || href === `index.html#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
                
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('timeline-content') ||
                    entry.target.classList.contains('certification-card') ||
                    entry.target.classList.contains('download-card') ||
                    entry.target.classList.contains('github-repo') ||
                    entry.target.classList.contains('publication-card') ||
                    entry.target.classList.contains('blog-card') ||
                    entry.target.classList.contains('journey-item')) {
                    entry.target.classList.add('fade-in-up');
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-title, .section-subtitle, .skill-progress, .stat-number, .project-card, .timeline-content, .certification-card, .download-card, .github-repo, .publication-card, .blog-card, .journey-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
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

// ============================================================
// PROJECT FILTERS
// ============================================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!filterButtons.length || !projectsGrid) return;
    
    const projects = [
        {
            id: 1,
            title: 'StudentHub - University Portal',
            description: 'A comprehensive web application designed to streamline student academic organization—managing timetables 📅, assignments 📝, study resources 📚, and school events 🎉.',
            category: 'web edu',
            image: 'Project_PNG/Student%20Hub.jpeg',
            tags: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'System Design'],
            featured: true
        },
        {
            id: 2,
            title: 'ChargeNET - EV Charging Solution',
            description: 'A comprehensive platform for electric vehicle charging station management with real-time monitoring and payment integration.',
            category: 'tech',
            image: 'Project_PNG/tp1.jpg',
            tags: ['JavaScript', 'React', 'Node.js', 'System Design'],
            featured: false
        },
        {
            id: 3,
            title: 'MindMeister - Python Education',
            description: 'A program to teach Python lessons for students preparing for Advanced Level examinations at Gampaha Anura Madhya Maha Vidyalaya.',
            category: 'edu',
            image: 'Project_PNG/tp2.jpg',
            tags: ['Python', 'Education', 'Tutoring'],
            featured: false
        },
        {
            id: 4,
            title: 'TechBridge Classroom',
            description: 'An initiative to bridge the gap between technology education and industry needs through workshops and field visits.',
            category: 'tech',
            image: 'Project_PNG/tp3.jpg',
            tags: ['Workshops', 'Industry Visit', 'Electronics'],
            featured: false
        },
        {
            id: 5,
            title: 'Other Buddy - Food Delivery Platform',
            description: 'A responsive food delivery website featuring restaurant listings, online ordering, real-time tracking, and secure payment processing.',
            category: 'web',
            image: 'Project_PNG/Other%20Buddy\'s.jpeg',
            tags: ['HTML/CSS', 'JavaScript', 'Responsive', 'UI/UX'],
            featured: false
        },
        {
            id: 6,
            title: 'Pharmacy Management System',
            description: 'An online pharmacy platform with medicine catalog, prescription management, inventory tracking, and online consultation features.',
            category: 'web health',
            image: 'Project_PNG/Pharmacy.jpeg',
            tags: ['HTML/CSS', 'JavaScript', 'Healthcare', 'E-commerce'],
            featured: false
        }
    ];
    
    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category.includes(filter));
        projectsGrid.innerHTML = filtered.map(project => `
            <div class="project-card ${project.featured ? 'featured' : ''}" data-category="${project.category}" data-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <button class="project-link" data-id="${project.id}"><i class="fas fa-expand"></i></button>
                    </div>
                    ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.project-link').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                const project = projects.find(p => p.id === id);
                if (project) openProjectModal(project);
            });
        });
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const project = projects.find(p => p.id === id);
                if (project) openProjectModal(project);
            });
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filterValue = this.dataset.filter;
            renderProjects(filterValue);
        });
    });
    
    renderProjects('all');
}

// ============================================================
// PROJECT MODAL
// ============================================================
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeProjectModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeProjectModal();
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    if (!modal || !title || !body) return;
    
    title.textContent = project.title;
    body.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <p style="color: var(--text-secondary); line-height: 1.8;">${project.description}</p>
        <div class="modal-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <div style="margin-top: 20px;">
            <a href="https://github.com/MKDGThathsarani?tab=repositories" target="_blank" class="btn-primary" style="display: inline-block;">View on GitHub</a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// GITHUB API INTEGRATION
// ============================================================
function initGitHubAPI() {
    const container = document.getElementById('githubRepos');
    if (!container) return;
    
    const username = 'MKDGThathsarani';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('GitHub API request failed');
            return response.json();
        })
        .then(repos => {
            container.innerHTML = repos.map(repo => `
                <div class="github-repo fade-in-up">
                    <h3><i class="fas fa-book" aria-hidden="true"></i> ${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-meta">
                        ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                        <span><i class="fas fa-star" aria-hidden="true"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-fork" aria-hidden="true"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-calendar" aria-hidden="true"></i> ${new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('GitHub API Error:', error);
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--gray-color);">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    <p>Unable to load repositories. Please try again later.</p>
                    <a href="https://github.com/${username}?tab=repositories" target="_blank" class="btn-secondary" style="margin-top: 15px; display: inline-block;">View on GitHub</a>
                </div>
            `;
        });
}

// ============================================================
// THEME TOGGLE
// ============================================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (!icon) return;
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================================
// CONTACT FORM
// ============================================================
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
                input.style.borderColor = '';
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
                this.style.borderColor = '';
            }
        });
    });
}

// ============================================================
// NEWSLETTER FORM
// ============================================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
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
}

// ============================================================
// BACK TO TOP
// ============================================================
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

// ============================================================
// STATS COUNTER
// ============================================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.textContent = '0';
    });
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    if (isNaN(target) || target === 0) return;
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

// ============================================================
// INITIAL LOAD ANIMATIONS
// ============================================================
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

// ============================================================
// RESOURCES FILTERS
// ============================================================
function initResourceFilters() {
    // Publication filters
    const pubFilterButtons = document.querySelectorAll('.publications-filters .filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    pubFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            pubFilterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filterValue = this.dataset.filter;
            
            publicationCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
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
            blogFilterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filterValue = this.dataset.filter;
            
            blogCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
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

// ============================================================
// RESOURCES ANIMATIONS
// ============================================================
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
                    if (statNumber && statNumber.dataset.count) {
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

// ============================================================
// ===== NEW FEATURES =====
// ============================================================

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !dot) return;
    
    // Show cursor only on desktop
    if (window.innerWidth > 1024) {
        cursor.style.display = 'block';
        dot.style.display = 'block';
    }
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });
    
    // Hover effects on interactive elements
    document.querySelectorAll('a, button, .project-card, .timeline-content, .certification-card, .download-card, .blog-card, .social-link, .accordion-header, .journey-content').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercent = (scrollTop / docHeight) * 100;
        progress.style.width = progressPercent + '%';
    });
}

// ===== ACCORDION / EXPANDABLE SECTIONS =====
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all siblings
            const parent = item.parentElement;
            if (parent) {
                parent.querySelectorAll('.accordion-item').forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active');
                    }
                });
            }
            
            // Toggle current
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// ===== JOURNEY TIMELINE ANIMATIONS =====
function initJourneyTimeline() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('animated');
                
                // Animate progress bars
                const progress = item.querySelector('.journey-progress');
                if (progress) {
                    const width = progress.style.width;
                    if (width) {
                        progress.style.setProperty('--target-width', width);
                        // Trigger reflow for animation
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 50);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.journey-item').forEach(item => {
        observer.observe(item);
    });
}

// ===== ENHANCED PROJECT FILTERS =====
function initEnhancedProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            projectCards.forEach(card => {
                const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
                if (filter === 'all' || categories.includes(filter)) {
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

// ===== PARALLAX EFFECT ON HERO =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });
}