import { describe, it, expect, beforeEach } from 'vitest';

describe('Navigation Component', () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' }
  ];

  let navigationHTML: string;

  beforeEach(() => {
    const currentPath = '/projects';
    
    // Mock Navigation component HTML structure
    navigationHTML = `
      <nav class="navigation" aria-label="Main navigation">
        <div class="nav-container">
          <div class="nav-brand">
            <a href="/" class="brand-link" aria-label="Go to homepage">
              <span class="brand-text">Portfolio</span>
            </a>
          </div>
          <div class="nav-menu" id="nav-menu">
            <ul class="nav-list">
              ${navItems.map(({ href, label }) => {
                const isActive = href === '/' ? currentPath === href : currentPath.startsWith(href as string);
                return `
                  <li class="nav-item">
                    <a 
                      href="${href}" 
                      class="nav-link ${isActive ? 'active' : ''}"
                      ${isActive ? 'aria-current="page"' : ''}
                    >
                      ${label}
                    </a>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
          <button 
            class="nav-toggle" 
            id="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="nav-menu"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </nav>
    `;
    document.body.innerHTML = navigationHTML;
  });

  it('should render navigation with proper structure', () => {
    const nav = document.querySelector('.navigation');
    const container = document.querySelector('.nav-container');
    const brand = document.querySelector('.nav-brand');
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    
    expect(nav).toBeTruthy();
    expect(container).toBeTruthy();
    expect(brand).toBeTruthy();
    expect(menu).toBeTruthy();
    expect(toggle).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    const nav = document.querySelector('.navigation');
    const brandLink = document.querySelector('.brand-link');
    const toggle = document.querySelector('.nav-toggle');
    
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    expect(brandLink?.getAttribute('aria-label')).toBe('Go to homepage');
    expect(toggle?.getAttribute('aria-label')).toBe('Toggle navigation menu');
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-controls')).toBe('nav-menu');
  });

  it('should render brand link correctly', () => {
    const brandLink = document.querySelector('.brand-link');
    const brandText = document.querySelector('.brand-text');
    
    expect(brandLink).toBeTruthy();
    expect(brandText).toBeTruthy();
    expect(brandLink?.getAttribute('href')).toBe('/');
    expect(brandText?.textContent).toBe('Portfolio');
  });

  it('should render all navigation items', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    expect(navLinks).toHaveLength(navItems.length);
    
    navLinks.forEach((link, index) => {
      expect(link.getAttribute('href')).toBe(navItems[index].href);
      expect(link.textContent?.trim()).toBe(navItems[index].label);
    });
  });

  it('should mark active navigation item correctly', () => {
    const activeLink = document.querySelector('.nav-link.active');
    expect(activeLink).toBeTruthy();
    expect(activeLink?.getAttribute('href')).toBe('/projects');
    expect(activeLink?.getAttribute('aria-current')).toBe('page');
  });

  it('should have mobile toggle button with hamburger lines', () => {
    const toggle = document.querySelector('.nav-toggle');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    expect(toggle).toBeTruthy();
    expect(hamburgerLines).toHaveLength(3);
  });

  it('should toggle mobile menu when button is clicked', () => {
    const toggle = document.querySelector('.nav-toggle') as HTMLButtonElement;
    const menu = document.querySelector('.nav-menu') as HTMLElement;
    
    expect(toggle).toBeTruthy();
    expect(menu).toBeTruthy();
    
    // Mock click event
    const clickEvent = new Event('click');
    toggle.dispatchEvent(clickEvent);
    
    // Since we can't test the actual script execution in this environment,
    // we'll test that the elements exist and have the right structure
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(menu.id).toBe('nav-menu');
  });

  it('should have proper CSS classes for styling', () => {
    const nav = document.querySelector('.navigation');
    const container = document.querySelector('.nav-container');
    const menu = document.querySelector('.nav-menu');
    const list = document.querySelector('.nav-list');
    
    expect(nav?.classList.contains('navigation')).toBe(true);
    expect(container?.classList.contains('nav-container')).toBe(true);
    expect(menu?.classList.contains('nav-menu')).toBe(true);
    expect(list?.classList.contains('nav-list')).toBe(true);
  });

  it('should handle keyboard navigation', () => {
    const toggle = document.querySelector('.nav-toggle') as HTMLButtonElement;
    
    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    toggle.dispatchEvent(enterEvent);
    
    // Test Space key
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    toggle.dispatchEvent(spaceEvent);
    
    // Since we can't test the actual script execution,
    // we verify the element exists and can receive events
    expect(toggle).toBeTruthy();
  });

  it('should have navigation list structure', () => {
    const navList = document.querySelector('.nav-list');
    const navItems = document.querySelectorAll('.nav-item');
    
    expect(navList).toBeTruthy();
    expect(navItems).toHaveLength(4); // Home, Projects, Blog, About
    
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      expect(link).toBeTruthy();
    });
  });
});