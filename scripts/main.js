// Main JavaScript file for QAPY Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('QAPY Website loaded successfully');
    
    // Initialize responsive and mobile optimizations
    initResponsiveOptimizations();
    
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize intersection observer for animations (will be used in later tasks)
    initScrollAnimations();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize image optimization features
    initImageOptimization();
    
    // Initialize scroll spy for navigation
    initScrollSpy();
    
    // Initialize service cards
    initServiceCards();
    
    // Initialize case studies functionality
    initCaseStudies();
    
    // Initialize contact form (Task 8.1)
    initContactForm();
    
    // Initialize WhatsApp integration (Task 8.2)
    initWhatsAppIntegration();
    
    // Initialize mobile-specific features
    initMobileOptimizations();
    
    // Initialize accessibility features
    initAccessibilityFeatures();
    
    // Initialize micro-interactions and enhanced effects
    initMicroInteractions();
});

// Initialize accessibility features
function initAccessibilityFeatures() {
    // Add keyboard navigation support for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const ctaLink = card.querySelector('.service-card-cta');
                if (ctaLink) {
                    ctaLink.click();
                }
            }
        });
    });
    
    // Add focus management for modals (when implemented)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close any open modals
            const openModals = document.querySelectorAll('.modal:not(.hidden)');
            openModals.forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
    
    // Enhance form accessibility
    enhanceFormAccessibility();
    
    // Add reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }
}

// Enhance form accessibility
function enhanceFormAccessibility() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(input);
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            if (input.classList.contains('border-red-500')) {
                input.classList.remove('border-red-500');
                input.setAttribute('aria-invalid', 'false');
                
                const errorElement = document.getElementById(input.id + '-error');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.add('hidden');
                }
            }
        });
    });
}

// Validate single form field
function validateSingleField(field) {
    const errorElement = document.getElementById(field.id + '-error');
    let isValid = true;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        if (errorElement) {
            errorElement.textContent = `${field.labels[0].textContent.replace('*', '').trim()} es requerido`;
            errorElement.classList.remove('hidden');
        }
    } else if (field.type === 'email' && field.value && !validateEmail(field.value)) {
        isValid = false;
        if (errorElement) {
            errorElement.textContent = 'Por favor, ingresa un email válido';
            errorElement.classList.remove('hidden');
        }
    } else {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
        }
    }
    
    field.classList.toggle('border-red-500', !isValid);
    field.setAttribute('aria-invalid', !isValid);
    
    return isValid;
}

// Initialize navigation functionality
function initNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuButton.querySelector('.block');
    const closeIcon = mobileMenuButton.querySelector('.hidden');
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icons
        hamburgerIcon.classList.toggle('hidden');
        hamburgerIcon.classList.toggle('block');
        closeIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('block');
        
        // Update aria-expanded attribute
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close the mobile menu
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('hidden');
            hamburgerIcon.classList.add('block');
            closeIcon.classList.add('hidden');
            closeIcon.classList.remove('block');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('hidden');
            hamburgerIcon.classList.add('block');
            closeIcon.classList.add('hidden');
            closeIcon.classList.remove('block');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // Close mobile menu with Escape key
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
            mobileMenuButton.focus();
        }
        
        // Handle Enter and Space key for mobile menu button
        if ((event.key === 'Enter' || event.key === ' ') && event.target === mobileMenuButton) {
            event.preventDefault();
            mobileMenuButton.click();
        }
        
        // Trap focus within mobile menu when open
        if (!mobileMenu.classList.contains('hidden')) {
            trapFocusInMobileMenu(event);
        }
    });
    
    // Helper function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        hamburgerIcon.classList.add('block');
        closeIcon.classList.add('hidden');
        closeIcon.classList.remove('block');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
    
    // Focus trap for mobile menu
    function trapFocusInMobileMenu(event) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    // Handle navigation scroll behavior
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity based on scroll position
        if (scrollTop > 50) {
            nav.classList.add('bg-gray-900');
            nav.classList.remove('bg-gray-900/95');
        } else {
            nav.classList.remove('bg-gray-900');
            nav.classList.add('bg-gray-900/95');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Enhanced smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed navigation
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20; // 20px extra padding
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === activeId) {
            link.classList.add('text-accent-blue');
            link.classList.remove('text-gray-300');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('text-accent-blue');
            link.classList.add('text-gray-300');
            link.removeAttribute('aria-current');
        }
    });
    
    // Announce section change to screen readers
    announceToScreenReader(`Navegando a la sección: ${getSectionTitle(activeId)}`);
}

// Get section title for screen reader announcements
function getSectionTitle(sectionId) {
    const sectionTitles = {
        'hero': 'Inicio',
        'servicios': 'Servicios',
        'nosotros': 'Quiénes somos',
        'proceso': 'Cómo trabajamos',
        'casos': 'Casos de estudio',
        'contacto': 'Contacto'
    };
    return sectionTitles[sectionId] || sectionId;
}

// Announce messages to screen readers
function announceToScreenReader(message) {
    const announcements = document.getElementById('sr-announcements');
    if (announcements) {
        announcements.textContent = message;
        // Clear after a short delay to allow for new announcements
        setTimeout(() => {
            announcements.textContent = '';
        }, 1000);
    }
}

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-up animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Observe service cards for staggered animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe case study cards
    const caseStudyCards = document.querySelectorAll('#casos .grid > div');
    caseStudyCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe about section cards
    const aboutCards = document.querySelectorAll('#nosotros .grid > div');
    aboutCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Observe process section cards
    const processCards = document.querySelectorAll('#proceso .grid > div');
    processCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
}

