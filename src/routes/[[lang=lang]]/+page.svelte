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

{#snippet card(note: Note)}
	<li>
		<a
			href={localizePath(`/${note.path}`, data.lang)}
			class="group flex items-start gap-4 rounded-2xl bg-zinc-50 p-5 transition hover:bg-zinc-100"
		>
			{#if note.order !== undefined}
				<span class="mt-0.5 shrink-0 text-xl font-bold tabular-nums text-zinc-300">
					{String(note.order).padStart(2, '0')}
				</span>
			{/if}
			<span class="min-w-0">
				<span class="block font-semibold text-zinc-900">{note.title}</span>
				<span class="mt-1 block text-sm text-zinc-500">{note.description}</span>
				<span class="mt-2 block text-xs text-zinc-400">
					{m.updated}
					<time datetime={note.updated}>{fmt.format(new Date(`${note.updated}T00:00:00`))}</time>
				</span>
			</span>
		</a>
	</li>
{/snippet}

<Seo jsonLd={personJsonLd} />

<section class="py-8">
	<h1 class="text-3xl font-bold tracking-tight">{m.greeting}</h1>
	<p class="mt-4 text-zinc-600">{m.bio}</p>
	<ul class="mt-4 space-y-1 text-zinc-600">
		{#each m.belongings as item (item.href)}
			<li><a href={item.href} class="underline hover:opacity-60">{item.text}</a></li>
		{/each}
	</ul>
	<ul class="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">
		<li><a href="https://www.linkedin.com/in/ryosuke-suzuki" class="hover:text-zinc-900">linkedin.com</a></li>
		<li><a href="https://x.com/ryosukecla" class="hover:text-zinc-900">x.com</a></li>
		<li><a href="https://github.com/RyosukeCla" class="hover:text-zinc-900">github.com</a></li>
		<li><a href="https://www.facebook.com/ryosuke.suzuki" class="hover:text-zinc-900">facebook.com</a></li>
	</ul>
</section>

<section id="notes" class="py-8">
	<h2 class="text-xl font-bold tracking-tight">{m.notes}</h2>
	<p class="mt-2 text-sm text-zinc-500">{m.notesIntro}</p>

	{#each data.sections as section (section.id)}
		{@const info = m.sections[section.id]}
		<div class="mt-10">
			<h3 class="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
				{#if section.index}
					<a href={localizePath(`/${section.index.path}`, data.lang)} class="hover:text-zinc-900">{info?.title ?? section.index.title ?? section.id}</a>
				{:else}
					{info?.title ?? section.id}
				{/if}
			</h3>
			{#if info?.intro}
				<p class="mt-2 max-w-xl text-sm text-zinc-500">{info.intro}</p>
			{/if}
			<ul class="mt-4 space-y-3">
				{#each section.notes as note (note.path)}
					{@render card(note)}
				{/each}
			</ul>
		</div>
	{/each}

	{#if data.pages.length}
		<div class="mt-10">
			<h3 class="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">{m.pages}</h3>
			<ul class="mt-4 space-y-3">
				{#each data.pages as note (note.path)}
					{@render card(note)}
				{/each}
			</ul>
		</div>
	{/if}
</section>
