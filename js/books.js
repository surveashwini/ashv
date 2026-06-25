/**
 * books.js – Central book data store & renderer
 *
 * HOW TO ADD A BOOK
 * -----------------
 * 1. Add an object to the BOOKS array below.
 * 2. Set `category` to one of the existing values OR a new slug.
 * 3. Add the new slug to CATEGORIES so the filter button appears automatically.
 * 4. Drop the cover image in /images/ and reference it in `cover`.
 *
 * HOW TO ADD A CATEGORY
 * ----------------------
 * Add an entry to CATEGORIES: { slug: "my-slug", label: "My Label" }
 * The filter button and JSON-LD schema entry are generated automatically.
 */

// ─── Category Registry ────────────────────────────────────────────────────────
const CATEGORIES = [
  { slug: "picture-books", label: "Picture Books" },
  { slug: "illustrated", label: "Illustrated Stories" },
  { slug: "early-readers", label: "Early Readers" },
  { slug: "young-teen", label: "Young Teen" },
  // Add new categories here ↓
];

// ─── Book Data ────────────────────────────────────────────────────────────────
const BOOKS = [
  {
    id: "jack-full-heart",
    title: "Jack's full heart",
    category: "picture-books",
    ageRange: "Ages 3–6",
    description: `Meet Jack, a kind-hearted little boy who is about to learn one of life’s most beautiful lessons.
      When Jack visits his grandad, he doesn’t have much to give—but through small, everyday moments, he discovers that sharing isn’t about how much you have… it’s about the love behind it.
      Guided by his grandad’s gentle wisdom, Jack begins to see how even the tiniest act of kindness can brighten someone’s day. As he learns to care, give, and connect, Jack’s world slowly fills with warmth, joy, and meaningful friendships.
      Jack the Good Heart is a touching and uplifting story that teaches children the true value of kindness, empathy, and generosity.
      Perfect for young readers, this beautifully simple tale reminds us all:
      Even a little can be shared… and even a small heart can hold big love.`,
    cover: "images/jack-full-heart.png",
    amazonUrl: "https://www.amazon.com/dp/B0GH18FMK2",
    badge: "New",
    year: 2026,
    schema: {
      isbn: "979-8254067801",
      numberOfPages: 22,
    },
  },
  {
    id: "incredible-mia-part-1",
    title: "Incredible Mia",
    category: "picture-books",
    ageRange: "Ages 3–9",
    description: `What if the smallest bee had the biggest heart?
      Mia is a tiny bee with delicate wings and a curious spirit—but one unexpected moment changes everything. Separated from her hive, she finds herself alone in a vast, unfamiliar world.
      Far from home, Mia meets an unlikely friend who shows her kindness when she needs it most. As she heals and grows stronger, Mia must find the courage to face her fears, trust herself, and follow the quiet pull of where she truly belongs.
      Her journey back won’t be easy… but it will be worth it.
      Incredible Mia is a gentle, heartwarming story about bravery, honesty, friendship, and the power of never giving up—even when you feel small in a big world.
      Perfect for young readers, this beautifully told tale reminds us:
      You don’t have to be big to do something incredible.`,
    cover: "images/incredible-mia-1.jpeg",
    amazonUrl: "https://www.amazon.com/dp/B0GVGX1F6X",
    badge: "New",
    year: 2026,
    schema: {
      isbn: "979-8254092544",
      numberOfPages: 40,
    },
  },
  {
    id: "incredible-mia-part-2",
    title: "Incredible Mia: The Brave Little Queen",
    category: "picture-books",
    ageRange: "Ages 3–9",
    description: `Mia may be small, but her heart is enormous! When she returns to her hive after a fall, she discovers not everyone is treated fairly—especially the elder bees who have worked hard all their lives. 
      Determined to make a difference, Mia befriends Mr. Tutu, cares for those in need, and discovers the courage inside herself to speak up, lead, and change her world.
      Bursting with warmth, adventure, and heart, Incredible Mia: The Brave Little Queen is a story about kindness, courage, and the power of believing in yourself—even when the hive seems too big and the rules too strict. Perfect for young readers who love bees, bravery, and heroes who lead with their hearts.`,
    cover: "images/incredible-mia-2.jpeg",
    amazonUrl: "https://www.amazon.com/dp/B0GVF9T6V4",
    badge: "New",
    year: 2026,
    schema: {
      isbn: "979-8254204527",
      numberOfPages: 47,
    },
  },
  {
    id: "lola-and-the-puddle-adventure",
    title: "Lola and the puddle that became an ocean",
    category: "illustrated",
    ageRange: "Ages 3–9",
    description: `On a quiet rainy day, Lola stands at the edge of a small puddle… unsure, a little afraid.
      But when something inside the water begins to glow, curiosity pulls her closer.
      One tiny step turns into an extraordinary journey beneath the surface, where dancing fish, glowing lights, and playful sea creatures share a beautiful secret:
      You don’t have to be born brave.
      You can grow into it—one small step at a time.
      Lola and the Puddle That Became an Ocean is a heartwarming story about courage, self-belief, and discovering the magic within you.
      Perfect for children ages 3–8, this gentle, dreamy adventure helps little readers:
      Build confidence at their own pace
      Embrace mistakes and keep trying
      Believe in their own unique light
      A cozy, magical read for bedtime… and for every child learning to take their first brave step 💛`,
    cover: "images/lola.png",
    amazonUrl: "https://www.amazon.com/dp/B0GLXK6HSZ",
    badge: "New",
    year: 2026,
    schema: {
      isbn: "978-0-000000-03-1",
      numberOfPages: 27,
    },
  },
  {
    id: "sara-and-the-mermaid",
    title: "Sara and the mermaid",
    category: "illustrated",
    ageRange: "Ages 3–9",
    description: `Sara thinks the ocean is full of things to fear.
      It's too deep. Too mysterious. Too unknown.
      But everything changes when a shimmer beneath the waves leads her to Kiara, a mermaid with a kind heart, a mischievous plat named Mumu, and a magical underwater world unlike anything Sara has ever imagined.
      Together, they ride dolphins, discover glowing strawberry fields, find the perfect plat companion, and learn that the greatest adventures begin with a single brave step.
      A heartwarming story about friendship, courage, belonging, and the magic waiting just beyond our fears.
      Perfect for young readers who dream of mermaids, ocean adventures, and finding their very best friend.`,
    cover: "images/sara-mermaid.png",
    amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX",
    badge: "New",
    year: 2021,
    schema: {
      isbn: "978-0-000000-07-9",
      numberOfPages: 248,
    },
  },
];

