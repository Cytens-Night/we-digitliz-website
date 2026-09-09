/**
 * We Digitliz - Main JavaScript
 * This file handles all animations, interactions, and logic for the website.
 */

// ==========================================================================
// 1. Loader Controller
// ==========================================================================
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress-fill');
    const body = document.body;

    if (!loader || !progressBar) {
        initAfterLoad();
        return;
    }

    // Ensure scroll is locked during load
    body.style.overflow = 'hidden';

    // Start progress animation
    let progress = 0;
    const duration = 2500; // 2.5 seconds
    const interval = 20; // 50fps
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
        progress += increment;
        
        // Easing function for progress (ease-out)
        const easeProgress = 1 - Math.pow(1 - (progress / 100), 3);
        progressBar.style.width = `${Math.min(easeProgress * 100, 100)}%`;

        if (progress >= 100) {
            clearInterval(progressTimer);
            
            // Add loaded class to body
            body.classList.add('loaded');
            body.style.overflow = '';
            
            // Fade out loader
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease';
            
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger hero animations or other initialization after loader
                initAfterLoad();
            }, 600);
        }
    }, interval);
}

// ==========================================================================
// 2. Particle System
// ==========================================================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 200 };
        this.connectionDistance = 150;
        this.isMobile = window.innerWidth < 768;
        
        // Count based on screen size
        this.particleCount = this.isMobile ? 40 : (window.innerWidth > 1440 ? 120 : 80);
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        if (!this.isMobile) {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
        
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.isMobile = window.innerWidth < 768;
        this.particleCount = this.isMobile ? 40 : (window.innerWidth > 1440 ? 120 : 80);
        
        // Recreate particles if array size differs much
        if (Math.abs(this.particles.length - this.particleCount) > 20) {
            this.createParticles();
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const radius = Math.random() * 2 + 1;
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: radius,
            baseRadius: radius,
            color: Math.random() > 0.5 ? '#863bff' : '#47bfff',
            opacity: Math.random() * 0.5 + 0.1
        };
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // Movement
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            // Mouse interaction (repel)
            if (!this.isMobile && this.mouse.x != null && this.mouse.y != null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    
                    const pushFactor = 2; // adjust push strength
                    p.x -= forceDirectionX * force * pushFactor;
                    p.y -= forceDirectionY * force * pushFactor;
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            
            // Set fill style with opacity
            let hex = p.color;
            let r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
                
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
            this.ctx.fill();
        }
        
        this.connectParticles();
    }

    connectParticles() {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a + 1; b < this.particles.length; b++) {
                let p1 = this.particles[a];
                let p2 = this.particles[b];
                
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    let opacity = 1 - (distance / this.connectionDistance);
                    
                    // Create gradient line
                    let gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    gradient.addColorStop(0, this.hexToRgba(p1.color, opacity * 0.5));
                    gradient.addColorStop(1, this.hexToRgba(p2.color, opacity * 0.5));
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    hexToRgba(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
    }
}

// ==========================================================================
// 3. Scroll Reveal System
// ==========================================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const target = entry.target;
            
            // Check if it's a stagger container
            if (target.classList.contains('reveal-stagger')) {
                target.classList.add('active');
                
                // Find all direct children that need staggered reveal
                const children = Array.from(target.children);
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 100);
                });
            } else {
                target.classList.add('active');
            }
            
            // Stop observing once revealed
            observer.unobserve(target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ==========================================================================
// 4. Navbar Controller
// ==========================================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCta = document.querySelector('.nav-cta');
    const sections = document.querySelectorAll('section[id]');
    
    if (!navbar) return;

    // Scroll Detection for styling
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                lastScrollY = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Mobile menu toggle
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMobile && navMobile.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMobile.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                smoothScrollTo(href.substring(1));
            }
        });
    });

    // CTA Button
    if (navCta) {
        navCta.addEventListener('click', (e) => {
            const href = navCta.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href.substring(1));
            } else {
                e.preventDefault();
                smoothScrollTo('contact');
            }
        });
    }

    // Active link highlighting using IntersectionObserver
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// ==========================================================================
// 5. Counter Animation
// ==========================================================================
function initCounters() {
    // HTML structure: .stat-number > span[data-count] + suffix text (+ or %)
    const counterSpans = document.querySelectorAll('[data-count]');
    if (!counterSpans.length) return;

    const easeOutExpo = (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animateValue = (span, start, end, duration) => {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const easedProgress = easeOutExpo(progress);
            const currentVal = Math.floor(easedProgress * (end - start) + start);
            
            span.textContent = currentVal.toString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                span.textContent = end.toString();
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const span = entry.target;
                const endVal = parseInt(span.getAttribute('data-count'), 10) || 0;
                
                animateValue(span, 0, endVal, 2000);
                obs.unobserve(span);
            }
        });
    }, { threshold: 0.5 });

    counterSpans.forEach(span => {
        observer.observe(span);
    });
}

