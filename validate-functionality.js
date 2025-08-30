// Functionality validation script for QAPY website
// This script can be run in browser console to test functionality

console.log('🧪 Starting QAPY Website Functionality Tests...');

// Test Results Storage
const testResults = {
    navigation: [],
    forms: [],
    responsive: [],
    accessibility: [],
    performance: []
};

// Utility function to log test results
function logTest(category, testName, passed, details = '') {
    const result = {
        name: testName,
        passed: passed,
        details: details,
        timestamp: new Date().toISOString()
    };
    
    testResults[category].push(result);
    
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} [${category.toUpperCase()}] ${testName}${details ? ': ' + details : ''}`);
    
    return passed;
}

// Navigation Tests
function testNavigation() {
    console.log('\n🧭 Testing Navigation...');
    
    // Test navigation elements
    const nav = document.querySelector('nav');
    logTest('navigation', 'Navigation element exists', !!nav);
    
    const logo = document.querySelector('nav a[href="#hero"]');
    logTest('navigation', 'Logo link exists', !!logo);
    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    logTest('navigation', 'Navigation links present', navLinks.length >= 5, `Found ${navLinks.length} links`);
    
    const mobileMenuButton = document.querySelector('#mobile-menu-button');
    logTest('navigation', 'Mobile menu button exists', !!mobileMenuButton);
    
    const mobileMenu = document.querySelector('#mobile-menu');
    logTest('navigation', 'Mobile menu exists', !!mobileMenu);
    
    // Test mobile menu functionality
    if (mobileMenuButton && mobileMenu) {
        const initiallyHidden = mobileMenu.classList.contains('hidden');
        logTest('navigation', 'Mobile menu initially hidden', initiallyHidden);
        
        // Simulate click
        mobileMenuButton.click();
        const openedAfterClick = !mobileMenu.classList.contains('hidden');
        logTest('navigation', 'Mobile menu opens on click', openedAfterClick);
        
        // Close menu
        mobileMenuButton.click();
        const closedAfterSecondClick = mobileMenu.classList.contains('hidden');
        logTest('navigation', 'Mobile menu closes on second click', closedAfterSecondClick);
    }
}

// Form Tests
function testForms() {
    console.log('\n📝 Testing Forms...');
    
    const contactForm = document.querySelector('#contact-form');
    logTest('forms', 'Contact form exists', !!contactForm);
    
    if (contactForm) {
        // Test form fields
        const nameField = contactForm.querySelector('input[name="name"]');
        const emailField = contactForm.querySelector('input[name="email"]');
        const companyField = contactForm.querySelector('input[name="company"]');
        const messageField = contactForm.querySelector('textarea[name="message"]');
        
        logTest('forms', 'Name field exists', !!nameField);
        logTest('forms', 'Email field exists', !!emailField);
        logTest('forms', 'Company field exists', !!companyField);
        logTest('forms', 'Message field exists', !!messageField);
        
        // Test field attributes
        if (emailField) {
            logTest('forms', 'Email field has correct type', emailField.type === 'email');
        }
        
        // Test required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        logTest('forms', 'Required fields present', requiredFields.length > 0, `${requiredFields.length} required fields`);
        
        // Test Netlify integration
        const hasNetlify = contactForm.hasAttribute('netlify') || contactForm.hasAttribute('data-netlify');
        logTest('forms', 'Netlify forms integration', hasNetlify);
    }
    
    // Test WhatsApp integration
    const whatsappButton = document.querySelector('a[href*="wa.me"]');
    logTest('forms', 'WhatsApp button exists', !!whatsappButton);
    
    if (whatsappButton) {
        const href = whatsappButton.getAttribute('href');
        const hasPhoneNumber = href.includes('wa.me/');
        const hasMessage = href.includes('text=');
        
        logTest('forms', 'WhatsApp has phone number', hasPhoneNumber);
        logTest('forms', 'WhatsApp has pre-filled message', hasMessage);
    }
}

// Responsive Design Tests
function testResponsive() {
    console.log('\n📱 Testing Responsive Design...');
    
    // Test viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    logTest('responsive', 'Viewport meta tag exists', !!viewportMeta);
    
    if (viewportMeta) {
        const content = viewportMeta.getAttribute('content');
        const hasWidthDevice = content.includes('width=device-width');
        const hasInitialScale = content.includes('initial-scale=1');
        
        logTest('responsive', 'Viewport has device-width', hasWidthDevice);
        logTest('responsive', 'Viewport has initial-scale=1', hasInitialScale);
    }
    
    // Test responsive images
    const images = document.querySelectorAll('img');
    let responsiveImages = 0;
    images.forEach(img => {
        const styles = window.getComputedStyle(img);
        if (styles.maxWidth === '100%' || img.hasAttribute('srcset')) {
            responsiveImages++;
        }
    });
    
    logTest('responsive', 'Images are responsive', responsiveImages > 0, `${responsiveImages}/${images.length} responsive images`);
    
    // Test touch targets (minimum 44px)
    const interactiveElements = document.querySelectorAll('button, a, input, textarea');
    let adequateTouchTargets = 0;
    
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const minSize = Math.min(rect.width, rect.height);
        if (minSize >= 44) {
            adequateTouchTargets++;
        }
    });
    
    logTest('responsive', 'Adequate touch targets', adequateTouchTargets > 0, `${adequateTouchTargets}/${interactiveElements.length} meet 44px minimum`);
}

// Accessibility Tests
function testAccessibility() {
    console.log('\n♿ Testing Accessibility...');
    
    // Test alt text on images
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    images.forEach(img => {
        if (img.hasAttribute('alt')) {
            imagesWithAlt++;
        }
    });
    
    logTest('accessibility', 'Images have alt text', imagesWithAlt === images.length, `${imagesWithAlt}/${images.length} images with alt text`);
    
    // Test form labels
    const inputs = document.querySelectorAll('input, textarea, select');
    let inputsWithLabels = 0;
    inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`) || input.closest('label');
        if (label || input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby')) {
            inputsWithLabels++;
        }
    });
    
    logTest('accessibility', 'Form inputs have labels', inputsWithLabels === inputs.length, `${inputsWithLabels}/${inputs.length} inputs with labels`);
    
    // Test semantic HTML
    const semanticElements = document.querySelectorAll('main, nav, header, footer, section, article, aside');
    logTest('accessibility', 'Semantic HTML elements present', semanticElements.length > 0, `${semanticElements.length} semantic elements`);
    
    // Test skip link
    const skipLink = document.querySelector('a[href="#main-content"]');
    logTest('accessibility', 'Skip to main content link exists', !!skipLink);
    
    // Test ARIA attributes
    const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
    logTest('accessibility', 'ARIA attributes present', ariaElements.length > 0, `${ariaElements.length} elements with ARIA attributes`);
    
    // Test focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    logTest('accessibility', 'Focusable elements present', focusableElements.length > 0, `${focusableElements.length} focusable elements`);
}

