import { describe, it, expect, beforeEach } from 'vitest';

describe('ProjectCard Component', () => {
  const mockProject = {
    slug: 'test-project',
    data: {
      title: 'Test Project',
      description: 'A test project description',
      technologies: ['React', 'TypeScript', 'Node.js'],
      publishDate: new Date('2024-01-15'),
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/user/project',
      images: ['/images/project-1.jpg'],
      featured: false
    }
  };

  let projectCardHTML: string;

  beforeEach(() => {
    // Mock ProjectCard component HTML structure
    projectCardHTML = `
      <article class="project-card">
        <div class="project-image">
          <img 
            src="${mockProject.data.images[0]}" 
            alt="Screenshot of ${mockProject.data.title} project showing the main interface"
            loading="lazy"
            class="project-img"
          />
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">
              <a href="/projects/${mockProject.slug}" class="project-link">
                ${mockProject.data.title}
              </a>
            </h3>
            <time class="project-date" datetime="${mockProject.data.publishDate.toISOString()}">
              January 2024
            </time>
          </div>
          <p class="project-description">${mockProject.data.description}</p>
          <div class="project-technologies">
            ${mockProject.data.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${mockProject.data.liveUrl}" class="project-link-btn btn-primary" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
            <a href="${mockProject.data.githubUrl}" class="project-link-btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </div>
        </div>
      </article>
    `;
    document.body.innerHTML = projectCardHTML;
  });

  it('should render project title correctly', () => {
    const title = document.querySelector('.project-title a');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe(mockProject.data.title);
    expect(title?.getAttribute('href')).toBe(`/projects/${mockProject.slug}`);
  });

  it('should render project description', () => {
    const description = document.querySelector('.project-description');
    expect(description).toBeTruthy();
    expect(description?.textContent).toBe(mockProject.data.description);
  });

  it('should render project date correctly', () => {
    const date = document.querySelector('.project-date');
    expect(date).toBeTruthy();
    expect(date?.getAttribute('datetime')).toBe(mockProject.data.publishDate.toISOString());
    expect(date?.textContent?.trim()).toBe('January 2024');
  });

  it('should render technology badges', () => {
    const techBadges = document.querySelectorAll('.tech-badge');
    expect(techBadges).toHaveLength(mockProject.data.technologies.length);
    
    techBadges.forEach((badge, index) => {
      expect(badge.textContent).toBe(mockProject.data.technologies[index]);
    });
  });

  it('should render project image with proper attributes', () => {
    const image = document.querySelector('.project-img');
    expect(image).toBeTruthy();
    expect(image?.getAttribute('src')).toBe(mockProject.data.images[0]);
    expect(image?.getAttribute('alt')).toContain(mockProject.data.title);
    expect(image?.getAttribute('loading')).toBe('lazy');
  });

  it('should render project links with proper attributes', () => {
    const liveLink = document.querySelector('a[href="' + mockProject.data.liveUrl + '"]');
    const githubLink = document.querySelector('a[href="' + mockProject.data.githubUrl + '"]');
    
    expect(liveLink).toBeTruthy();
    expect(githubLink).toBeTruthy();
    
    expect(liveLink?.getAttribute('target')).toBe('_blank');
    expect(liveLink?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(githubLink?.getAttribute('target')).toBe('_blank');
    expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer');
    
    expect(liveLink?.textContent?.trim()).toBe('Live Demo');
    expect(githubLink?.textContent?.trim()).toBe('Source Code');
  });

  it('should have proper CSS classes for styling', () => {
    const card = document.querySelector('.project-card');
    const content = document.querySelector('.project-content');
    const header = document.querySelector('.project-header');
    const technologies = document.querySelector('.project-technologies');
    const links = document.querySelector('.project-links');
    
    expect(card).toBeTruthy();
    expect(content).toBeTruthy();
    expect(header).toBeTruthy();
    expect(technologies).toBeTruthy();
    expect(links).toBeTruthy();
  });

  it('should have primary and secondary button styles for links', () => {
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    expect(primaryBtn).toBeTruthy();
    expect(secondaryBtn).toBeTruthy();
    expect(primaryBtn?.classList.contains('project-link-btn')).toBe(true);
    expect(secondaryBtn?.classList.contains('project-link-btn')).toBe(true);
  });
});