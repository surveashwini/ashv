# AshV– Children's Book Author Website

A fast, SEO-optimised, fully static website for a children's book author.
No build step required — just drop it on any static host.

---

## Quick Start

```bash
# Serve locally (any of these work)
npx serve .
python3 -m http.server 8080
php -S localhost:8080
```

---

## Personalising the Site

### 1. Replace author details
Search-replace every instance of:
- `AshV` → your name
- `ashv.github.io` → your domain
- `ashvstories@gmail.com` → your email

### 2. Add your books  (`js/books.js`)

Each book is one object in the `BOOKS` array:

```js
{
  id: "unique-slug",            // kebab-case, used in JSON-LD
  title: "Book Title",
  category: "picture-books",   // must match a slug in CATEGORIES
  ageRange: "Ages 3–6",
  description: "One sentence that makes a parent want to read more.",
  cover: "images/my-cover.jpg", // place file in /images/
  amazonUrl: "https://www.amazon.com/dp/YOUR_ASIN",
  badge: "New",                 // or null — renders a coloured pill
  year: 2024,
  schema: {
    isbn: "978-0-000000-00-0",
    numberOfPages: 32,
  },
}
```

### 3. Add a new category  (`js/books.js`)

```js
// In the CATEGORIES array:
{ slug: "activity-books", label: "Activity Books" }
```

A filter button and JSON-LD schema entry are generated automatically.

### 4. Update the author section  (`index.html`)

Find the `<section id="author">` block and update:
- `<img>` `src` and `alt`
- The bio paragraphs
- The `.author-facts` list items
- Amazon author page link

### 5. Add your cover images

Drop JPG/PNG files into `/images/` and reference them in `books.js`.
Recommended size: **560 × 750 px** (2× for retina), under 200 KB.
The book card falls back to a generated SVG placeholder if the image fails to load.

---

## SEO Checklist

- [ ] Replace all `ashv.github.io.com` URLs with your real domain
- [ ] Update `<meta name="description">` in `<head>`
- [ ] Add real `og:image` (1200×630 px) at `/images/og-cover.jpg`
- [ ] Fill in `sitemap.xml` with real book page URLs once you add them
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Update JSON-LD `sameAs` links with your real social profiles
- [ ] Fill real ISBN numbers for each book

---

## Deployment

Works on any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3.

```bash
# Netlify example
npm install -g netlify-cli
netlify deploy --prod --dir .
```
