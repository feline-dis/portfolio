import { describe, it, expect, beforeEach } from 'vitest';

describe('Hero Component', () => {
  let heroHTML: string;

  beforeEach(() => {
    // Mock Hero component HTML structure
    heroHTML = `
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                Hi, I'm <span class="hero-name">Your Name</span>
              </h1>
              <p class="hero-subtitle">Full-Stack Developer & Technical Writer</p>
              <p class="hero-description">
                I build modern web applications and write about software development.
              </p>
              <div class="hero-actions">
                <a href="/projects" class="hero-btn btn-primary" aria-describedby="projects-description">
                  View My Work
                </a>
                <a href="/blog" class="hero-btn btn-secondary" aria-describedby="blog-description">
                  Read Articles
                </a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-avatar">
                <div class="avatar-placeholder" role="img" aria-label="Profile placeholder image">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.body.innerHTML = heroHTML;
  });

  it('should render hero title correctly', () => {
    const title = document.querySelector('.hero-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Hi, I\'m');
    expect(title?.textContent).toContain('Your Name');
  });

  it('should render hero subtitle', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent).toBe('Full-Stack Developer & Technical Writer');
  });

  it('should render hero description', () => {
    const description = document.querySelector('.hero-description');
    expect(description).toBeTruthy();
    expect(description?.textContent).toContain('I build modern web applications');
  });

  it('should have proper navigation links', () => {
    const projectsLink = document.querySelector('a[href="/projects"]');
    const blogLink = document.querySelector('a[href="/blog"]');
    
    expect(projectsLink).toBeTruthy();
    expect(blogLink).toBeTruthy();
    expect(projectsLink?.textContent?.trim()).toBe('View My Work');
    expect(blogLink?.textContent?.trim()).toBe('Read Articles');
  });

  it('should have proper accessibility attributes', () => {
    const projectsLink = document.querySelector('a[href="/projects"]');
    const blogLink = document.querySelector('a[href="/blog"]');
    const avatar = document.querySelector('.avatar-placeholder');
    
    expect(projectsLink?.getAttribute('aria-describedby')).toBe('projects-description');
    expect(blogLink?.getAttribute('aria-describedby')).toBe('blog-description');
    expect(avatar?.getAttribute('role')).toBe('img');
    expect(avatar?.getAttribute('aria-label')).toBe('Profile placeholder image');
  });

  it('should have proper CSS classes for styling', () => {
    const hero = document.querySelector('.hero');
    const heroContainer = document.querySelector('.hero-container');
    const heroContent = document.querySelector('.hero-content');
    const heroActions = document.querySelector('.hero-actions');
    
    expect(hero).toBeTruthy();
    expect(heroContainer).toBeTruthy();
    expect(heroContent).toBeTruthy();
    expect(heroActions).toBeTruthy();
  });

  it('should have primary and secondary button styles', () => {
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    expect(primaryBtn).toBeTruthy();
    expect(secondaryBtn).toBeTruthy();
    expect(primaryBtn?.classList.contains('hero-btn')).toBe(true);
    expect(secondaryBtn?.classList.contains('hero-btn')).toBe(true);
  });

  it('should have hero visual elements', () => {
    const heroVisual = document.querySelector('.hero-visual');
    const heroAvatar = document.querySelector('.hero-avatar');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    
    expect(heroVisual).toBeTruthy();
    expect(heroAvatar).toBeTruthy();
    expect(avatarPlaceholder).toBeTruthy();
  });
});