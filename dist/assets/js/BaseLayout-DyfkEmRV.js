import { c as createAstro, a as createComponent, m as maybeRenderHead, d as renderScript, e as addAttribute, b as renderTemplate, f as renderSlot, r as renderComponent, g as renderHead, u as unescapeHTML } from './astro/server-BZmwl3w6.js';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro("https://portfolio.example.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { currentPath = "" } = Astro2.props;
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "My Work" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" }
  ];
  const isActive = (href) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };
  return renderTemplate`${maybeRenderHead()}<nav class="navigation" aria-label="Main navigation" data-astro-cid-pux6a34n> <div class="nav-container" data-astro-cid-pux6a34n> <!-- Logo/Brand --> <div class="nav-brand" data-astro-cid-pux6a34n> <a href="/" class="brand-link" aria-label="Go to homepage" data-astro-cid-pux6a34n> <span class="brand-text" data-astro-cid-pux6a34n>Jon Hansen</span> </a> </div> <!-- Desktop Navigation --> <div class="nav-menu" id="nav-menu" data-astro-cid-pux6a34n> <ul class="nav-list" data-astro-cid-pux6a34n> ${navItems.map(({ href, label }) => renderTemplate`<li class="nav-item" data-astro-cid-pux6a34n> <a${addAttribute(href, "href")}${addAttribute(`nav-link ${isActive(href) ? "active" : ""}`, "class")}${addAttribute(isActive(href) ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> ${label} </a> </li>`)} </ul> </div> <!-- Mobile Menu Toggle --> <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu" data-astro-cid-pux6a34n> <span class="hamburger-line" data-astro-cid-pux6a34n></span> <span class="hamburger-line" data-astro-cid-pux6a34n></span> <span class="hamburger-line" data-astro-cid-pux6a34n></span> </button> </div> </nav>  ${renderScript($$result, "/home/felinedis/develop/portfolio/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/felinedis/develop/portfolio/src/components/Navigation.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://portfolio.example.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Portfolio",
    description = "Personal portfolio website showcasing software projects and technical articles",
    image = "/favicon.svg",
    type = "website",
    publishedTime,
    modifiedTime,
    tags = [],
    canonicalURL,
    keywords = [],
    author = "Portfolio Developer",
    noindex = false
  } = Astro2.props;
  const currentURL = canonicalURL || Astro2.url.href;
  const fullTitle = title === "Portfolio" ? title : `${title} | Portfolio`;
  const siteURL = Astro2.site || new URL("http://localhost:4321");
  const imageURL = new URL(image, siteURL).href;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "name": fullTitle,
    "description": description,
    "url": currentURL,
    "image": imageURL,
    "author": {
      "@type": "Person",
      "name": author
    },
    ...type === "article" && publishedTime && {
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    },
    ...type === "website" && {
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteURL.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  };
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/feline-dis", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/feline-dis", icon: "linkedin" },
    { name: "Email", url: "mailto:jonhansen.dev@gmail.com", icon: "email" }
  ];
  const metaKeywords = [
    "portfolio",
    "software developer",
    "web development",
    "programming",
    "projects",
    "blog",
    ...keywords,
    ...tags
  ].filter(Boolean).join(", ");
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-37fxchfa> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', '><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Primary Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', ">", '<meta name="author"', '><meta name="language" content="en"><meta name="theme-color" content="#1a1a1a"><!-- Canonical URL --><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:alt"', '><meta property="og:site_name" content="Portfolio"><meta property="og:locale" content="en_US"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', '><meta name="twitter:creator" content="@portfolio"><meta name="twitter:site" content="@portfolio"><!-- Article specific meta tags -->', "", "", "", '<!-- SEO and Indexing --><meta name="robots"', '><meta name="googlebot"', '><!-- Performance and Security --><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="msapplication-TileColor" content="#1a1a1a"><!-- Structured Data --><script type="application/ld+json">', '<\/script><!-- Preload critical fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Preload critical resources --><link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossorigin><!-- Global Styles --><link rel="stylesheet" href="/src/styles/global.css"><!-- Performance monitoring and accessibility initialization script -->', "<!-- Skip links and accessibility styles -->", '</head> <body data-astro-cid-37fxchfa> <!-- Skip links for accessibility --> <div class="skip-links" data-astro-cid-37fxchfa> <a href="#main-content" class="skip-link" data-astro-cid-37fxchfa>Skip to main content</a> <a href="#navigation" class="skip-link" data-astro-cid-37fxchfa>Skip to navigation</a> <a href="#footer" class="skip-link" data-astro-cid-37fxchfa>Skip to footer</a> </div> <!-- Header with Navigation --> <header role="banner" data-astro-cid-37fxchfa> <div id="navigation" data-astro-cid-37fxchfa> ', ' </div> </header> <!-- Main Content --> <main id="main-content" role="main" data-astro-cid-37fxchfa> ', ' </main> <!-- Footer --> <footer id="footer" class="site-footer" role="contentinfo" data-astro-cid-37fxchfa> <div class="footer-container" data-astro-cid-37fxchfa> <div class="footer-content" data-astro-cid-37fxchfa> <!-- Footer Brand --> <div class="footer-brand" data-astro-cid-37fxchfa> <h3 class="footer-title" data-astro-cid-37fxchfa>Portfolio</h3> <p class="footer-description" data-astro-cid-37fxchfa>\nJon Hansen is a Full-Stack Software Engineer based in Gilbert, Arizona, with a strong track record of building and maintaining scalable APIs and modern, responsive front-end interfaces. Over four years of professional experience, most recently at NERD Power LLC. Proficient in JavaScript (ES6+), Node.js, React, Next.js, PostgreSQL, AWS, and more.\n</p> </div> <!-- Quick Links --> <div class="footer-section" data-astro-cid-37fxchfa> <h4 class="footer-section-title" data-astro-cid-37fxchfa>Quick Links</h4> <ul class="footer-links" data-astro-cid-37fxchfa> <li data-astro-cid-37fxchfa><a href="/" class="footer-link" data-astro-cid-37fxchfa>Home</a></li> <li data-astro-cid-37fxchfa><a href="/projects" class="footer-link" data-astro-cid-37fxchfa>Projects</a></li> <li data-astro-cid-37fxchfa><a href="/blog" class="footer-link" data-astro-cid-37fxchfa>Blog</a></li> <li data-astro-cid-37fxchfa><a href="/about" class="footer-link" data-astro-cid-37fxchfa>About</a></li> </ul> </div> <!-- Social Links --> <div class="footer-section" data-astro-cid-37fxchfa> <h4 class="footer-section-title" data-astro-cid-37fxchfa>Connect</h4> <ul class="footer-social" data-astro-cid-37fxchfa> ', ' </ul> </div> </div> <!-- Footer Bottom --> <div class="footer-bottom" data-astro-cid-37fxchfa> <p class="footer-copyright" data-astro-cid-37fxchfa>\n\xA9 ', ' Portfolio. Built with\n<a href="https://astro.build" target="_blank" rel="noopener noreferrer" class="footer-link" data-astro-cid-37fxchfa>Astro</a>.\n</p> </div> </div> </footer> </body></html>'])), addAttribute(Astro2.generator, "content"), fullTitle, addAttribute(fullTitle, "content"), addAttribute(description, "content"), metaKeywords && renderTemplate`<meta name="keywords"${addAttribute(metaKeywords, "content")}>`, addAttribute(author, "content"), addAttribute(currentURL, "href"), addAttribute(type, "content"), addAttribute(currentURL, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(imageURL, "content"), addAttribute(`${fullTitle} - Portfolio`, "content"), addAttribute(currentURL, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(imageURL, "content"), addAttribute(`${fullTitle} - Portfolio`, "content"), type === "article" && publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`, type === "article" && modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`, type === "article" && author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`, type === "article" && tags.length > 0 && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`), addAttribute(noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content"), addAttribute(noindex ? "noindex, nofollow" : "index, follow", "content"), unescapeHTML(JSON.stringify(structuredData)), renderScript($$result, "/home/felinedis/develop/portfolio/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"), renderHead(), renderComponent($$result, "Navigation", $$Navigation, { "currentPath": Astro2.url.pathname, "data-astro-cid-37fxchfa": true }), renderSlot($$result, $$slots["default"]), socialLinks.map(({ name, url, icon }) => renderTemplate`<li data-astro-cid-37fxchfa> <a${addAttribute(url, "href")} class="footer-social-link" target="_blank" rel="noopener noreferrer"${addAttribute(`Visit ${name} profile`, "aria-label")} data-astro-cid-37fxchfa> <span class="social-icon"${addAttribute(icon, "data-icon")} data-astro-cid-37fxchfa></span> ${name} </a> </li>`), (/* @__PURE__ */ new Date()).getFullYear());
}, "/home/felinedis/develop/portfolio/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
