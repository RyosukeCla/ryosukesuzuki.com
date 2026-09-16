import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Markdown files are Svelte components: the notes under src/content import as such.
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], smartypants: { dashes: 'oldschool' } })],
	kit: {
		// Every route is prerendered (src/routes/+layout.ts), so Vercel serves static files.
		adapter: adapter(),
		alias: { $content: 'src/content' }
	}
};

export default config;
