<script lang="ts">
	export let data: { result: { heading?: string; message?: string } };
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		{#if data.result?.heading}
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
				{data.result.heading}
			</h1>
		{/if}
		{#if data.result?.message}
			<p class="text-muted-foreground max-w-[700px] text-lg">{@html data.result.message}</p>
		{:else}
			Loading...
		{/if}
	</div>
</section>
