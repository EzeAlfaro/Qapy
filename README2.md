# 🚀 QAPY Website - Elementos Faltantes para Completar

## 📱 Assets de Instagram (Carpeta `/assets/`)

### Banners e Imágenes Sociales
- **Instagram Banner (1080×1080)**: `instagram-banner-1080x1080.html` ✅ (template creado)
- **Instagram Story (1080×1920)**: `instagram-story-1080x1920.html` ✅ (template creado) 
- **Instagram Reel Template**: `instagram-reel-template.html` ✅ (template creado)

### Imágenes de Casos de Estudio
- `case-tech.webp` - Imagen para caso "Migración a cloud + dashboard"
- `case-tech.jpg` - Fallback JPEG
- `case-ai.webp` - Imagen para caso "QAPY Mini-LLM Beta"  
- `case-ai.jpg` - Fallback JPEG
- `case-media.webp` - Imagen para caso "Spot de 20s con IA"
- `case-media.jpg` - Fallback JPEG

### Imágenes de Branding
- `og-image.webp` - Para Open Graph (1200×630)
- `og-image.jpg` - Fallback JPEG
- `twitter-image.webp` - Para Twitter Cards (1200×600)
- `twitter-image.jpg` - Fallback JPEG

## 🎨 Iconos SVG para Servicios (17 servicios)

Los iconos van en el JavaScript (`scripts/main.js`) en la función `getServiceIcon()`:

1. **architecture** - Arquitectura & Integración
2. **government** - Sector Público & Educación  
3. **mobile** - Desarrollo Web & Mobile
4. **ai** - Inteligencia Artificial
5. **cloud** - DevOps & Cloud
6. **analytics** - Data Analytics & BI
7. **ecommerce** - E-commerce & Fintech
8. **security** - Ciberseguridad
9. **automation** - Automatización de Procesos
10. **consulting** - Consultoría Digital
11. **iot** - IoT & Sistemas Embebidos
12. **blockchain** - Blockchain & Web3
13. **design** - UX/UI Design
14. **testing** - Testing & QA
15. **media** - Media & Creatividad Digital
16. **migration** - Migración & Modernización
17. **support** - Soporte & Mantenimiento

## 📞 Datos de Contacto Reales

En `scripts/main.js` cambiar:
```javascript
const phoneNumber = '5491123456789'; // ← Número real de WhatsApp
```

En `index.html` actualizar:
- Meta tags con teléfono real
- Structured data con información real de la empresa

## 🎬 Video para Caso de Media

Para el caso "Spot de 20s con IA" necesitas:
- Video file: `case-media-video.mp4` 
- Video thumbnail: `case-media-thumb.webp`

## ✅ Estado Actual

**Completado:**
- ✅ Estructura HTML completa
- ✅ CSS y animaciones
- ✅ JavaScript funcional
- ✅ Formulario Netlify
- ✅ Templates de Instagram
- ✅ SEO y meta tags
- ✅ Responsive design
- ✅ Accesibilidad

**Falta solo:**
- 📸 Imágenes reales (6 archivos)
- 🎨 Iconos SVG (17 iconos)
- 📞 Datos de contacto reales
- 🎬 Video opcional

¡El sitio está 95% completo! Solo faltan los assets visuales y datos reales.