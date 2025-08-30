# QAPY Website

Sitio web oficial de QAPY - Innovación argentina en Tecnología, IA y Media.

## Estructura del Proyecto

```
qapy-website/
├── assets/                    # Imágenes, iconos y archivos estáticos
│   ├── *.webp                # Imágenes optimizadas
│   ├── *.jpg                 # Fallbacks de imágenes
│   ├── *.png                 # Iconos y favicons
│   └── instagram-*.html      # Assets de redes sociales
├── styles/                   # Archivos CSS
│   └── main.css             # Estilos principales con Tailwind
├── scripts/                 # Archivos JavaScript
│   └── main.js              # JavaScript principal
├── .kiro/                   # Configuración de Kiro (desarrollo)
├── netlify.toml             # Configuración de Netlify
├── _headers                 # Headers HTTP para Netlify
├── _redirects               # Redirects para Netlify
├── index.html               # Página principal
├── sitemap.xml              # Mapa del sitio para SEO
├── robots.txt               # Instrucciones para crawlers
└── README.md                # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework de CSS utility-first
- **JavaScript Vanilla**: Funcionalidad interactiva
- **Google Fonts**: Tipografías Poppins e Inter
- **Netlify Forms**: Manejo de formularios

## Configuración Local

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Para desarrollo, usa un servidor local como Live Server

## Despliegue en Netlify

### Requisitos Previos

- Cuenta en [Netlify](https://netlify.com)
- Repositorio Git (GitHub, GitLab, o Bitbucket) - recomendado
- Archivos del proyecto listos para despliegue

### Opción 1: Despliegue desde Git (Recomendado)

1. **Preparar el repositorio**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Conectar en Netlify**:
   - Ve a [Netlify Dashboard](https://app.netlify.com)
   - Click en "New site from Git"
   - Selecciona tu proveedor Git (GitHub/GitLab/Bitbucket)
   - Autoriza la conexión si es necesario
   - Selecciona el repositorio `qapy-website`

3. **Configurar el despliegue**:
   - **Branch to deploy**: `main` (o tu rama principal)
   - **Build command**: Dejar vacío (sitio estático)
   - **Publish directory**: `.` (directorio raíz)
   - **Environment variables**: No requeridas

4. **Desplegar**:
   - Click en "Deploy site"
   - Netlify detectará automáticamente `netlify.toml`
   - El despliegue tomará 1-2 minutos

### Opción 2: Despliegue Manual (Drag & Drop)

1. **Preparar archivos**:
   - Asegúrate de que todos los archivos estén actualizados
   - No comprimas en ZIP, usa la carpeta directamente

2. **Desplegar**:
   - Ve a [Netlify Dashboard](https://app.netlify.com)
   - Arrastra la carpeta completa del proyecto a la zona de despliegue
   - Netlify procesará los archivos automáticamente

### Configuración Post-Despliegue

#### 1. Configurar Dominio Personalizado
```bash
# En Netlify Dashboard > Domain settings
# Agregar dominio personalizado: qapy.com.ar
# Configurar DNS records:
# A record: @ -> 75.2.60.5
# CNAME: www -> [tu-sitio].netlify.app
```

#### 2. Habilitar HTTPS
- Se habilita automáticamente con Let's Encrypt
- Forzar HTTPS en Settings > Domain management

#### 3. Configurar Formularios
- Los formularios se configuran automáticamente con `netlify` attribute
- Ver submissions en Dashboard > Forms
- Configurar notificaciones en Settings > Forms

### Variables de Entorno

Este proyecto no requiere variables de entorno, pero si necesitas configurar alguna:

```bash
# En Netlify Dashboard > Site settings > Environment variables
CONTACT_EMAIL=contacto@qapy.com.ar
WHATSAPP_NUMBER=5491123456789
```

### Configuración de Formularios

Los formularios usan Netlify Forms automáticamente:

```html
<!-- Ejemplo de formulario configurado -->
<form name="contact" method="POST" netlify netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Campos del formulario -->
</form>
```

**Características habilitadas**:
- Spam protection automático
- Notificaciones por email
- Webhook integrations disponibles
- Exportación de datos en CSV

### Monitoreo y Analytics

#### 1. Netlify Analytics (Opcional)
- Habilitar en Dashboard > Analytics
- Costo: $9/mes por sitio
- Métricas de tráfico y performance

#### 2. Google Analytics (Recomendado)
```html
<!-- Agregar en <head> de index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Problemas Comunes