// ─── Book Card Renderer ────────────────────────────────────────────────────────

/**
 * Returns the SVG placeholder cover for a book (used when image fails to load).
 * Each category gets a distinct colour pair.
 */
function getCoverPlaceholder(book) {
  const palettes = {
    "picture-books": { bg: "#FDE9D0", accent: "#E8A020" },
    "illustrated": { bg: "#D6EAF8", accent: "#2980B9" },
    "early-readers": { bg: "#D5F5E3", accent: "#27AE60" },
    "young-teen": { bg: "#E8DAEF", accent: "#7D3C98" },
  };
  const { bg, accent } = palettes[book.category] || { bg: "#F0F0F0", accent: "#999" };
  const initials = book.title.split(" ").slice(0, 2).map(w => w[0]).join("");

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="280" height="380" viewBox="0 0 280 380">
      <rect width="280" height="380" fill="${bg}"/>
      <rect x="20" y="20" width="8" height="340" fill="${accent}" opacity="0.6"/>
      <text x="154" y="180" font-family="Georgia,serif" font-size="64" fill="${accent}" opacity="0.3" text-anchor="middle">${initials}</text>
      <text x="154" y="280" font-family="Georgia,serif" font-size="15" fill="#333" text-anchor="middle" font-style="italic">${book.title}</text>
    </svg>
  `)}`;
}

/**
 * Renders a single book card as an article element.
 */