// Initialize lazy loading for images
function initLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const picture = img.closest('picture');
                    
                    // Handle picture element with sources
                    if (picture) {
                        const sources = picture.querySelectorAll('source[data-srcset]');
                        sources.forEach(function(source) {
                            source.srcset = source.dataset.srcset;
                            source.removeAttribute('data-srcset');
                        });
                    }
                    
                    // Load the image
                    if (img.dataset.src) {
                        // Create a new image to preload
                        const newImg = new Image();
                        newImg.onload = function() {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy-loading');
                            img.classList.add('lazy-loaded');
                            console.log('✅ Image loaded successfully:', img.dataset.src || img.src);
                        };
                        newImg.onerror = function() {
                            // Handle error - keep placeholder
                            img.classList.remove('lazy-loading');
                            img.classList.add('lazy-error');
                            console.warn('❌ Failed to load image:', img.dataset.src);
                        };
                        newImg.src = img.dataset.src;
                    }
                    
                    // Handle srcset for responsive images
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // Stop observing this image
                    lazyImageObserver.unobserve(img);
                }
            });
        }, {
            // Load images 100px before they enter the viewport for better UX
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            // Add loading class for styling if not already present
            if (!img.classList.contains('lazy-loading')) {
                img.classList.add('lazy-loading');
            }
            lazyImageObserver.observe(img);
        });
        
        // Also handle regular lazy loading images
        const regularLazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-src])');
        regularLazyImages.forEach(function(img) {
            lazyImageObserver.observe(img);
        });
        
    } else {
        // Fallback for browsers without Intersection Observer
        loadAllImagesImmediately();
    }
}

// Fallback function to load all images immediately
function loadAllImagesImmediately() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
        const picture = img.closest('picture');
        
        // Handle picture element sources
        if (picture) {
            const sources = picture.querySelectorAll('source[data-srcset]');
            sources.forEach(function(source) {
                source.srcset = source.dataset.srcset;
                source.removeAttribute('data-srcset');
            });
        }
        
        // Load the image
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
    });
}

// Image optimization utilities
const ImageOptimizer = {
    // Check if WebP is supported
    supportsWebP: function() {
        return new Promise(function(resolve) {
            const webP = new Image();
            webP.onload = webP.onerror = function() {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },
    
    // Generate optimized image URL based on device capabilities
    getOptimizedImageUrl: function(basePath, width, format) {
        const extension = format || (this.supportsWebP() ? 'webp' : 'jpg');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const optimizedWidth = Math.ceil(width * devicePixelRatio);
        
        // For now, return the base path since we don't have multiple sizes
        // In a real implementation, you'd have different sized images
        return basePath.replace(/\.(jpg|jpeg|png)$/i, `.${extension}`);
    },
    
    // Preload critical images
    preloadCriticalImages: function() {
        const criticalImages = [
            '/assets/case-tech.webp',
            '/assets/case-ai.webp', 
            '/assets/case-media.webp'
        ];
        
        criticalImages.forEach(function(imagePath) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imagePath;
            link.type = 'image/webp';
            document.head.appendChild(link);
        });
    },
    
    // Monitor image loading performance
    monitorImagePerformance: function() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver(function(list) {
                list.getEntries().forEach(function(entry) {
                    if (entry.initiatorType === 'img') {
                        console.log(`Image loaded: ${entry.name} in ${entry.duration.toFixed(2)}ms`);
                    }
                });
            });
            observer.observe({ entryTypes: ['resource'] });
        }
    }
};

// Initialize image optimization features
function initImageOptimization() {
    // Check WebP support and update image sources if needed
    ImageOptimizer.supportsWebP().then(function(supportsWebP) {
        if (!supportsWebP) {
            console.log('WebP not supported, using JPEG fallbacks');
            // The picture element will automatically handle this
        } else {
            console.log('WebP supported, using optimized images');
        }
    });
    
    // Monitor performance in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        ImageOptimizer.monitorImagePerformance();
    }
    
    // Add error handling for failed image loads
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            e.target.classList.add('lazy-error');
        }
    }, true);
}

// Utility function for WhatsApp integration (will be used in task 8)
function openWhatsApp(message = '') {
    const phoneNumber = '5491123456789'; // Replace with actual phone number
    const encodedMessage = encodeURIComponent(message || 'Hola! Me interesa conocer más sobre los servicios de QAPY. ¿Podemos agendar una demo?');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Enhanced form validation with accessibility features
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        const errorElement = document.getElementById(field.id + '-error');
        
        if (!field.value.trim()) {
            // Mark field as invalid
            field.classList.add('border-red-500');
            field.setAttribute('aria-invalid', 'true');
            
            // Show error message
            if (errorElement) {
                errorElement.textContent = `${field.labels[0].textContent.replace('*', '').trim()} es requerido`;
                errorElement.classList.remove('hidden');
            }
            
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            // Validate email format if it's an email field
            if (field.type === 'email' && !validateEmail(field.value)) {
                field.classList.add('border-red-500');
                field.setAttribute('aria-invalid', 'true');
                
                if (errorElement) {
                    errorElement.textContent = 'Por favor, ingresa un email válido';
                    errorElement.classList.remove('hidden');
                }
                
                isValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                // Field is valid
                field.classList.remove('border-red-500');
                field.setAttribute('aria-invalid', 'false');
                
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.add('hidden');
                }
            }
        }
    });
    
    // Focus on first invalid field for accessibility
    if (firstInvalidField) {
        firstInvalidField.focus();
        announceToScreenReader('Por favor, corrige los errores en el formulario');
    }
    
    return isValid;
}

