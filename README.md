# ryosukesuzuki.dev

Personal site and notes. Not a blog: pages accumulate and are updated in place, each carrying an
`updated` date. Built with SvelteKit + mdsvex, fully prerendered, deployed on Vercel.

- `src/content/<section>/<slug>.md` — a note in a section (folder = section). Frontmatter:
  `title`, `description`, `updated` (ISO date), optional `order`, `draft`.
- `src/content/<slug>.md` — a top-level page.
- `src/lib/content/notes.ts` — the loader; `SECTIONS` there names and orders the sections.
- `src/lib/config.ts` — the canonical URL.

```
npm install
npm run dev      # http://localhost:3002
npm run build
```
