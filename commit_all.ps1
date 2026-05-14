$ErrorActionPreference = "Stop"
git add src/components/hero.tsx src/components/navbar.tsx
git commit -m "Hero section: rewrite for Upwork positioning"
git push

git add src/lib/data.ts src/components/tech-stack.tsx
git commit -m "Projects: reorder and rewrite top 3 cards"
git push

git add src/components/testimonials.tsx
git commit -m "Testimonials: replace with real Mostaql client reviews"
git push

git add src/components/process.tsx
git commit -m "Process section: replace with real workflow description"
git push

git add src/components/contact.tsx src/components/terminal.tsx
git commit -m "Contact CTA: update for Upwork availability"
git push

git add src/app/page.tsx src/components/about.tsx public/resources/
git commit -m "About section: add photo and realistic positioning"
git push

git add src/app/layout.tsx src/app/robots.ts src/app/sitemap.ts src/app/opengraph-image.tsx
git commit -m "SEO: update metadata for search visibility"
git push

git add src/components/project-card-premium.tsx
git commit -m "Project cards: remove +2 tease badges"
git push

git add public/projects/
git commit -m "Add project context and README files"
git push
