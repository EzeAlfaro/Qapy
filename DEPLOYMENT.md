# QAPY Website - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Content Review
- [ ] All text content is final and approved
- [ ] All images are optimized (WebP format)
- [ ] Contact information is correct
- [ ] WhatsApp number is updated
- [ ] All links are working
- [ ] Social media assets are ready

### ✅ Technical Review
- [ ] HTML validates (W3C validator)
- [ ] CSS is minified and optimized
- [ ] JavaScript is error-free
- [ ] All images have alt text
- [ ] Meta tags are complete
- [ ] Sitemap.xml is updated
- [ ] Robots.txt is configured

### ✅ Performance Check
- [ ] Images are compressed and optimized
- [ ] Lazy loading is implemented
- [ ] Critical CSS is inlined
- [ ] Unused CSS is removed
- [ ] JavaScript is minified

### ✅ SEO Verification
- [ ] Title tags are unique and descriptive
- [ ] Meta descriptions are compelling
- [ ] Open Graph tags are set
- [ ] Twitter Cards are configured
- [ ] Structured data is implemented
- [ ] Internal linking is optimized

## Deployment Steps

### 1. Final Code Review
```bash
# Check all files are committed
git status

# Run final tests
npm run test  # if applicable

# Validate HTML
# Use https://validator.w3.org/
```

### 2. Deploy to Netlify
```bash
# Option A: Git deployment (recommended)
git add .
git commit -m "Production ready"
git push origin main

# Option B: CLI deployment
netlify deploy --prod --dir .
```

### 3. Post-Deployment Verification

#### ✅ Functionality Tests
- [ ] Homepage loads correctly
- [ ] All sections are visible
- [ ] Navigation works (smooth scroll)
- [ ] Contact form submits successfully
- [ ] WhatsApp button opens correctly
- [ ] All images load properly
- [ ] Mobile responsiveness works

#### ✅ Performance Tests
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Images load with lazy loading
- [ ] No console errors
- [ ] No broken links

#### ✅ SEO Tests
- [ ] Meta tags appear in source
- [ ] Open Graph preview works
- [ ] Sitemap is accessible (/sitemap.xml)
- [ ] Robots.txt is accessible (/robots.txt)
- [ ] Google Search Console setup

### 4. Domain Configuration (if applicable)
```bash
# DNS Records for custom domain
# A Record: @ -> 75.2.60.5
# CNAME: www -> [site-name].netlify.app

# SSL Certificate
# Automatically provisioned by Netlify
# Force HTTPS in Netlify settings
```

## Post-Launch Tasks

### ✅ Analytics Setup
- [ ] Google Analytics configured
- [ ] Google Search Console verified
- [ ] Netlify Analytics enabled (optional)
- [ ] Form submissions monitoring

### ✅ Monitoring
- [ ] Uptime monitoring setup
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Form spam protection verified

### ✅ Marketing
- [ ] Social media assets published
- [ ] Instagram content scheduled
- [ ] LinkedIn company page updated
- [ ] Business directories updated

## Rollback Plan

### If Issues Occur
1. **Immediate rollback**:
   ```bash
   # Netlify Dashboard > Deploys > Previous deploy > Publish
   ```

2. **Fix and redeploy**:
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Emergency contact**:
   - Netlify Support: support@netlify.com
   - Development team: contacto@qapy.com.ar

## Maintenance Schedule

### Weekly
- [ ] Check form submissions
- [ ] Monitor performance metrics
- [ ] Review analytics data

### Monthly
- [ ] Update dependencies (if any)
- [ ] Review and update content
- [ ] Check for broken links
- [ ] Performance audit

### Quarterly
- [ ] Full SEO audit
- [ ] Accessibility review
- [ ] Security headers check
- [ ] Backup verification

## Emergency Contacts

- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Domain Provider**: [Contact info based on provider]
- **Development Team**: contacto@qapy.com.ar
- **Project Manager**: [Contact info]

## Useful Commands

```bash
# Check deployment status
netlify status

# View site logs
netlify logs

# Open Netlify dashboard
netlify open

# Test locally
netlify dev

# Deploy preview
netlify deploy

# Production deploy
netlify deploy --prod
```

---

**Last Updated**: [Current Date]
**Next Review**: [Date + 1 month]