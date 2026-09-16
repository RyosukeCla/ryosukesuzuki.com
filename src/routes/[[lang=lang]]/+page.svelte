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
	<li class="my-5 list-none pl-0">
		<div class="flex items-baseline gap-3">
			<span class="w-6 shrink-0 text-sm tabular-nums text-[var(--color-subdue)]">
				{note.order !== undefined ? String(note.order).padStart(2, '0') : ''}
			</span>
			<a href={localizePath(`/${note.path}`, data.lang)}>{note.title}</a>
		</div>
		<p class="my-1 ml-9 text-sm leading-relaxed text-[var(--color-subdue)]">
			{#if note.description}{note.description}<br />{/if}
			{m.updated} <time datetime={note.updated}>{fmt.format(new Date(`${note.updated}T00:00:00`))}</time>
		</p>
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
	<ul class="my-4 list-none pl-0">
		{#each section.notes as note (note.path)}
			{@render row(note)}
		{/each}
	</ul>
{/each}

{#if data.pages.length}
	<h3>{m.pages}</h3>
	<ul class="my-4 list-none pl-0">
		{#each data.pages as note (note.path)}
			{@render row(note)}
		{/each}
	</ul>
{/if}