// Performance Tests
function testPerformance() {
    console.log('\n⚡ Testing Performance...');
    
    if ('performance' in window && performance.timing) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        logTest('performance', 'Page load time acceptable', loadTime < 3000, `${loadTime}ms`);
        logTest('performance', 'DOM content loaded quickly', domContentLoaded < 1500, `${domContentLoaded}ms`);
    } else {
        logTest('performance', 'Performance API available', false, 'Performance API not supported');
    }
    
    // Test lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
    logTest('performance', 'Lazy loading implemented', lazyImages.length > 0, `${lazyImages.length} lazy images`);
    
    // Test WebP support
    const webpImages = document.querySelectorAll('source[type="image/webp"], img[src*=".webp"]');
    logTest('performance', 'WebP images used', webpImages.length > 0, `${webpImages.length} WebP images`);
    
    // Test CSS and JS minification (basic check)
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll('script[src]');
    
    logTest('performance', 'External stylesheets present', stylesheets.length > 0, `${stylesheets.length} stylesheets`);
    logTest('performance', 'External scripts present', scripts.length > 0, `${scripts.length} scripts`);
}

// Browser Feature Tests
function testBrowserFeatures() {
    console.log('\n🔧 Testing Browser Features...');
    
    const features = [
        { name: 'CSS Grid', test: () => CSS.supports('display', 'grid') },
        { name: 'CSS Flexbox', test: () => CSS.supports('display', 'flex') },
        { name: 'CSS Custom Properties', test: () => CSS.supports('--test', '0') },
        { name: 'Intersection Observer', test: () => 'IntersectionObserver' in window },
        { name: 'Local Storage', test: () => typeof Storage !== 'undefined' },
        { name: 'Touch Events', test: () => 'ontouchstart' in window },
        { name: 'Service Workers', test: () => 'serviceWorker' in navigator },
        { name: 'Geolocation', test: () => 'geolocation' in navigator }
    ];
    
    features.forEach(feature => {
        try {
            const supported = feature.test();
            logTest('performance', `${feature.name} support`, supported);
        } catch (e) {
            logTest('performance', `${feature.name} support`, false, 'Error testing feature');
        }
    });
}