// Email validation utility
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize scroll spy for navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                updateActiveNavLink(activeId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Service Cards Data and Functionality
const servicePractices = [
    {
        id: 1,
        title: "Arquitectura & Integración",
        description: "Diseñamos arquitecturas escalables y conectamos sistemas legacy con tecnologías modernas. APIs robustas, microservicios y patrones cloud-native para transformar tu infraestructura tecnológica.",
        icon: "architecture",
        cta: "Conversemos"
    },
    {
        id: 2,
        title: "Sector Público & Educación",
        description: "Soluciones digitales para gobiernos e instituciones educativas. Plataformas de gestión, portales ciudadanos y herramientas pedagógicas que modernizan la administración pública.",
        icon: "government",
        cta: "Pedir demo"
    },
    {
        id: 3,
        title: "Desarrollo Web & Mobile",
        description: "Aplicaciones web y móviles de alto rendimiento. React, Vue, Flutter y tecnologías nativas para crear experiencias digitales excepcionales que conectan con tus usuarios.",
        icon: "mobile",
        cta: "Conversemos"
    },
    {
        id: 4,
        title: "Inteligencia Artificial",
        description: "Implementamos IA generativa, machine learning y procesamiento de lenguaje natural. Desde chatbots inteligentes hasta sistemas de recomendación que potencian tu negocio.",
        icon: "ai",
        cta: "Pedir demo"
    },
    {
        id: 5,
        title: "DevOps & Cloud",
        description: "Automatización de despliegues, infraestructura como código y optimización cloud. AWS, Azure, GCP con pipelines CI/CD que aceleran tu time-to-market.",
        icon: "cloud",
        cta: "Conversemos"
    },
    {
        id: 6,
        title: "Data Analytics & BI",
        description: "Transformamos datos en insights accionables. Dashboards interactivos, análisis predictivo y visualizaciones que impulsan decisiones estratégicas basadas en datos.",
        icon: "analytics",
        cta: "Pedir demo"
    },
    {
        id: 7,
        title: "E-commerce & Fintech",
        description: "Plataformas de comercio electrónico y soluciones financieras digitales. Pagos seguros, gestión de inventario y experiencias de compra que convierten visitantes en clientes.",
        icon: "ecommerce",
        cta: "Conversemos"
    },
    {
        id: 8,
        title: "Ciberseguridad",
        description: "Protegemos tu infraestructura digital con auditorías de seguridad, implementación de protocolos y monitoreo continuo. Tranquilidad total para tu negocio digital.",
        icon: "security",
        cta: "Pedir demo"
    },
    {
        id: 9,
        title: "Automatización de Procesos",
        description: "RPA y automatización inteligente para optimizar operaciones. Reducimos tareas repetitivas y liberamos tiempo valioso para actividades estratégicas de alto valor.",
        icon: "automation",
        cta: "Conversemos"
    },
    {
        id: 10,
        title: "Consultoría Digital",
        description: "Estrategia de transformación digital personalizada. Evaluamos tu situación actual y diseñamos roadmaps tecnológicos que alinean IT con objetivos de negocio.",
        icon: "consulting",
        cta: "Pedir demo"
    },
    {
        id: 11,
        title: "IoT & Sistemas Embebidos",
        description: "Conectamos el mundo físico con el digital. Sensores inteligentes, dispositivos IoT y sistemas embebidos que recopilan datos valiosos en tiempo real.",
        icon: "iot",
        cta: "Conversemos"
    },
    {
        id: 12,
        title: "Blockchain & Web3",
        description: "Soluciones descentralizadas y contratos inteligentes. NFTs, DeFi y aplicaciones blockchain que abren nuevas oportunidades de negocio en el ecosistema Web3.",
        icon: "blockchain",
        cta: "Pedir demo"
    },
    {
        id: 13,
        title: "UX/UI Design",
        description: "Diseño centrado en el usuario que convierte. Interfaces intuitivas, experiencias memorables y prototipos interactivos que maximizan engagement y conversión.",
        icon: "design",
        cta: "Conversemos"
    },
    {
        id: 14,
        title: "Testing & QA",
        description: "Aseguramos calidad en cada línea de código. Testing automatizado, pruebas de performance y QA integral que garantiza productos robustos y confiables.",
        icon: "testing",
        cta: "Pedir demo"
    },
    {
        id: 15,
        title: "Media & Creatividad Digital",
        description: "Producción audiovisual con IA generativa. Videos, animaciones y contenido multimedia que captura atención y comunica tu mensaje de forma impactante.",
        icon: "media",
        cta: "Conversemos"
    },
    {
        id: 16,
        title: "Migración & Modernización",
        description: "Actualizamos sistemas legacy sin interrumpir operaciones. Migraciones cloud, refactoring de código y modernización gradual que preserva continuidad del negocio.",
        icon: "migration",
        cta: "Pedir demo"
    },
    {
        id: 17,
        title: "Soporte & Mantenimiento",
        description: "Mantenemos tus sistemas funcionando 24/7. Monitoreo proactivo, actualizaciones de seguridad y soporte técnico especializado que garantiza disponibilidad total.",
        icon: "support",
        cta: "Conversemos"
    }
];

// Icon mapping for service cards
const serviceIcons = {
    architecture: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
    government: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
    mobile: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"></path></svg>`,
    ai: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
    cloud: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>`,
    analytics: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
    ecommerce: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path></svg>`,
    security: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
    automation: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
    consulting: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
    iot: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>`,
    blockchain: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`,
    design: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2-2-2M21 12H9"></path></svg>`,
    testing: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`,
    media: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`,
    migration: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>`,
    support: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"></path></svg>`
};

// Initialize service cards
function initServiceCards() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    // Clear existing content
    servicesGrid.innerHTML = '';
    
    // Create service cards
    servicePractices.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesGrid.appendChild(serviceCard);
    });
}