// ==========================================================================
// 6. Process Timeline Animation
// ==========================================================================
function initProcessTimeline() {
    const processSection = document.getElementById('process');
    const processLine = document.querySelector('.process-line');
    const steps = document.querySelectorAll('.process-step');
    
    if (!processSection || !processLine || !steps.length) return;

    let ticking = false;

    const handleScroll = () => {
        const rect = processSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far we've scrolled into the section
        // Start animating when top of section is 80% down the viewport
        const startOffset = windowHeight * 0.8;
        const progress = Math.max(0, Math.min(1, (startOffset - rect.top) / (rect.height * 0.8)));
        
        // Update line height (assuming vertical line)
        processLine.style.height = `${progress * 100}%`;
        
        // Activate steps as line reaches them
        steps.forEach((step, index) => {
            // Calculate approximate threshold for each step
            const threshold = (index + 0.5) / steps.length;
            if (progress > threshold) {
                step.classList.add('active');
            } else {
                // Optional: remove class if scrolling up
                // step.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    handleScroll();
}

// ==========================================================================
// 7. Contact Form Handler
// ==========================================================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Floating label animation logic
    inputs.forEach(input => {
        // Init check
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');
        
        const validateField = (field, validationFn) => {
            if (!field) return;
            const parent = field.parentElement;
            let errorEl = parent.querySelector('.error-message');
            
            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.classList.add('error-message');
                errorEl.style.color = '#ff4757';
                errorEl.style.fontSize = '12px';
                errorEl.style.position = 'absolute';
                errorEl.style.bottom = '-18px';
                errorEl.style.left = '0';
                parent.style.position = 'relative';
                parent.appendChild(errorEl);
            }
            
            const result = validationFn(field.value);
            if (result !== true) {
                errorEl.textContent = result;
                field.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                errorEl.textContent = '';
                field.style.borderColor = '';
            }
        };
        
        validateField(name, val => val.trim().length > 0 ? true : 'Name is required');
        
        validateField(email, val => {
            if (val.trim().length === 0) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(val) ? true : 'Invalid email format';
        });
        
        validateField(message, val => val.trim().length > 0 ? true : 'Message is required');
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#10ac84'; // Success green
                submitBtn.style.borderColor = '#10ac84';
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Revert button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 3000);
            }, 1500);
        }
    });
}

// ==========================================================================
// 8. Smooth Scroll Helper
// ==========================================================================
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - navHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ==========================================================================
// 9. Magnetic Button Effects
// ==========================================================================
function initMagneticButtons() {
    // Only apply on desktop
    if (window.innerWidth < 1024) return;
    
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max movement (px)
            const maxMove = 5;
            
            const moveX = ((x - centerX) / centerX) * maxMove;
            const moveY = ((y - centerY) / centerY) * maxMove;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Remove transition after spring back
            setTimeout(() => {
                btn.style.transition = '';
            }, 300);
        });
    });
}

// ==========================================================================
// 10. Parallax Glow Orbs
// ==========================================================================
function initParallaxGlows() {
    const glows = document.querySelectorAll('.hero-glow-1, .hero-glow-2, .contact-glow');
    if (!glows.length) return;
    
    // Scroll parallax
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                glows.forEach((glow, index) => {
                    const multiplier = index % 2 === 0 ? 0.2 : -0.15;
                    // Apply translation but preserve other transforms if any
                    glow.style.transform = `translateY(${scrollY * multiplier}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mouse move subtle shift
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            glows.forEach((glow, index) => {
                const maxMove = index % 2 === 0 ? 20 : -30;
                const currentTransform = glow.style.transform.replace(/translateX\(.*?\)/, ''); // Clean up previous mouse transforms
                
                // We combine scroll transform with mouse transform
                // Better approach: use a container for scroll, inner for mouse. 
                // For simplicity, we just add margins or translate3d
                // Let's use margin left/top for mouse to not conflict with scroll transform
                glow.style.marginLeft = `${mouseX * maxMove}px`;
                glow.style.marginTop = `${mouseY * maxMove}px`;
            });
        });
    }
}

// ==========================================================================
// 11. Industry Card Hover Effects
// ==========================================================================
function initIndustryCards() {
    // Only apply on desktop
    if (window.innerWidth < 1024) return;
    
    const cards = document.querySelectorAll('.industry-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation degrees
            const maxRotate = 5;
            
            const rotateX = -((y - centerY) / centerY) * maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            // Add a subtle glare effect if desired (would need a glare element inside)
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// ==========================================================================
// 12. Main Init
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Start loader first
    initLoader();
});

// Called automatically after loader completes, or immediately if no loader
function initAfterLoad() {
    // 1. Particle Background
    const particles = new ParticleSystem('hero-particles');
    
    // 2. Scroll Reveal animations
    initScrollReveal();
    
    // 3. Navbar scroll/mobile behavior
    initNavbar();
    
    // 4. Counter stats
    initCounters();
    
    // 5. Process timeline
    initProcessTimeline();
    
    // 6. Contact form logic
    initContactForm();
    
    // 7. Interactive effects (desktop mostly)
    initMagneticButtons();
    initParallaxGlows();
    initIndustryCards();
    
    // Log init success
    console.log('We Digitliz initialized successfully.');
}