#### 1. Formulario no funciona
**Síntomas**: Formulario no envía o error 404
**Solución**:
```html
<!-- Verificar que el formulario tenga estos atributos -->
<form name="contact" method="POST" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <!-- resto del formulario -->
</form>
```

#### 2. Imágenes no cargan
**Síntomas**: Imágenes rotas o 404
**Solución**:
- Verificar que las rutas sean relativas: `/assets/imagen.webp`
- Confirmar que los archivos estén en el repositorio
- Revisar mayúsculas/minúsculas en nombres de archivo

#### 3. CSS no se aplica
**Síntomas**: Sitio sin estilos
**Solución**:
```html
<!-- Verificar que el link esté correcto -->
<link rel="stylesheet" href="/styles/main.css">
```

#### 4. Redirects no funcionan
**Síntomas**: URLs no redirigen correctamente
**Solución**:
- Verificar sintaxis en `_redirects`
- Confirmar que `netlify.toml` esté en la raíz
- Revisar logs de despliegue en Netlify

#### 5. Performance lenta
**Síntomas**: Sitio carga lento
**Solución**:
- Verificar que las imágenes estén en formato WebP
- Confirmar que lazy loading esté habilitado
- Revisar Lighthouse report en DevTools

### Logs y Debugging

#### 1. Ver logs de despliegue
```bash
# En Netlify Dashboard
# Ir a: Deploys > [último deploy] > Deploy log
```

#### 2. Probar localmente
```bash
# Usar servidor local para testing
npx serve .
# o
python -m http.server 8000
```

#### 3. Validar configuración
```bash
# Verificar netlify.toml syntax
npx netlify-toml-validator netlify.toml

# Test redirects localmente
npx netlify dev
```

### Contacto de Soporte

- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Documentación**: [docs.netlify.com](https://docs.netlify.com)
- **Desarrollo**: contacto@qapy.com.ar

### Comandos Útiles

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login a Netlify
netlify login

# Desplegar desde CLI
netlify deploy --prod

# Ver status del sitio
netlify status

# Abrir dashboard
netlify open
```

## SEO y Performance

### Optimizaciones Implementadas

- **Meta tags**: Optimizados para Argentina y búsquedas locales
- **Open Graph**: Configurado para redes sociales
- **Twitter Cards**: Previews optimizadas para Twitter
- **Sitemap.xml**: Mapa del sitio para crawlers
- **Robots.txt**: Instrucciones para bots de búsqueda
- **Imágenes WebP**: Formato optimizado con fallbacks JPEG
- **Lazy loading**: Carga diferida de imágenes
- **Critical CSS**: Estilos críticos inline
- **Minificación**: CSS y JS minificados automáticamente

### Métricas Objetivo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Total Blocking Time**: < 200ms
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90 en todas las categorías

### Testing Performance

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://tu-sitio.netlify.app --output html

# WebPageTest
# Usar https://webpagetest.org con tu URL

# Core Web Vitals
# Usar Google PageSpeed Insights
# https://pagespeed.web.dev/
```

## Colores de Marca

- **Fondo oscuro**: #0B0D12
- **Texto claro**: #EAEAF2
- **Azul acento**: #3A7BFF
- **Violeta acento**: #6B5BFF
- **Teal acento**: #2DD4BF

## Tipografías

- **Títulos**: Poppins (Google Fonts)
- **Cuerpo**: Inter (Google Fonts)

## Contacto

Para consultas sobre el desarrollo: [contacto@qapy.com.ar]