// Create individual service card
function createServiceCard(service, index) {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.style.animationDelay = `${(index % 9) * 0.1}s`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `service-title-${service.id}`);
    card.setAttribute('tabindex', '0');
    
    const icon = serviceIcons[service.icon] || serviceIcons.consulting;
    
    // Add proper aria-label to the icon
    const iconWithAria = icon.replace('<svg', `<svg aria-hidden="true" role="img" aria-label="Icono de ${service.title}"`);
    
    card.innerHTML = `
        <div class="service-card-icon">
            ${iconWithAria}
        </div>
        <h3 class="service-card-title" id="service-title-${service.id}">${service.title}</h3>
        <p class="service-card-description">${service.description}</p>
        <a href="#contacto" class="service-card-cta" onclick="handleServiceCTA('${service.title}', '${service.cta}')" aria-label="${service.cta} para ${service.title}">
            ${service.cta}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Flecha hacia la derecha">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </a>
    `;
    
    return card;
}

// Handle service CTA clicks
function handleServiceCTA(serviceTitle, ctaType) {
    // Store the selected service for the contact form
    sessionStorage.setItem('selectedService', serviceTitle);
    
    // Customize the message based on CTA type
    let message = '';
    if (ctaType === 'Pedir demo') {
        message = `Hola! Me interesa una demo de ${serviceTitle}. ¿Podemos agendar una reunión?`;
    } else {
        message = `Hola! Me interesa conocer más sobre ${serviceTitle}. ¿Podemos conversar?`;
    }
    
    // Store the message for WhatsApp or contact form
    sessionStorage.setItem('contactMessage', message);
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = contactSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}


// Initialize case studies functionality
function initCaseStudies() {
    // Add event listeners for case study interactions
    addCaseStudyEventListeners();
}

// Add event listeners for case study buttons
function addCaseStudyEventListeners() {
    // Tech case study button
    const techCaseButton = document.querySelector('#casos .grid > div:nth-child(1) button');
    if (techCaseButton) {
        techCaseButton.addEventListener('click', function() {
            handleTechCaseView();
        });
    }
    
    // AI case study download button
    const aiDownloadButton = document.querySelector('#casos .grid > div:nth-child(2) button:first-of-type');
    if (aiDownloadButton) {
        aiDownloadButton.addEventListener('click', function() {
            handleMiniLLMDownload();
        });
    }
    
    // AI case study documentation button
    const aiDocsButton = document.querySelector('#casos .grid > div:nth-child(2) button:last-of-type');
    if (aiDocsButton) {
        aiDocsButton.addEventListener('click', function() {
            handleMiniLLMDocs();
        });
    }
    
    // Media case study button
    const mediaCaseButton = document.querySelector('#casos .grid > div:nth-child(3) button');
    if (mediaCaseButton) {
        mediaCaseButton.addEventListener('click', function() {
            handleMediaCaseView();
        });
    }
}

// Handle Tech case study view
function handleTechCaseView() {
    // Create modal or redirect to detailed case study
    showCaseStudyModal({
        title: 'Migración Cloud Enterprise',
        category: 'Tech',
        description: 'Migración completa de infraestructura legacy a AWS con dashboard de monitoreo en tiempo real.',
        details: [
            'Migración de 50+ servicios legacy a arquitectura cloud-native',
            'Implementación de dashboard de monitoreo con métricas en tiempo real',
            'Reducción del 60% en costos operativos mensuales',
            'Mejora del 300% en performance y tiempo de respuesta',
            'Implementación de CI/CD automatizado con 99.9% uptime'
        ],
        technologies: ['AWS', 'Docker', 'Kubernetes', 'React', 'Node.js', 'PostgreSQL'],
        results: {
            'Reducción de costos': '60%',
            'Mejora de performance': '300%',
            'Uptime': '99.9%',
            'Time to market': '-40%'
        }
    });
}

// Handle Mini-LLM download
function handleMiniLLMDownload() {
    // Show download modal with terms and conditions
    showDownloadModal({
        title: 'QAPY Mini-LLM Beta',
        version: 'v0.1.0-beta',
        size: '4.2 GB',
        description: 'Primera LLM argentina optimizada para el contexto local. Modelo compacto de 7B parámetros entrenado con datos argentinos.',
        requirements: [
            'Python 3.8 o superior',
            'CUDA 11.8+ (para GPU)',
            '8GB RAM mínimo (16GB recomendado)',
            '10GB espacio libre en disco'
        ],
        downloadUrl: '/downloads/qapy-mini-llm-beta-v0.1.0.tar.gz'
    });
}

