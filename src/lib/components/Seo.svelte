<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/config';
	import { DEFAULT_LANG, LANGS, delocalizePath, localizePath, messages, type Lang } from '$lib/i18n';

	interface Props {
		/** Page title without the site name; the site name is appended automatically. */
		title?: string;
		description?: string;
		type?: 'website' | 'article';
		/** ISO date of the last edit; rendered as article:modified_time. */
		updated?: string;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		/** Languages this page exists in; drives the hreflang alternate links. */
		availableLangs?: Lang[];
	}

	let { title, description, type = 'website', updated, jsonLd, availableLangs = [...LANGS] }: Props = $props();

	const lang = $derived(page.data.lang ?? DEFAULT_LANG);
	const m = $derived(messages[lang]);
	const finalDescription = $derived(description ?? m.description);
	const fullTitle = $derived(title ? `${title} · ${m.siteName}` : m.siteName);
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
	const basePath = $derived(delocalizePath(page.url.pathname));
	const alternates = $derived(
		availableLangs.map((l) => ({ lang: l, href: new URL(localizePath(basePath, l), SITE_URL).href }))
	);
	const jsonLdTags = $derived(
		(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []).map(
			(entry) => `<script type="application/ld+json">${JSON.stringify(entry)}<\/script>`
		)
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={finalDescription} />
	<meta name="author" content={m.siteName} />
	<link rel="canonical" href={canonical} />
	{#each alternates as alt (alt.lang)}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	{#if availableLangs.includes(DEFAULT_LANG)}
		<link rel="alternate" hreflang="x-default" href={new URL(localizePath(basePath, DEFAULT_LANG), SITE_URL).href} />
	{/if}

	<meta property="og:site_name" content={m.siteName} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={lang === 'ja' ? 'ja_JP' : 'en_US'} />
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
