# Design Document

## Overview

The portfolio site will be built using Astro's static site generator with a focus on performance, maintainability, and user experience. The architecture leverages Astro's content collections for managing projects and blog posts, with a component-based design system implementing a dark, minimalistic theme.

## Architecture

### Site Structure
```
/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── content/            # Content collections
│   │   ├── projects/       # Project markdown files
│   │   └── blog/          # Blog post markdown files
│   ├── styles/            # Global styles and theme
│   └── utils/             # Utility functions
├── public/                # Static assets
└── astro.config.mjs       # Astro configuration
```

### Technology Stack
- **Framework**: Astro 4.x for static site generation
- **Styling**: CSS with custom properties for theming
- **Content**: Markdown with frontmatter for projects and blog posts
- **Images**: Astro's built-in image optimization
- **Deployment**: Static hosting (Netlify, Vercel, or GitHub Pages)

## Components and Interfaces

### Core Components

#### Layout Components
- `BaseLayout.astro`: Main layout with navigation, footer, and meta tags
- `BlogLayout.astro`: Specialized layout for blog posts
- `ProjectLayout.astro`: Layout for individual project pages

#### UI Components
- `Navigation.astro`: Main navigation with responsive mobile menu
- `ProjectCard.astro`: Card component for displaying project previews
- `BlogCard.astro`: Card component for blog post previews
- `CodeBlock.astro`: Syntax-highlighted code display
- `ImageGallery.astro`: Responsive image gallery for project media

#### Content Components
- `Hero.astro`: Homepage hero section
- `ProjectGrid.astro`: Grid layout for project showcase
- `BlogList.astro`: List view for blog posts
- `ContactSection.astro`: Contact information and social links

### Content Collections Schema

#### Projects Collection
```typescript
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  publishDate: z.date()
});
```

#### Blog Collection
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});
```

## Data Models

### Project Model
- **title**: Project name
- **description**: Brief project overview
- **technologies**: Array of technologies used
- **featured**: Boolean for homepage display
- **liveUrl**: Optional link to live demo
- **githubUrl**: Optional link to source code
- **images**: Optional array of image paths
- **publishDate**: Date for sorting
- **content**: Markdown content with detailed description

### Blog Post Model
- **title**: Post title
- **description**: Meta description for SEO
- **publishDate**: Publication date
- **tags**: Optional categorization tags
- **featured**: Boolean for homepage display
- **draft**: Boolean to hide unpublished posts
- **content**: Markdown content with full article

### Theme Configuration
- **colors**: CSS custom properties for dark theme palette
- **typography**: Font families and sizing scale
- **spacing**: Consistent spacing system
- **breakpoints**: Responsive design breakpoints

## Error Handling

### Content Validation
- Schema validation for all content collections using Zod
- Build-time errors for invalid frontmatter
- Graceful fallbacks for missing optional fields

### Image Handling
- Automatic optimization and format conversion
- Fallback images for missing project media
- Lazy loading for performance

### Navigation
- 404 page for invalid routes
- Breadcrumb navigation for deep pages
- Skip links for accessibility

## Testing Strategy

### Content Testing
- Validate all markdown files parse correctly
- Ensure required frontmatter fields are present
- Test content collection queries return expected data

### Component Testing
- Visual regression testing for component consistency
- Responsive design testing across breakpoints
- Accessibility testing with automated tools

### Performance Testing
- Lighthouse audits for Core Web Vitals
- Bundle size analysis
- Image optimization verification

### Build Testing
- Successful static site generation
- All pages render without errors
- SEO meta tags generated correctly

## Theme Implementation

### Dark Theme Design System
- **Primary Background**: Deep charcoal (#1a1a1a)
- **Secondary Background**: Slightly lighter (#2d2d2d)
- **Text Primary**: High contrast white (#ffffff)
- **Text Secondary**: Muted gray (#a0a0a0)
- **Accent Color**: Subtle blue or green for links and highlights
- **Border Color**: Subtle gray for component separation

### Typography
- **Headings**: Clean sans-serif font (Inter or similar)
- **Body**: Readable font with good contrast
- **Code**: Monospace font with syntax highlighting

### Layout Principles
- Generous whitespace for breathing room
- Clear visual hierarchy with typography scale
- Minimal decorative elements
- Focus on content readability
- Consistent component spacing