// Handle Mini-LLM documentation
function handleMiniLLMDocs() {
    // Open documentation in new tab
    const docsUrl = 'https://docs.qapy.com.ar/mini-llm/';
    window.open(docsUrl, '_blank', 'noopener,noreferrer');
}

// Handle Media case study view
function handleMediaCaseView() {
    // Show video modal or redirect to video
    showVideoModal({
        title: 'Spot Publicitario con IA',
        category: 'Media',
        description: 'Producción audiovisual de 20 segundos generada completamente con IA.',
        videoUrl: '/assets/videos/qapy-ai-spot-demo.mp4',
        duration: '0:20',
        details: [
            'Guión generado con GPT-4 optimizado para audiencia argentina',
            'Voces sintéticas con acento rioplatense',
            'Imágenes generadas con Midjourney y DALL-E',
            'Edición y post-producción automatizada',
            'Música de fondo generada con IA'
        ]
    });
}

// Show case study modal
function showCaseStudyModal(caseData) {
    const modal = createModal('case-study-modal');
    
    modal.innerHTML = `
        <div class="modal-content bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="bg-accent-blue/90 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        ${caseData.category}
                    </span>
                    <h2 class="text-2xl font-bold text-white mb-2">${caseData.title}</h2>
                    <p class="text-gray-300">${caseData.description}</p>
                </div>
                <button class="modal-close text-gray-400 hover:text-white text-2xl font-bold" onclick="closeModal('case-study-modal')">&times;</button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Detalles del Proyecto</h3>
                    <ul class="space-y-2 text-gray-300">
                        ${caseData.details.map(detail => `<li class="flex items-start"><span class="text-accent-blue mr-2">•</span>${detail}</li>`).join('')}
                    </ul>
                    
                    <h3 class="text-lg font-semibold text-white mb-4 mt-6">Tecnologías Utilizadas</h3>
                    <div class="flex flex-wrap gap-2">
                        ${caseData.technologies.map(tech => `<span class="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Resultados Obtenidos</h3>
                    <div class="space-y-4">
                        ${Object.entries(caseData.results).map(([key, value]) => `
                            <div class="bg-gray-700 rounded-lg p-4">
                                <div class="text-2xl font-bold text-accent-blue mb-1">${value}</div>
                                <div class="text-gray-300 text-sm">${key}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center mt-8">
                <a href="#contacto" class="btn-primary" onclick="closeModal('case-study-modal')">
                    Quiero un proyecto similar
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Show download modal
function showDownloadModal(downloadData) {
    const modal = createModal('download-modal');
    
    modal.innerHTML = `
        <div class="modal-content bg-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <div class="flex items-center mb-4">
                        <span class="bg-gradient-to-r from-accent-violet to-accent-blue text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                            BETA
                        </span>
                        <span class="text-gray-400 text-sm">${downloadData.version}</span>
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2">${downloadData.title}</h2>
                    <p class="text-gray-300 mb-4">${downloadData.description}</p>
                    <p class="text-accent-violet font-medium">Tamaño: ${downloadData.size}</p>
                </div>
                <button class="modal-close text-gray-400 hover:text-white text-2xl font-bold" onclick="closeModal('download-modal')">&times;</button>
            </div>
            
            <div class="mb-6">
                <h3 class="text-lg font-semibold text-white mb-4">Requisitos del Sistema</h3>
                <ul class="space-y-2 text-gray-300">
                    ${downloadData.requirements.map(req => `<li class="flex items-start"><span class="text-accent-violet mr-2">•</span>${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="text-white font-medium mb-2">Términos de Uso - Beta</h4>
                <p class="text-gray-300 text-sm">
                    Esta es una versión beta de QAPY Mini-LLM. Al descargar, aceptás que es solo para fines de evaluación y testing. 
                    No recomendamos su uso en producción. Los datos generados pueden contener inexactitudes.
                </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="btn-primary" onclick="startDownload('${downloadData.downloadUrl}')">
                    <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 8h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Descargar Beta
                </button>
                <button class="btn-secondary" onclick="closeModal('download-modal')">
                    Cancelar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Show video modal
function showVideoModal(videoData) {
    const modal = createModal('video-modal');
    
    modal.innerHTML = `
        <div class="modal-content bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="bg-accent-teal/90 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        ${videoData.category}
                    </span>
                    <h2 class="text-2xl font-bold text-white mb-2">${videoData.title}</h2>
                    <p class="text-gray-300">${videoData.description}</p>
                </div>
                <button class="modal-close text-gray-400 hover:text-white text-2xl font-bold" onclick="closeModal('video-modal')">&times;</button>
            </div>
            
            <div class="mb-6">
                <div class="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                    <video controls class="w-full h-full" poster="/assets/images/video-poster.jpg">
                        <source src="${videoData.videoUrl}" type="video/mp4">
                        Tu navegador no soporta el elemento video.
                    </video>
                    <div class="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                        ${videoData.duration}
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-lg font-semibold text-white mb-4">Proceso de Creación</h3>
                <ul class="space-y-2 text-gray-300">
                    ${videoData.details.map(detail => `<li class="flex items-start"><span class="text-accent-teal mr-2">•</span>${detail}</li>`).join('')}
                </ul>
            </div>
            
            <div class="flex justify-center">
                <a href="#contacto" class="btn-primary" onclick="closeModal('video-modal')">
                    Quiero crear contenido con IA
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Create modal element
function createModal(id) {
    // Remove existing modal if present
    const existingModal = document.getElementById(id);
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.style.display = 'none';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(id);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal(id);
        }
    });
    
    return modal;
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

// Start download process
function startDownload(downloadUrl) {
    // Show download progress (simulated)
    showDownloadProgress();
    
    // In a real implementation, this would trigger the actual download
    // For demo purposes, we'll simulate a download
    setTimeout(() => {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'qapy-mini-llm-beta.tar.gz';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Close modals
        closeModal('download-modal');
        closeModal('download-progress-modal');
        
        // Show success message
        showDownloadSuccess();
    }, 3000);
}

// Show download progress
function showDownloadProgress() {
    const modal = createModal('download-progress-modal');
    
    modal.innerHTML = `
        <div class="modal-content bg-gray-800 rounded-xl p-8 max-w-md mx-auto text-center">
            <div class="mb-6">
                <div class="w-16 h-16 bg-accent-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-accent-violet animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Preparando descarga...</h3>
                <p class="text-gray-300">Esto puede tomar unos segundos</p>
            </div>
            
            <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-accent-violet to-accent-blue h-2 rounded-full animate-pulse" style="width: 60%"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Show download success
function showDownloadSuccess() {
    const modal = createModal('download-success-modal');
    
    modal.innerHTML = `
        <div class="modal-content bg-gray-800 rounded-xl p-8 max-w-md mx-auto text-center">
            <div class="mb-6">
                <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">¡Descarga iniciada!</h3>
                <p class="text-gray-300 mb-4">QAPY Mini-LLM Beta se está descargando</p>
                <p class="text-sm text-gray-400">Revisá la documentación para instrucciones de instalación</p>
            </div>
            
            <div class="flex flex-col gap-3">
                <button class="btn-primary" onclick="handleMiniLLMDocs(); closeModal('download-success-modal')">
                    Ver Documentación
                </button>
                <button class="btn-secondary" onclick="closeModal('download-success-modal')">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeModal('download-success-modal');
    }, 5000);
}

// Contact Form Functionality (Task 8.1)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Add form submission handler
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    // Pre-fill form if service was selected
    prefillFormFromService();
}

// Handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = document.getElementById('submit-icon');
    const loadingSpinner = document.getElementById('loading-spinner');
    const formMessages = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Enviando...';
    submitIcon.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    // Hide previous messages
    formMessages.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    try {
        // Submit form to Netlify
        const formData = new FormData(form);
        
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
            // Show success message
            formMessages.classList.remove('hidden');
            successMessage.classList.remove('hidden');
            
            // Reset form
            form.reset();
            
            // Track successful submission
            trackFormSubmission('success');
            
        } else {
            throw new Error('Network response was not ok');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        formMessages.classList.remove('hidden');
        errorMessage.classList.remove('hidden');
        
        // Track failed submission
        trackFormSubmission('error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar mensaje';
        submitIcon.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}

// Validate contact form
function validateContactForm(form) {
    const nameField = form.querySelector('#name');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
    
    let isValid = true;
    
    // Validate name
    if (!nameField.value.trim()) {
        showFieldError(nameField, 'El nombre es requerido');
        isValid = false;
    } else if (nameField.value.trim().length < 2) {
        showFieldError(nameField, 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validate email
    if (!emailField.value.trim()) {
        showFieldError(emailField, 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(emailField.value.trim())) {
        showFieldError(emailField, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate message
    if (!messageField.value.trim()) {
        showFieldError(messageField, 'El mensaje es requerido');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showFieldError(messageField, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const fieldId = field.id;
    
    clearFieldError(field);
    
    switch (fieldId) {
        case 'name':
            if (field.value.trim() && field.value.trim().length < 2) {
                showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
            }
            break;
        case 'email':
            if (field.value.trim() && !validateEmail(field.value.trim())) {
                showFieldError(field, 'Por favor ingresa un email válido');
            }
            break;
        case 'message':
            if (field.value.trim() && field.value.trim().length < 10) {
                showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

// Show field error
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    field.classList.add('border-red-500');
    field.classList.remove('border-gray-600');
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    const errorElement = document.getElementById(field.id + '-error');
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
    
    field.classList.remove('border-red-500');
    field.classList.add('border-gray-600');
}

// Pre-fill form from selected service
function prefillFormFromService() {
    const selectedService = sessionStorage.getItem('selectedService');
    const contactMessage = sessionStorage.getItem('contactMessage');
    const messageField = document.getElementById('message');
    
    if (selectedService && contactMessage && messageField) {
        messageField.value = contactMessage;
        
        // Clear session storage
        sessionStorage.removeItem('selectedService');
        sessionStorage.removeItem('contactMessage');
    }
}

// Track form submission for analytics
function trackFormSubmission(status) {
    // This can be extended to integrate with Google Analytics, Mixpanel, etc.
    console.log(`Form submission: ${status}`);
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'Contact',
            'event_label': status,
            'value': status === 'success' ? 1 : 0
        });
    }
}

// WhatsApp Integration (Task 8.2)
function initWhatsAppIntegration() {
    // WhatsApp button is already implemented in HTML
    // This function can be extended for additional WhatsApp functionality
    
    // Track WhatsApp clicks
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackWhatsAppClick();
        });
    });
}

// Track WhatsApp button clicks
function trackWhatsAppClick() {
    console.log('WhatsApp button clicked');
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'Contact',
            'event_label': 'WhatsApp Button'
        });
    }
}

