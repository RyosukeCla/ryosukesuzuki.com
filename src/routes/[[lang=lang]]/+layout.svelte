<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { LANGS, delocalizePath, localizePath, messages } from '$lib/i18n';

	let { data, children } = $props();

	const m = $derived(messages[data.lang]);
	const other = $derived(LANGS.find((l) => l !== data.lang)!);
	// Switch language on the same page when it exists there; otherwise go to that language's home.
	const otherHref = $derived(
		(page.data.availableLangs ?? [...LANGS]).includes(other)
			? localizePath(delocalizePath(page.url.pathname), other)
			: localizePath('/', other)
	);
</script>

<div class="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
	<header class="flex items-center justify-between py-8">
		<a href={localizePath('/', data.lang)} class="font-semibold tracking-tight text-zinc-900 hover:opacity-60">{m.siteName}</a>
		<nav class="flex gap-5 text-sm text-zinc-500">
			<a href={localizePath('/#notes', data.lang)} class="hover:text-zinc-900">{m.notes}</a>
			<a href={otherHref} class="hover:text-zinc-900" hreflang={other}>{m.otherLang}</a>
		</nav>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="py-10 text-sm text-zinc-400">
		<small>© Ryosuke Suzuki</small>
	</footer>
</div>
