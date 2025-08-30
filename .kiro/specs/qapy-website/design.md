# Design Document

## Overview

The QAPY website will be a modern, single-page application built with HTML and Tailwind CSS, optimized for Netlify deployment. The design follows a dark theme with electric blue, violet, and teal accents, creating a professional yet approachable tech boutique aesthetic. The site structure mirrors epidata.net's organization while incorporating a warmer, more conversational tone throughout.

## Architecture

### Technology Stack
- **Frontend Framework**: HTML5 with Tailwind CSS for styling
- **Typography**: Poppins for headings, Inter for body text (Google Fonts)
- **Icons**: Lucide React or Heroicons (SVG format)
- **Images**: WebP format for optimization
- **Forms**: Netlify Forms integration
- **Deployment**: Netlify static hosting

### Color System
```css
:root {
  --bg-dark: #0B0D12;
  --text-light: #EAEAF2;
  --accent-blue: #3A7BFF;
  --accent-violet: #6B5BFF;
  --accent-teal: #2DD4BF;
  --gray-800: #1F2937;
  --gray-700: #374151;
  --gray-600: #4B5563;
}
```

### Typography Scale
- **H1**: 3.5rem (56px) - Poppins Bold
- **H2**: 2.25rem (36px) - Poppins SemiBold  
- **H3**: 1.5rem (24px) - Poppins Medium
- **Body**: 1rem (16px) - Inter Regular
- **Small**: 0.875rem (14px) - Inter Regular

## Components and Interfaces

### 1. Navigation Component
```html
<nav class="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex-shrink-0">
        <span class="text-2xl font-bold text-white">QAPY</span>
      </div>
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-4">
          <!-- Navigation links -->
        </div>
      </div>
    </div>
  </div>
</nav>
```

### 2. Hero Section
- **Layout**: Full viewport height with centered content
- **Background**: Dark gradient with subtle particle animation (CSS-only)
- **Content Structure**:
  - Large QAPY wordmark
  - Tagline with gradient text effect
  - Micro-pitch paragraph
  - Two prominent CTAs with different styling (primary/secondary)

### 3. Service Cards Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20">
    <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
      <!-- SVG Icon -->
    </div>
    <h3 class="text-xl font-semibold text-white mb-3">Service Title</h3>
    <p class="text-gray-300 mb-4">Service description (45-70 words)</p>
    <button class="text-accent-blue hover:text-accent-violet transition-colors">
      Conversemos →
    </button>
  </div>
