import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, b as renderTemplate } from './astro/server-BZmwl3w6.js';
import 'kleur/colors';
import 'clsx';
/* empty css                        */

const $$Astro = createAstro("https://portfolio.example.com");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { post, class: className = "" } = Astro2.props;
  const { title, description, publishDate, tags } = post.data;
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime2 = Math.ceil(wordCount / wordsPerMinute);
    return readingTime2;
  };
  const readingTime = calculateReadingTime(post.body);
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`blog-card ${className}`, "class")} data-astro-cid-e3grugc2> <div class="blog-content" data-astro-cid-e3grugc2> <!-- Blog Header --> <div class="blog-header" data-astro-cid-e3grugc2> <div class="blog-meta" data-astro-cid-e3grugc2> <time class="blog-date"${addAttribute(publishDate.toISOString(), "datetime")} data-astro-cid-e3grugc2> ${formatDate(publishDate)} </time> <span class="blog-reading-time" data-astro-cid-e3grugc2> ${readingTime} min read
</span> </div> ${post.data.featured && renderTemplate`<span class="featured-badge" aria-label="Featured article" data-astro-cid-e3grugc2> <svg class="featured-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-e3grugc2> <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" data-astro-cid-e3grugc2></polygon> </svg>
Featured
</span>`} </div> <!-- Blog Title --> <h3 class="blog-title" data-astro-cid-e3grugc2> <a${addAttribute(`/blog/${post.slug}`, "href")} class="blog-link" data-astro-cid-e3grugc2> ${title} </a> </h3> <!-- Blog Description --> <p class="blog-description" data-astro-cid-e3grugc2> ${description} </p> <!-- Tags --> ${tags && tags.length > 0 && renderTemplate`<div class="blog-tags" data-astro-cid-e3grugc2> ${tags.map((tag) => renderTemplate`<span class="tag-badge" data-astro-cid-e3grugc2>#${tag}</span>`)} </div>`} <!-- Read More Link --> <div class="blog-footer" data-astro-cid-e3grugc2> <a${addAttribute(`/blog/${post.slug}`, "href")} class="read-more-link" data-astro-cid-e3grugc2>
Read more
<svg class="read-more-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-e3grugc2> <path d="M5 12h14" data-astro-cid-e3grugc2></path> <path d="M12 5l7 7-7 7" data-astro-cid-e3grugc2></path> </svg> </a> </div> </div> </article> `;
}, "/home/felinedis/develop/portfolio/src/components/BlogCard.astro", void 0);

export { $$BlogCard as $ };
