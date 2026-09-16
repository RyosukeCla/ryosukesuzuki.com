<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_NAME, SITE_URL } from '$lib/config';

	let { data } = $props();

	const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE_NAME,
		url: SITE_URL,
		sameAs: [
			'https://www.linkedin.com/in/ryosuke-suzuki',
			'https://x.com/ryosukecla',
			'https://github.com/RyosukeCla'
		]
	};
</script>

<Seo jsonLd={personJsonLd} />

<section class="py-8">
	<h1 class="text-3xl font-bold tracking-tight">Hi</h1>
	<p class="mt-4 text-zinc-600">I am Ryosuke Suzuki, a tech entrepreneur in Tokyo.</p>
	<ul class="mt-4 space-y-1 text-zinc-600">
		<li>Founder of <a href="https://u17g.com" class="underline hover:opacity-60">Unbounded Pioneering</a>.</li>
		<li>Building <a href="https://snip0.com" class="underline hover:opacity-60">Snip0</a>, a video editor for the phone.</li>
		<li>Ex-Software Engineer at <a href="https://plaid.co.jp" class="underline hover:opacity-60">Plaid, Inc.</a></li>
	</ul>
	<ul class="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">
		<li><a href="https://www.linkedin.com/in/ryosuke-suzuki" class="hover:text-zinc-900">linkedin.com</a></li>
		<li><a href="https://x.com/ryosukecla" class="hover:text-zinc-900">x.com</a></li>
		<li><a href="https://github.com/RyosukeCla" class="hover:text-zinc-900">github.com</a></li>
		<li><a href="https://www.facebook.com/ryosuke.suzuki" class="hover:text-zinc-900">facebook.com</a></li>
	</ul>
</section>

<section id="notes" class="py-8">
	<h2 class="text-xl font-bold tracking-tight">Notes</h2>
	<p class="mt-2 text-sm text-zinc-500">
		Not a blog. Pages here accumulate and are rewritten in place; each shows when it last changed.
	</p>

	{#each data.sections as section (section.id)}
		<div class="mt-10">
			<h3 class="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">{section.title}</h3>
			{#if section.intro}
				<p class="mt-2 max-w-xl text-sm text-zinc-500">{section.intro}</p>
			{/if}
			<ul class="mt-4 space-y-3">
				{#each section.notes as note (note.path)}
					<li>
						<a href={`/${note.path}`} class="group block rounded-2xl bg-zinc-50 p-5 transition hover:bg-zinc-100">
							<span class="block font-semibold text-zinc-900">{note.title}</span>
							<span class="mt-1 block text-sm text-zinc-500">{note.description}</span>
							<span class="mt-2 block text-xs text-zinc-400">
								Updated <time datetime={note.updated}>{dateFormat.format(new Date(`${note.updated}T00:00:00`))}</time>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}

	{#if data.pages.length}
		<div class="mt-10">
			<h3 class="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">Pages</h3>
			<ul class="mt-4 space-y-3">
				{#each data.pages as note (note.path)}
					<li>
						<a href={`/${note.path}`} class="group block rounded-2xl bg-zinc-50 p-5 transition hover:bg-zinc-100">
							<span class="block font-semibold text-zinc-900">{note.title}</span>
							<span class="mt-1 block text-sm text-zinc-500">{note.description}</span>
							<span class="mt-2 block text-xs text-zinc-400">
								Updated <time datetime={note.updated}>{dateFormat.format(new Date(`${note.updated}T00:00:00`))}</time>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>
