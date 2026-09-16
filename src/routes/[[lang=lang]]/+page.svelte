<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_URL } from '$lib/config';
	import { dateFormatter, localizePath, messages } from '$lib/i18n';
	import type { Note } from '$lib/content/notes';

	let { data } = $props();

	const m = $derived(messages[data.lang]);
	const fmt = $derived(dateFormatter(data.lang));

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ryosuke Suzuki',
		url: SITE_URL,
		sameAs: [
			'https://www.linkedin.com/in/ryosuke-suzuki',
			'https://x.com/ryosukecla',
			'https://github.com/RyosukeCla'
		]
	};
</script>

{#snippet row(note: Note)}
	<li>
		<a href={localizePath(`/${note.path}`, data.lang)}>
			{#if note.order !== undefined}<span class="tabular-nums text-[var(--color-subdue)]">{String(note.order).padStart(2, '0')}</span>{/if}
			{note.title}
		</a>
		{#if note.description}
			<span class="text-[var(--color-subdue)]"> — {note.description}</span>
		{/if}
		<small class="text-[var(--color-subdue)]">
			({m.updated} <time datetime={note.updated}>{fmt.format(new Date(`${note.updated}T00:00:00`))}</time>)
		</small>
	</li>
{/snippet}

<Seo jsonLd={personJsonLd} />

<h1 data-title>{m.greeting}</h1>
<p>{m.bio}</p>

<p>
	{#each m.belongings as item, i (item.href)}
		{#if i > 0}<br />{/if}
		- <a href={item.href}>{item.text}</a>
	{/each}
</p>

<ul>
	<li><a href="https://www.linkedin.com/in/ryosuke-suzuki">linkedin.com</a></li>
	<li><a href="https://x.com/ryosukecla">x.com</a></li>
	<li><a href="https://github.com/RyosukeCla">github.com</a></li>
	<li><a href="https://www.facebook.com/ryosuke.suzuki">facebook.com</a></li>
</ul>

<h2 id="notes">{m.notes}</h2>

{#each data.sections as section (section.id)}
	{@const info = m.sections[section.id]}
	<h3>
		{#if section.index}
			<a href={localizePath(`/${section.index.path}`, data.lang)}>{info?.title ?? section.index.title ?? section.id}</a>
		{:else}
			{info?.title ?? section.id}
		{/if}
	</h3>
	{#if info?.intro}
		<p class="text-[var(--color-subdue)]"><small>{info.intro}</small></p>
	{/if}
	<ul>
		{#each section.notes as note (note.path)}
			{@render row(note)}
		{/each}
	</ul>
{/each}

{#if data.pages.length}
	<h3>{m.pages}</h3>
	<ul>
		{#each data.pages as note (note.path)}
			{@render row(note)}
		{/each}
	</ul>
{/if}
