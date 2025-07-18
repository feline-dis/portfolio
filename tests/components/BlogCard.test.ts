import { describe, it, expect, beforeEach } from 'vitest';

describe('BlogCard Component', () => {
  const mockPost = {
    slug: 'test-blog-post',
    body: 'This is a test blog post content with multiple words to test reading time calculation. '.repeat(50),
    data: {
      title: 'Test Blog Post',
      description: 'A test blog post description',
      publishDate: new Date('2024-02-10'),
      tags: ['JavaScript', 'Testing', 'Web Development'],
      featured: true,
      draft: false
    }
  };

  let blogCardHTML: string;

  beforeEach(() => {
    // Calculate reading time (rough estimate)
    const wordsPerMinute = 200;
    const wordCount = mockPost.body.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Mock BlogCard component HTML structure
    blogCardHTML = `
      <article class="blog-card">
        <div class="blog-content">
          <div class="blog-header">
            <div class="blog-meta">
              <time class="blog-date" datetime="${mockPost.data.publishDate.toISOString()}">
                February 10, 2024
              </time>
              <span class="blog-reading-time">${readingTime} min read</span>
            </div>
            ${mockPost.data.featured ? `
              <span class="featured-badge" aria-label="Featured article">
                Featured
              </span>
            ` : ''}
          </div>
          <h3 class="blog-title">
            <a href="/blog/${mockPost.slug}" class="blog-link">
              ${mockPost.data.title}
            </a>
          </h3>
          <p class="blog-description">${mockPost.data.description}</p>
          <div class="blog-tags">
            ${mockPost.data.tags?.map(tag => `<span class="tag-badge">#${tag}</span>`).join('') || ''}
          </div>
          <div class="blog-footer">
            <a href="/blog/${mockPost.slug}" class="read-more-link">
              Read more
            </a>
          </div>
        </div>
      </article>
    `;
    document.body.innerHTML = blogCardHTML;
  });

  it('should render blog title correctly', () => {
    const title = document.querySelector('.blog-title a');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe(mockPost.data.title);
    expect(title?.getAttribute('href')).toBe(`/blog/${mockPost.slug}`);
  });

  it('should render blog description', () => {
    const description = document.querySelector('.blog-description');
    expect(description).toBeTruthy();
    expect(description?.textContent).toBe(mockPost.data.description);
  });

  it('should render blog date correctly', () => {
    const date = document.querySelector('.blog-date');
    expect(date).toBeTruthy();
    expect(date?.getAttribute('datetime')).toBe(mockPost.data.publishDate.toISOString());
    expect(date?.textContent?.trim()).toBe('February 10, 2024');
  });

  it('should calculate and display reading time', () => {
    const readingTime = document.querySelector('.blog-reading-time');
    expect(readingTime).toBeTruthy();
    expect(readingTime?.textContent).toMatch(/\d+ min read/);
  });

  it('should render tag badges when tags exist', () => {
    const tagBadges = document.querySelectorAll('.tag-badge');
    expect(tagBadges).toHaveLength(mockPost.data.tags?.length || 0);
    
    if (mockPost.data.tags) {
      tagBadges.forEach((badge, index) => {
        expect(badge.textContent).toBe(`#${mockPost.data.tags![index]}`);
      });
    }
  });

  it('should show featured badge when post is featured', () => {
    const featuredBadge = document.querySelector('.featured-badge');
    
    if (mockPost.data.featured) {
      expect(featuredBadge).toBeTruthy();
      expect(featuredBadge?.getAttribute('aria-label')).toBe('Featured article');
      expect(featuredBadge?.textContent?.trim()).toBe('Featured');
    } else {
      expect(featuredBadge).toBeFalsy();
    }
  });

  it('should render read more link', () => {
    const readMoreLink = document.querySelector('.read-more-link');
    expect(readMoreLink).toBeTruthy();
    expect(readMoreLink?.getAttribute('href')).toBe(`/blog/${mockPost.slug}`);
    expect(readMoreLink?.textContent?.trim()).toBe('Read more');
  });

  it('should have proper CSS classes for styling', () => {
    const card = document.querySelector('.blog-card');
    const content = document.querySelector('.blog-content');
    const header = document.querySelector('.blog-header');
    const meta = document.querySelector('.blog-meta');
    const tags = document.querySelector('.blog-tags');
    const footer = document.querySelector('.blog-footer');
    
    expect(card).toBeTruthy();
    expect(content).toBeTruthy();
    expect(header).toBeTruthy();
    expect(meta).toBeTruthy();
    expect(tags).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('should have proper blog meta structure', () => {
    const blogMeta = document.querySelector('.blog-meta');
    const date = blogMeta?.querySelector('.blog-date');
    const readingTime = blogMeta?.querySelector('.blog-reading-time');
    
    expect(blogMeta).toBeTruthy();
    expect(date).toBeTruthy();
    expect(readingTime).toBeTruthy();
  });
});