// Enhanced WhatsApp function with custom messages
function openWhatsAppWithMessage(customMessage) {
    const phoneNumber = '5491123456789'; // Replace with actual phone number
    const message = customMessage || 'Hola! Me interesa conocer más sobre los servicios de QAPY. ¿Podemos agendar una demo?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track the click
    trackWhatsAppClick();
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}


// ===== RESPONSIVE AND MOBILE OPTIMIZATION FUNCTIONS =====

// Initialize responsive optimizations
function initResponsiveOptimizations() {
    // Set up viewport height fix for mobile browsers
    setViewportHeight();
    
    // Handle orientation changes
    handleOrientationChange();
    
    // Optimize touch interactions
    optimizeTouchInteractions();
    
    // Handle resize events with debouncing
    handleResponsiveResize();
    
    // Initialize accessibility improvements
    initAccessibilityEnhancements();
}

// Fix viewport height issues on mobile browsers
function setViewportHeight() {
    function updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    updateViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewportHeight, 100);
    });
}

// Handle orientation changes
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Close mobile menu on orientation change
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const hamburgerIcon = mobileMenuButton.querySelector('.block');
            const closeIcon = mobileMenuButton.querySelector('.hidden');
            
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.remove('hidden');
                hamburgerIcon.classList.add('block');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('block');
            }
        }
        
        // Recalculate scroll positions after orientation change
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    });
}

// Optimize touch interactions
function optimizeTouchInteractions() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .service-card, .btn-primary, .btn-secondary');
    
    interactiveElements.forEach(element => {
        // Add touch start feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        // Remove touch feedback
        element.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.3s ease';
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.3s ease';
        }, { passive: true });
    });
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

// Handle responsive resize with debouncing
function handleResponsiveResize() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate service card heights on resize
            equalizeServiceCardHeights();
            
            // Update navigation state
            updateNavigationForScreenSize();
            
            // Recalculate modal positions if any are open
            repositionModals();
            
        }, 250);
    });
}

// Equalize service card heights on larger screens
function equalizeServiceCardHeights() {
    if (window.innerWidth >= 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        let maxHeight = 0;
        
        // Reset heights
        serviceCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find maximum height
        serviceCards.forEach(card => {
            const cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });
        
        // Apply maximum height to all cards
        serviceCards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    } else {
        // Reset heights on mobile
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.style.height = 'auto';
        });
    }
}

// Update navigation for different screen sizes
function updateNavigationForScreenSize() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (window.innerWidth >= 768) {
        // Hide mobile menu on desktop
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    }
}

// Reposition modals for responsive design
function repositionModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display === 'flex') {
            // Recalculate modal positioning
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = `${window.innerHeight - 40}px`;
            }
        }
    });
}

// Initialize mobile-specific features
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('is-mobile');
        
        // Optimize scroll behavior for mobile
        optimizeMobileScrolling();
        
        // Handle mobile-specific form interactions
        optimizeMobileFormInteractions();
        
        // Improve mobile navigation
        enhanceMobileNavigation();
    }
    
    // Handle touch-specific optimizations regardless of device detection
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        initTouchOptimizations();
    }
}

// Optimize scrolling for mobile devices
function optimizeMobileScrolling() {
    // Prevent momentum scrolling issues
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollPosition() {
        // Update any scroll-dependent elements
        const scrollTop = window.pageYOffset;
        
        // Update navigation background opacity
        const nav = document.querySelector('nav');
        if (nav) {
            if (scrollTop > 50) {
                nav.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
            } else {
                nav.style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
}

// Optimize form interactions for mobile
function optimizeMobileFormInteractions() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Prevent zoom on focus for iOS
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            }
        });
    });
}

// Enhance mobile navigation
function enhanceMobileNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Add swipe to close functionality
        let startY = 0;
        let currentY = 0;
        
        mobileMenu.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        mobileMenu.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            const diffY = startY - currentY;
            
            // If swiping up significantly, close menu
            if (diffY > 50) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger icon
                const hamburgerIcon = mobileMenuButton.querySelector('.block');
                const closeIcon = mobileMenuButton.querySelector('.hidden');
                
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.remove('hidden');
                    hamburgerIcon.classList.add('block');
                    closeIcon.classList.add('hidden');
                    closeIcon.classList.remove('block');
                }
            }
        }, { passive: true });
    }
}

// Initialize touch-specific optimizations
function initTouchOptimizations() {
    // Add touch-friendly hover effects
    const hoverElements = document.querySelectorAll('.service-card, .btn-primary, .btn-secondary');
    
    hoverElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
    });
    
    // Optimize service card touch interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// Initialize accessibility enhancements
function initAccessibilityEnhancements() {
    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Add skip link functionality
    addSkipLink();
    
    // Improve keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add ARIA labels where needed
    addAriaLabels();
    
    // Announce page changes for screen readers
    announcePageChanges();
}