</div>
```

### 4. Contact Form
- **Netlify Forms Integration**: Uses `netlify` attribute for form handling
- **Validation**: HTML5 validation with custom styling
- **Fields**: Name, Email, Company, Message (textarea)
- **Styling**: Dark theme with accent borders on focus

### 5. WhatsApp Integration
```javascript
const whatsappMessage = encodeURIComponent("Hola! Me interesa conocer más sobre los servicios de QAPY. ¿Podemos agendar una demo?");
const whatsappURL = `https://wa.me/5491123456789?text=${whatsappMessage}`;
```

## Data Models

### Service Practice Model
```javascript
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
  }
  // ... 15 more services
];
```

### Case Study Model
```javascript
const caseStudies = [
  {
    title: "Migración Cloud Enterprise",
    category: "Tech",
    description: "Dashboard de monitoreo en tiempo real",
    image: "/assets/case-tech.webp",
    tags: ["Cloud", "Dashboard", "Monitoring"]
  },
  {
    title: "QAPY Mini-LLM Beta",
    category: "AI", 
    description: "Primera LLM argentina descargable",
    image: "/assets/case-ai.webp",
    tags: ["AI", "LLM", "Argentina"],
    downloadLink: "/downloads/qapy-mini-llm-beta"
  },
  {
    title: "Spot Publicitario IA",
    category: "Media",
    description: "Producción audiovisual con IA generativa",
    image: "/assets/case-media.webp", 
    tags: ["IA Creativa", "Video", "Automatización"]
  }
];
```

## Error Handling

### Form Validation
- **Client-side**: HTML5 validation with custom error messages
- **Server-side**: Netlify Forms handles spam protection and validation
- **User Feedback**: Toast notifications for form submission status

### Fallback Strategies
- **Font Loading**: System font fallbacks for Poppins and Inter
- **Image Loading**: Placeholder backgrounds while WebP images load
- **JavaScript Disabled**: All core functionality works without JS

### Performance Monitoring
- **Core Web Vitals**: Target LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Image Optimization**: WebP with JPEG fallbacks, lazy loading
- **CSS Optimization**: Tailwind purging, critical CSS inlining

## Testing Strategy

### Cross-Browser Testing
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Testing Tools**: BrowserStack for automated cross-browser testing

### Responsive Testing
- **Breakpoints**: 
  - Mobile: 360px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px - 1440px
  - Large: 1441px+
- **Testing Devices**: iPhone SE, iPad, MacBook Pro, 4K displays

### Accessibility Testing
- **Automated**: axe-core integration for WCAG 2.1 AA compliance
- **Manual**: Keyboard navigation, screen reader testing (NVDA, VoiceOver)
- **Color Contrast**: All text meets AA standards (4.5:1 ratio minimum)

### Performance Testing
- **Tools**: Lighthouse, WebPageTest, GTmetrix
- **Metrics**: 
  - First Contentful Paint < 1.5s
  - Largest Contentful Paint < 2.5s
  - Total Blocking Time < 200ms
  - Cumulative Layout Shift < 0.1

### SEO Testing
- **Technical SEO**: Meta tags, structured data, sitemap validation
- **Content SEO**: Keyword optimization for "consultora tecnología argentina", "desarrollo IA", "mini-LLM"
- **Local SEO**: Argentina-specific optimization

## Visual Design System

### Layout Grid
- **Container**: max-width: 1280px with responsive padding
- **Sections**: Consistent vertical spacing (6rem between sections)
- **Cards**: 8px border-radius, subtle shadows with accent colors

### Animation System
- **Scroll Animations**: Fade-up on section entry (Intersection Observer)
- **Hover Effects**: 300ms transitions for all interactive elements
- **Loading States**: Skeleton screens for dynamic content

### Iconography
- **Style**: Linear icons with 2px stroke width
- **Size**: 24px standard, 48px for section headers
- **Color**: Accent colors with hover states

### Button Styles
```css
.btn-primary {
  @apply bg-accent-blue hover:bg-accent-violet text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/30;
}

.btn-secondary {
  @apply border-2 border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-gray-900 px-6 py-3 rounded-lg font-medium transition-all duration-300;
}
```

## Social Media Assets

### Instagram Banner (1080×1080)
- **Design**: QAPY logo with tagline on dark gradient background
- **Text**: "Innovación argentina en Tecnología, IA y Media"
- **CTA**: "Conocé nuestros servicios → qapy.com.ar"

### Instagram Reel (5-10s)
- **Concept**: Animated text reveal "¿Primera LLM argentina? Conocé QAPY"
- **Style**: Kinetic typography with brand colors
- **Audio**: Upbeat tech music or voiceover

### Instagram Story (1080×1920)
- **Layout**: Vertical hero section adaptation
- **Interactive**: Swipe-up CTA to website
- **Text**: "QAPY Mini-LLM ya disponible. Descargá gratis"

## Deployment Configuration

### Netlify Settings
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[redirects]]
  from = "/demo"
  to = "/#contacto"
  status = 301
```

### Performance Optimizations
- **Image Optimization**: Automatic WebP conversion via Netlify
- **CSS Purging**: Remove unused Tailwind classes
- **Minification**: HTML, CSS, and JS minification
- **Caching**: Long-term caching for static assets

This design provides a comprehensive foundation for building the QAPY website while maintaining flexibility for implementation details and ensuring all requirements are addressed through thoughtful technical decisions.