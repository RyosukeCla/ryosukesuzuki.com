<script lang="ts">
	import { page } from '$app/state';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '$lib/config';

	interface Props {
		/** Page title without the site name; the site name is appended automatically. */
		title?: string;
		description?: string;
		type?: 'website' | 'article';
		/** ISO date of the last edit; rendered as article:modified_time. */
		updated?: string;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	}

	let { title, description, type = 'website', updated, jsonLd }: Props = $props();

	const finalDescription = $derived(description ?? SITE_DESCRIPTION);
	const fullTitle = $derived(title ? `${title} · ${SITE_NAME}` : SITE_NAME);
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
	const jsonLdTags = $derived(
		(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []).map(
			(entry) => `<script type="application/ld+json">${JSON.stringify(entry)}<\/script>`
		)
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={finalDescription} />
	<meta name="author" content={SITE_NAME} />
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	{#if type === 'article' && updated}
		<meta property="article:modified_time" content={updated} />
	{/if}

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={finalDescription} />

	{#each jsonLdTags as tag, i (i)}
		{@html tag}
	{/each}
</svelte:head>
