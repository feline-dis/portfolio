import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Astro globals
(global as any).Astro = {
  props: {},
  params: {},
  request: new Request('http://localhost:3000/'),
  url: new URL('http://localhost:3000/'),
  redirect: (url: string) => new Response(null, { status: 302, headers: { Location: url } }),
  site: new URL('http://localhost:3000/'),
  generator: 'Astro v4.0.0',
  slots: {},
  self: globalThis,
};

// Mock CSS imports
const mockCSS = new Proxy({}, {
  get: () => '',
});

// Mock image imports
const mockImage = {
  src: '/mock-image.jpg',
  width: 800,
  height: 600,
  format: 'jpg',
};

// Setup global mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));