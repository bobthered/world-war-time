<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';
	import { theme } from 'sveltewind/theme';
	import { classic } from 'sveltewind/themes';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	theme.set.theme(structuredClone(classic));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
