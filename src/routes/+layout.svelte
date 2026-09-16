<script lang="ts">
	import '../app.css';
	import { SITE_NAME } from '$lib/config';

	let { children } = $props();
</script>

<div class="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
	<header class="flex items-center justify-between py-8">
		<a href="/" class="font-semibold tracking-tight text-zinc-900 hover:opacity-60">{SITE_NAME}</a>
		<nav class="text-sm text-zinc-500">
			<a href="/#notes" class="hover:text-zinc-900">Notes</a>
		</nav>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="py-10 text-sm text-zinc-400">
		<small>© Ryosuke Suzuki</small>
	</footer>
</div>
