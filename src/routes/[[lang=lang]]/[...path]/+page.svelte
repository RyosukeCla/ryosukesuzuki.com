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

<p class="mt-8"><small><a href={localizePath('/', data.lang)}>Ryosuke Suzuki</a>{#if sectionTitle} / {sectionTitle}{/if}</small></p>
<h1 data-title>{meta.title}</h1>
{#if meta.description}
	<p class="text-[var(--color-subdue)]">{meta.description}</p>
{/if}
<p class="text-[var(--color-subdue)]">
	<small>{m.updated} <time datetime={meta.updated}>{fmt.format(new Date(`${meta.updated}T00:00:00`))}</time></small>
</p>

<Content />
