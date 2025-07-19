// Accessibility utilities and testing functions

/**
 * Calculate color contrast ratio between two colors
 * Based on WCAG 2.1 guidelines
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    let hex = color.replace('#', '');
    
    // Handle short hex colors (e.g., #fff -> #ffffff)
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // Ensure we have a valid 6-character hex
    if (hex.length !== 6) {
      return 0; // Return 0 for invalid colors
    }
    
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Color combinations used in the dark theme
 */
export const colorCombinations = [
  // Primary text combinations
  { name: 'Primary text on primary background', fg: '#ffffff', bg: '#1a1a1a' },
  { name: 'Primary text on secondary background', fg: '#ffffff', bg: '#2d2d2d' },
  { name: 'Primary text on tertiary background', fg: '#ffffff', bg: '#3a3a3a' },
  
  // Secondary text combinations
  { name: 'Secondary text on primary background', fg: '#a0a0a0', bg: '#1a1a1a' },
  { name: 'Secondary text on secondary background', fg: '#a0a0a0', bg: '#2d2d2d' },
  
  // Muted text combinations
  { name: 'Muted text on primary background', fg: '#6b7280', bg: '#1a1a1a' },
  { name: 'Muted text on secondary background', fg: '#6b7280', bg: '#2d2d2d' },
  
  // Accent color combinations
  { name: 'Accent on primary background', fg: '#3b82f6', bg: '#1a1a1a' },
  { name: 'Accent on secondary background', fg: '#3b82f6', bg: '#2d2d2d' },
  { name: 'Primary text on accent background', fg: '#ffffff', bg: '#3b82f6' },
  
  // Border combinations (these are decorative, not text)
  { name: 'Border on primary background', fg: '#374151', bg: '#1a1a1a' },
  { name: 'Light border on primary background', fg: '#4b5563', bg: '#1a1a1a' },
];

/**
 * Test all color combinations for WCAG compliance
 */
export function testColorContrast(): { passed: number; failed: number; results: any[] } {
  const results = colorCombinations.map(combo => {
    const ratio = calculateContrastRatio(combo.fg, combo.bg);
    const passesAA = meetsWCAGAA(combo.fg, combo.bg);
    const passesAAA = meetsWCAGAAA(combo.fg, combo.bg);
    
    return {
      ...combo,
      ratio: Math.round(ratio * 100) / 100,
      passesAA,
      passesAAA,
      status: passesAA ? 'PASS' : 'FAIL'
    };
  });

  const passed = results.filter(r => r.passesAA).length;
  const failed = results.filter(r => !r.passesAA).length;

  return { passed, failed, results };
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container: Element): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors))
      .filter(el => this.isVisible(el)) as HTMLElement[];
  }

  /**
   * Check if element is visible and focusable
   */
  private isVisible(element: Element): boolean {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
  }

  /**
   * Trap focus within a container (for modals, menus, etc.)
   */
  trapFocus(container: Element, event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Set focus to first focusable element in container
   */
  focusFirst(container: Element): void {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
}

/**
 * Keyboard navigation utilities
 */
export class KeyboardNavigation {
  /**
   * Handle arrow key navigation for lists/grids
   */
  static handleArrowKeys(
    event: KeyboardEvent, 
    items: HTMLElement[], 
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' | 'grid' = 'vertical'
  ): number {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'grid') {
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        break;
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'grid') {
          event.preventDefault();
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'grid') {
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'grid') {
          event.preventDefault();
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
    }

    if (newIndex !== currentIndex && items[newIndex]) {
      items[newIndex].focus();
    }

    return newIndex;
  }
}

/**
 * Screen reader utilities
 */
export class ScreenReaderUtils {
  /**
   * Announce message to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Update page title for screen readers
   */
  static updatePageTitle(title: string): void {
    document.title = title;
    this.announce(`Page changed to ${title}`);
  }
}

/**
 * Initialize accessibility features
 */
export function initializeAccessibility(): void {
  // Add focus-visible polyfill behavior for older browsers
  if (!CSS.supports('selector(:focus-visible)')) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  // Enhanced focus management
  // const focusManager = new FocusManager(); // TODO: Implement focus management features

  // Handle escape key globally
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // Close any open modals, menus, etc.
      const openElements = document.querySelectorAll('[aria-expanded="true"]');
      openElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.click(); // Trigger close
        }
      });
    }
  });

  // Announce page changes for single-page applications
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      const title = document.title;
      ScreenReaderUtils.announce(`Navigated to ${title}`);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Log accessibility test results in development
  if (import.meta.env.DEV) {
    console.group('🔍 Accessibility Test Results');
    const testResults = testColorContrast();
    console.log(`✅ Passed: ${testResults.passed}/${testResults.results.length} color combinations`);
    if (testResults.failed > 0) {
      console.warn(`❌ Failed: ${testResults.failed} color combinations`);
      testResults.results
        .filter(r => !r.passesAA)
        .forEach(r => console.warn(`- ${r.name}: ${r.ratio}:1 (needs 4.5:1)`));
    }
    console.groupEnd();
  }
}