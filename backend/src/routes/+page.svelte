<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Badge, Button, Card, Code, Div, H1, H2, Main, P } from 'sveltewind/components';
	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();
	let testing = $state(false);
</script>

<svelte:head>
	<title>World War Time · Backend</title>
	<meta name="description" content="World War Time backend setup and content management." />
</svelte:head>

<Main class="mx-auto max-w-4xl space-y-8 px-6 py-16">
	<Div class="space-y-3">
		<P class="text-sm font-semibold tracking-widest text-stone-500 uppercase">World War Time</P>
		<H1 class="text-4xl font-semibold tracking-tight">Backend workspace</H1>
		<P class="text-stone-600">The starting point for a shared world and personal timelines.</P>
	</Div>
	<Card class="space-y-5 bg-white p-8">
		<Div class="flex flex-wrap items-center justify-between gap-3">
			<H2 class="text-xl font-semibold">MongoDB Atlas</H2>
			<Badge>{data.databaseConfigured ? 'URI configured · connection unverified' : 'Awaiting connection string'}</Badge>
		</Div>
		<P>Add your Atlas connection string to <Code>MONGODB_URI</Code> in <Code>backend/.env</Code>, then restart the server.</P>
		<P class="text-sm text-stone-600">Testing the connection sends a ping. It does not generate quadrants or write world content.</P>
		<form method="POST" action="?/testConnection" use:enhance={() => {
			testing = true;
			return async ({ update }) => { try { await update(); } finally { testing = false; } };
		}}>
			<Button type="submit" disabled={!data.databaseConfigured || testing} variants={['primary']}>
				{testing ? 'Testing connection…' : 'Test Atlas connection'}
			</Button>
		</form>
		{#if form}
			<Alert role="status" variants={[form.connected ? 'success' : 'warning']}>{form.message}</Alert>
		{/if}
	</Card>
	<Div class="grid gap-5 sm:grid-cols-2">
		<Card class="space-y-2 bg-white p-6">
			<H2 class="font-semibold">Content API</H2>
			<P class="text-sm text-stone-600">Immutable quadrant recipes and versioned assets. Gameplay and saves stay on the client.</P>
		</Card>
		<Card class="space-y-2 bg-white p-6">
			<H2 class="font-semibold">Management interface</H2>
			<P class="text-sm text-stone-600">Sveltewind components are configured. World browsing and generation will be added with the recipe API.</P>
		</Card>
	</Div>
</Main>