// Service Cards Test
function testServiceCards() {
    console.log('\n🎯 Testing Service Cards...');
    
    const serviceGrid = document.querySelector('#services-grid');
    logTest('navigation', 'Service grid container exists', !!serviceGrid);
    
    if (serviceGrid) {
        const serviceCards = serviceGrid.querySelectorAll('.service-card');
        logTest('navigation', 'Service cards present', serviceCards.length > 0, `${serviceCards.length} service cards`);
        
        // Test service card structure
        if (serviceCards.length > 0) {
            const firstCard = serviceCards[0];
            const hasIcon = !!firstCard.querySelector('.service-card-icon');
            const hasTitle = !!firstCard.querySelector('.service-card-title');
            const hasDescription = !!firstCard.querySelector('.service-card-description');
            const hasCTA = !!firstCard.querySelector('.service-card-cta');
            
            logTest('navigation', 'Service cards have icons', hasIcon);
            logTest('navigation', 'Service cards have titles', hasTitle);
            logTest('navigation', 'Service cards have descriptions', hasDescription);
            logTest('navigation', 'Service cards have CTAs', hasCTA);
        }
    }
}

// Main test runner
function runAllTests() {
    console.clear();
    console.log('🚀 QAPY Website - Comprehensive Functionality Tests');
    console.log('================================================');
    
    const startTime = performance.now();
    
    testNavigation();
    testForms();
    testResponsive();
    testAccessibility();
    testPerformance();
    testBrowserFeatures();
    testServiceCards();
    
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    
    console.log('\n📊 Test Summary');
    console.log('===============');
    
    let totalTests = 0;
    let passedTests = 0;
    
    Object.keys(testResults).forEach(category => {
        const categoryTests = testResults[category];
        const categoryPassed = categoryTests.filter(test => test.passed).length;
        
        totalTests += categoryTests.length;
        passedTests += categoryPassed;
        
        console.log(`${category.toUpperCase()}: ${categoryPassed}/${categoryTests.length} passed`);
    });
    
    console.log(`\nOVERALL: ${passedTests}/${totalTests} tests passed (${Math.round(passedTests/totalTests*100)}%)`);
    console.log(`Test duration: ${duration}ms`);
    
    // Return results for programmatic access
    return {
        summary: {
            total: totalTests,
            passed: passedTests,
            failed: totalTests - passedTests,
            percentage: Math.round(passedTests/totalTests*100),
            duration: duration
        },
        details: testResults
    };
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllTests);
    } else {
        runAllTests();
    }
}

// Export for manual execution
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, testResults };
}