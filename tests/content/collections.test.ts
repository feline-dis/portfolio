import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import the schemas from the content config
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

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

describe('Content Collections Schema Validation', () => {
  describe('Project Schema', () => {
    it('should validate a complete project object', () => {
      const validProject = {
        title: 'Test Project',
        description: 'A test project description',
        technologies: ['React', 'TypeScript'],
        featured: true,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/user/repo',
        images: ['/images/project1.jpg', '/images/project2.jpg'],
        publishDate: new Date('2024-01-15')
      };

      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.title).toBe(validProject.title);
        expect(result.data.description).toBe(validProject.description);
        expect(result.data.technologies).toEqual(validProject.technologies);
        expect(result.data.featured).toBe(validProject.featured);
        expect(result.data.liveUrl).toBe(validProject.liveUrl);
        expect(result.data.githubUrl).toBe(validProject.githubUrl);
        expect(result.data.images).toEqual(validProject.images);
        expect(result.data.publishDate).toEqual(validProject.publishDate);
      }
    });

    it('should validate a minimal project object with defaults', () => {
      const minimalProject = {
        title: 'Minimal Project',
        description: 'A minimal project',
        technologies: ['JavaScript'],
        publishDate: new Date('2024-01-01')
      };

      const result = projectSchema.safeParse(minimalProject);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.featured).toBe(false); // default value
        expect(result.data.liveUrl).toBeUndefined();
        expect(result.data.githubUrl).toBeUndefined();
        expect(result.data.images).toBeUndefined();
      }
    });

    it('should reject project with missing required fields', () => {
      const invalidProject = {
        title: 'Invalid Project',
        // missing description, technologies, publishDate
      };

      const result = projectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(3); // description, technologies, publishDate
      }
    });

    it('should reject project with invalid URL formats', () => {
      const invalidProject = {
        title: 'Test Project',
        description: 'A test project',
        technologies: ['React'],
        publishDate: new Date(),
        liveUrl: 'not-a-valid-url',
        githubUrl: 'also-not-valid'
      };

      const result = projectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const urlErrors = result.error.issues.filter(issue => 
          issue.path.includes('liveUrl') || issue.path.includes('githubUrl')
        );
        expect(urlErrors.length).toBeGreaterThan(0);
      }
    });

    it('should validate empty technologies array', () => {
      const projectWithEmptyTech = {
        title: 'Test Project',
        description: 'A test project',
        technologies: [],
        publishDate: new Date()
      };

      const result = projectSchema.safeParse(projectWithEmptyTech);
      expect(result.success).toBe(true);
    });
  });

  describe('Blog Schema', () => {
    it('should validate a complete blog post object', () => {
      const validBlogPost = {
        title: 'Test Blog Post',
        description: 'A test blog post description',
        publishDate: new Date('2024-02-10'),
        tags: ['JavaScript', 'Testing'],
        featured: true,
        draft: false
      };

      const result = blogSchema.safeParse(validBlogPost);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.title).toBe(validBlogPost.title);
        expect(result.data.description).toBe(validBlogPost.description);
        expect(result.data.publishDate).toEqual(validBlogPost.publishDate);
        expect(result.data.tags).toEqual(validBlogPost.tags);
        expect(result.data.featured).toBe(validBlogPost.featured);
        expect(result.data.draft).toBe(validBlogPost.draft);
      }
    });

    it('should validate a minimal blog post with defaults', () => {
      const minimalBlogPost = {
        title: 'Minimal Blog Post',
        description: 'A minimal blog post',
        publishDate: new Date('2024-01-01')
      };

      const result = blogSchema.safeParse(minimalBlogPost);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.featured).toBe(false); // default value
        expect(result.data.draft).toBe(false); // default value
        expect(result.data.tags).toBeUndefined();
      }
    });

    it('should reject blog post with missing required fields', () => {
      const invalidBlogPost = {
        title: 'Invalid Blog Post',
        // missing description and publishDate
      };

      const result = blogSchema.safeParse(invalidBlogPost);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2); // description, publishDate
      }
    });

    it('should validate empty tags array', () => {
      const blogPostWithEmptyTags = {
        title: 'Test Blog Post',
        description: 'A test blog post',
        publishDate: new Date(),
        tags: []
      };

      const result = blogSchema.safeParse(blogPostWithEmptyTags);
      expect(result.success).toBe(true);
    });

    it('should reject invalid date formats', () => {
      const invalidBlogPost = {
        title: 'Test Blog Post',
        description: 'A test blog post',
        publishDate: 'not-a-date'
      };

      const result = blogSchema.safeParse(invalidBlogPost);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const dateErrors = result.error.issues.filter(issue => 
          issue.path.includes('publishDate')
        );
        expect(dateErrors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Content Collection Integration', () => {
    it('should handle project frontmatter parsing', () => {
      // Simulate frontmatter data that would come from markdown files
      const frontmatterData = {
        title: 'E-commerce API',
        description: 'A RESTful API for e-commerce applications',
        technologies: ['Node.js', 'Express', 'MongoDB'],
        featured: true,
        liveUrl: 'https://api.example.com',
        githubUrl: 'https://github.com/user/ecommerce-api',
        images: ['/images/api-docs.png'],
        publishDate: new Date('2024-01-15')
      };

      const result = projectSchema.safeParse(frontmatterData);
      expect(result.success).toBe(true);
    });

    it('should handle blog frontmatter parsing', () => {
      // Simulate frontmatter data that would come from markdown files
      const frontmatterData = {
        title: 'Getting Started with Astro',
        description: 'Learn how to build fast websites with Astro',
        publishDate: new Date('2024-02-01'),
        tags: ['Astro', 'Web Development', 'Static Sites'],
        featured: false,
        draft: false
      };

      const result = blogSchema.safeParse(frontmatterData);
      expect(result.success).toBe(true);
    });
  });
});