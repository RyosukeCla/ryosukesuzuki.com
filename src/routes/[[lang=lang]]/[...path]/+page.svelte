<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_URL } from '$lib/config';
	import { dateFormatter, localizePath, messages } from '$lib/i18n';

	let { data } = $props();

	const meta = $derived(data.meta);
	const Content = $derived(data.content);
	const m = $derived(messages[data.lang]);
	const fmt = $derived(dateFormatter(data.lang, 'long'));
	const sectionTitle = $derived(m.sections[data.note.section]?.title ?? data.note.section);
	const url = $derived(new URL(localizePath(`/${data.path}`, data.lang), SITE_URL).href);

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: meta.title,
		description: meta.description,
		dateModified: meta.updated,
		inLanguage: data.lang,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		url,
		author: { '@type': 'Person', name: 'Ryosuke Suzuki', url: SITE_URL }
	});
</script>

<Seo title={meta.title} description={meta.description} type="article" updated={meta.updated} availableLangs={data.availableLangs} {jsonLd} />

<article class="py-8">
	<header class="mb-10">
		{#if sectionTitle}
			<p class="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">{sectionTitle}</p>
		{/if}
		<h1 class="mt-2 text-3xl font-bold tracking-tight">{meta.title}</h1>
		<p class="mt-3 text-zinc-500">{meta.description}</p>
		<p class="mt-3 text-sm text-zinc-400">
			{m.updated} <time datetime={meta.updated}>{fmt.format(new Date(`${meta.updated}T00:00:00`))}</time>
		</p>
	</header>
	<div class="prose prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-zinc-900">
		<Content />
	</div>
</article>