// Add skip link for accessibility
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#servicios';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-blue text-white px-4 py-2 rounded z-50';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.transition = 'top 0.3s';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhance keyboard navigation
function enhanceKeyboardNavigation() {
    // Trap focus in mobile menu when open
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu && mobileMenuButton) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && !mobileMenu.classList.contains('hidden')) {
                const focusableElements = mobileMenu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Add ARIA labels where needed
function addAriaLabels() {
    // Add ARIA labels to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const title = card.querySelector('.service-card-title');
        if (title) {
            card.setAttribute('aria-label', `Servicio: ${title.textContent}`);
        }
    });
    
    // Add ARIA labels to navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.setAttribute('aria-label', `Ir a sección ${href}`);
    });
    
    // Add ARIA labels to social media links
    const socialLinks = document.querySelectorAll('footer a[href*="linkedin"], footer a[href*="instagram"]');
    socialLinks.forEach(link => {
        if (link.href.includes('linkedin')) {
            link.setAttribute('aria-label', 'Visitar perfil de LinkedIn de QAPY');
        } else if (link.href.includes('instagram')) {
            link.setAttribute('aria-label', 'Visitar perfil de Instagram de QAPY');
        }
    });
}

// Announce page changes for screen readers
function announcePageChanges() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
    
    // Announce section changes
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = getSectionName(entry.target.id);
                liveRegion.textContent = `Navegando a sección: ${sectionName}`;
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Get user-friendly section names
function getSectionName(sectionId) {
    const sectionNames = {
        'hero': 'Inicio',
        'servicios': 'Servicios',
        'nosotros': 'Quiénes Somos',
        'proceso': 'Cómo Trabajamos',
        'casos': 'Casos de Estudio',
        'contacto': 'Contacto'
    };
    
    return sectionNames[sectionId] || sectionId;
}

// Utility function to detect if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 767 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Utility function to detect if device supports touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Performance optimization for mobile
function optimizePerformanceForMobile() {
    if (isMobileDevice()) {
        // Reduce animation complexity on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animationDuration = '12s'; // Slower animations
        });
        
        // Lazy load images below the fold
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformanceForMobile();
});

// CSS class for touch-active state
const touchActiveCSS = `
.touch-active {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(58, 123, 255, 0.3) !important;
}
`;

// Add touch-active styles to document
const style = document.createElement('style');
style.textContent = touchActiveCSS;
document.head.appendChild(style);
// 
Initialize micro-interactions and enhanced effects
function initMicroInteractions() {
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Add loading states to form submissions
    enhanceFormInteractions();
    
    // Add hover sound effects (optional, can be disabled)
    addHoverEffects();
    
    // Add scroll-based animations for navigation
    enhanceNavigationAnimations();
    
    // Add parallax effect to hero particles
    addParallaxEffect();
    
    // Add smooth transitions for all interactive elements
    enhanceInteractiveElements();
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .service-card-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple if reduced motion is preferred
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS if not already present
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhance form interactions with loading states
function enhanceFormInteractions() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form || !submitBtn) return;
    
    // Add loading state to form submission
    form.addEventListener('submit', function(e) {
        if (!submitBtn.disabled) {
            submitBtn.classList.add('loading-state');
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
            `;
        }
    });
    
    // Add focus animations to form fields
    const formFields = form.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('field-focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('field-focused');
        });
    });
}

// Add subtle hover effects
function addHoverEffects() {
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(58, 123, 255, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('nav a:not(.btn-primary)');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Enhance navigation animations based on scroll
function enhanceNavigationAnimations() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove classes based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        // Add background opacity based on scroll position
        if (scrollTop > 50) {
            nav.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = 'rgba(31, 41, 55, 0.8)';
            nav.style.backdropFilter = 'blur(5px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add parallax effect to hero particles
function addParallaxEffect() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const particles = document.querySelectorAll('.particle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.1;
            particle.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Add mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            particle.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Enhance all interactive elements with smooth transitions
function enhanceInteractiveElements() {
    // Add smooth transitions to all clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Add subtle scale effect on click
        element.addEventListener('mousedown', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'scale(0.98)';
            }
        });
        
        element.addEventListener('mouseup', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'scale(1)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            
            img.addEventListener('load', function() {
                this.style.transition = 'all 0.5s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Add intersection observer for advanced animations
function initAdvancedScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -10% 0px'
    };
    
    const advancedObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;
            
            // Apply different animations based on intersection ratio
            if (ratio > 0.5) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            } else if (ratio > 0.25) {
                element.style.opacity = '0.7';
                element.style.transform = 'translateY(10px) scale(0.98)';
            } else {
                element.style.opacity = '0.3';
                element.style.transform = 'translateY(20px) scale(0.95)';
            }
        });
    }, observerOptions);
    
    // Observe hero content for advanced animations
    const heroContent = document.querySelector('#hero .relative.z-10');
    if (heroContent) {
        advancedObserver.observe(heroContent);
    }
}

// Initialize advanced animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAdvancedScrollAnimations, 1000);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll-based animations with throttling
function optimizeScrollAnimations() {
    const scrollHandler = throttle(function() {
        // Update navigation state
        updateNavigationOnScroll();
        
        // Update parallax effects
        updateParallaxEffects();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Update navigation based on scroll
function updateNavigationOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('nav');
    
    if (scrollTop > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Update parallax effects
function updateParallaxEffects() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        particle.style.transform = `translateY(${yPos}px)`;
    });
}

// Initialize optimized animations
document.addEventListener('DOMContentLoaded', function() {
    optimizeScrollAnimations();
});