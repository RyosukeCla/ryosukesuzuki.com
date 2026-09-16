// mdsvex compiles .md files into Svelte components with their frontmatter exported as `metadata`.
declare module '*.md' {
	import type { Component } from 'svelte';
	import type { NoteMeta } from '$lib/content/notes';

	export const metadata: NoteMeta;
	const component: Component;
	export default component;
}
