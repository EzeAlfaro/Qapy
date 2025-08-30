# Requirements Document

## Introduction

QAPY needs a professional one-page website that showcases their services as an Argentine technology consultancy specializing in AI, software development, and creative media. The website should be inspired by epidata.net's structure but with a warmer, more conversational tone. It must be optimized for Netlify deployment with excellent SEO, performance, and responsive design.

## Requirements

### Requirement 1

**User Story:** As a potential client visiting the QAPY website, I want to immediately understand what QAPY offers and how to contact them, so that I can quickly evaluate if their services match my needs.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the system SHALL display a hero section with QAPY branding, tagline "Innovación argentina en Tecnología, IA y Media", and clear value proposition
2. WHEN a user views the hero section THEN the system SHALL provide two prominent CTAs: "Agenda una demo" and "WhatsApp"
3. WHEN a user scrolls through the page THEN the system SHALL present information in logical order: Hero → About → Services → Process → Cases → Contact

### Requirement 2

**User Story:** As a business decision maker, I want to understand QAPY's 17 service offerings in detail, so that I can identify which services are relevant to my organization.

#### Acceptance Criteria

1. WHEN a user views the services section THEN the system SHALL display all 17 practices in a responsive grid layout with icons, titles, and descriptions
2. WHEN a user reads each service description THEN the system SHALL provide 45-70 words of clear, value-oriented content per service
3. WHEN a user wants to inquire about a specific service THEN the system SHALL provide individual CTAs ("Conversemos" or "Pedir demo") for each service card
4. WHEN a user hovers over service cards THEN the system SHALL provide visual feedback with elevation and accent border effects

### Requirement 3

**User Story:** As a mobile user, I want the website to work perfectly on my device, so that I can browse QAPY's services on any screen size.

#### Acceptance Criteria

1. WHEN a user accesses the site on any device THEN the system SHALL provide responsive design from 360px to 1440px width
2. WHEN a user navigates on mobile THEN the system SHALL maintain readability and usability across all sections
3. WHEN a user interacts with elements on touch devices THEN the system SHALL provide appropriate touch targets and interactions

### Requirement 4

**User Story:** As a user interested in contacting QAPY, I want multiple ways to reach them, so that I can choose my preferred communication method.

#### Acceptance Criteria

1. WHEN a user wants to contact QAPY THEN the system SHALL provide a contact form with fields: Name, Email, Company, Message
2. WHEN a user prefers instant messaging THEN the system SHALL provide a WhatsApp button with pre-filled message
3. WHEN a user submits the contact form THEN the system SHALL process the form using Netlify Forms or Google Forms integration
4. WHEN a user wants to schedule a meeting THEN the system SHALL provide "Agenda una demo gratuita de 20 minutos" CTA

### Requirement 5

**User Story:** As a search engine or social media platform, I want to properly index and display QAPY's website, so that potential clients can discover their services through search and social sharing.

#### Acceptance Criteria

1. WHEN search engines crawl the site THEN the system SHALL provide proper meta titles, descriptions, and Open Graph tags
2. WHEN the site is shared on social media THEN the system SHALL display appropriate preview images and descriptions
3. WHEN search engines index the site THEN the system SHALL provide sitemap.xml and robots.txt files
4. WHEN users access the site THEN the system SHALL load with optimized performance using .webp images and SVG icons

### Requirement 6

**User Story:** As a user with accessibility needs, I want to navigate and use the website effectively, so that I can access QAPY's information regardless of my abilities.

#### Acceptance Criteria

1. WHEN a user with visual impairments accesses the site THEN the system SHALL provide AA contrast compliance between text and backgrounds
2. WHEN a user navigates with keyboard only THEN the system SHALL provide full keyboard navigation support
3. WHEN screen readers access the site THEN the system SHALL provide proper alt text for all images and semantic HTML structure

### Requirement 7

**User Story:** As QAPY's marketing team, I want ready-to-use social media assets, so that I can promote the website launch across Instagram and other platforms.

#### Acceptance Criteria

1. WHEN marketing materials are needed THEN the system SHALL provide exportable Instagram assets including 1080×1080 banner
2. WHEN video content is required THEN the system SHALL provide a 5-10 second reel template with "¿Primera LLM argentina? Conocé QAPY" text
3. WHEN story content is needed THEN the system SHALL provide 1080×1920 story template with CTA

### Requirement 8

**User Story:** As a developer deploying the website, I want a simple deployment process to Netlify, so that I can quickly publish and maintain the site.

#### Acceptance Criteria

1. WHEN deploying to Netlify THEN the system SHALL provide a complete, ready-to-deploy folder structure
2. WHEN setting up the project THEN the system SHALL include a README with clear deployment instructions
3. WHEN the site is built THEN the system SHALL be lightweight and optimized for fast loading
4. WHEN forms are submitted THEN the system SHALL integrate properly with Netlify Forms without additional backend requirements