<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { LANGS, delocalizePath, localizePath, type Lang } from '$lib/i18n';

	let { data, children } = $props();

	const label: Record<Lang, string> = { en: 'EN', ja: 'JP' };

	// Switch language on the same page when it exists there; otherwise go to that language's home.
	function hrefFor(lang: Lang): string {
		if (lang === data.lang) return page.url.pathname;
		return (page.data.availableLangs ?? [...LANGS]).includes(lang)
			? localizePath(delocalizePath(page.url.pathname), lang)
			: localizePath('/', lang);
	}
</script>

<div class="mx-auto min-w-[380px] max-w-[670px]">
	<div class="overflow-hidden px-4">
		{@render children()}
	</div>
	<footer class="p-4 text-[var(--color-subdue)]">
		<small>Ⓒ Ryosuke Suzuki</small>
	</footer>
	<div class="fixed right-4 bottom-4 flex items-center gap-2 text-sm backdrop-blur-sm">
		{#each LANGS as lang, i (lang)}
			{#if i > 0}<span>|</span>{/if}
			<a href={hrefFor(lang)} class="text-sm no-underline" hreflang={lang}>{label[lang]}</a>
		{/each}
	</div>
</div>