function renderBookCard(book) {
  const article = document.createElement("article");
  article.className = "book-card";
  article.setAttribute("role", "listitem");
  article.setAttribute("data-category", book.category);
  article.setAttribute("itemscope", "");
  article.setAttribute("itemtype", "https://schema.org/Book");

  const badgeHTML = book.badge
    ? `<span class="book-badge">${book.badge}</span>`
    : "";

  const categoryLabel = CATEGORIES.find(c => c.slug === book.category)?.label ?? book.category;

  article.innerHTML = `
    <a
      href="${book.amazonUrl}"
      target="_blank"
      rel="noopener noreferrer"
      class="book-card__link"
      aria-label="Buy ${book.title} on Amazon (opens in new tab)"
    >
      <div class="book-card__cover-wrap">
        ${badgeHTML}
        <img
          src="${book.cover}"
          alt="Cover of ${book.title} – ${book.description}"
          width="280"
          height="380"
          loading="lazy"
          class="book-card__cover"
          itemprop="image"
          onerror="this.src='${getCoverPlaceholder(book)}'"
        />
        <div class="book-card__overlay" aria-hidden="true">
          <span class="book-card__cta">View on Amazon →</span>
        </div>
      </div>
      <div class="book-card__info">
        <span class="book-card__category">${categoryLabel}</span>
        <h3 class="book-card__title" itemprop="name">${book.title}</h3>
        <span class="book-card__age" itemprop="typicalAgeRange">${book.ageRange}</span>
        <p class="book-card__desc" itemprop="description">${book.description}</p>
      </div>
    </a>
    <meta itemprop="author" content="Jane Doe" />
    <meta itemprop="isbn" content="${book.schema.isbn}" />
    <meta itemprop="numberOfPages" content="${book.schema.numberOfPages}" />
    <meta itemprop="datePublished" content="${book.year}" />
  `;

  return article;
}

// ─── Filter Logic ─────────────────────────────────────────────────────────────

/**
 * Populates the filter bar from CATEGORIES and renders all books.
 * Called once on DOMContentLoaded.
 */
function initBooks() {
  const grid = document.getElementById("book-grid");
  const filterBar = document.querySelector(".filter-bar");

  if (!grid) return;

  // Build filter buttons from CATEGORIES (beyond the hard-coded "All")
  if (filterBar) {
    CATEGORIES.forEach(cat => {
      // Only add if not already in the HTML
      if (!filterBar.querySelector(`[data-filter="${cat.slug}"]`)) {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.dataset.filter = cat.slug;
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = cat.label;
        filterBar.appendChild(btn);
      }
    });

    // Wire up click handlers
    filterBar.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterBar.querySelectorAll(".filter-btn").forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        filterBooks(btn.dataset.filter);
      });
    });
  }

  // Initial render – all books
  renderBooks(BOOKS);
}

function filterBooks(filter) {
  const filtered = filter === "all"
    ? BOOKS
    : BOOKS.filter(b => b.category === filter);
  renderBooks(filtered);
}

function renderBooks(books) {
  const grid = document.getElementById("book-grid");
  grid.innerHTML = "";

  if (books.length === 0) {
    grid.innerHTML = `<p class="no-results">No books in this category yet — check back soon!</p>`;
    return;
  }

  // Inject per-book JSON-LD for rich search results
  const existing = document.getElementById("books-jsonld");
  if (existing) existing.remove();

  const schemaBooks = books.map(book => ({
    "@type": "Book",
    "@id": `https://www.ashv.github.io/#${book.id}`,
    "name": book.title,
    "author": { "@id": "https://www.ashv.github.io/#author" },
    "isbn": book.schema.isbn,
    "numberOfPages": book.schema.numberOfPages,
    "datePublished": String(book.year),
    "typicalAgeRange": book.ageRange,
    "description": book.description,
    "image": `https://www.ashv.github.io/${book.cover}`,
    "url": book.amazonUrl,
    "offers": {
      "@type": "Offer",
      "url": book.amazonUrl,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Amazon" }
    }
  }));

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "books-jsonld";
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": schemaBooks });
  document.head.appendChild(script);

  // Staggered fade-in
  books.forEach((book, i) => {
    const card = renderBookCard(book);
    card.style.animationDelay = `${i * 60}ms`;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", initBooks);
