import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Site configuration for SEO
  site: "https://portfolio.example.com",

  // Enable TypeScript support
  integrations: [],

  // Markdown configuration with syntax highlighting
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: "dark-plus",
      wrap: true,
    },
  },

  // Build configuration for performance optimization
  build: {
    assets: "assets",
    inlineStylesheets: "auto",
    // Enable CSS code splitting
    split: true,
    // Minify HTML, CSS, and JS
    minify: true,
  },

  // Vite configuration for additional optimizations
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            // Separate vendor chunks
            vendor: ["astro"],
          },
          // Optimize asset file names for caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name)) {
              return `assets/css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      // Optimize dependencies
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    // Optimize CSS
    css: {
      devSourcemap: true,
    },
  },

  // Development server configuration
  server: {
    port: 4321,
    host: true,
    allowedHosts: [".ngrok-free.app"],
  },

  // Image optimization configuration
  image: {
    // Enable image optimization with Sharp
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    // Configure image formats and quality for performance
    formats: ["avif", "webp", "svg"],
    // Configure image domains for external images
    remotePatterns: [],
    domains: [],
  },

  // Prefetch configuration for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  // Remove experimental features that are not available in this version
});

