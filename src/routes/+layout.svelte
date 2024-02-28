<script lang="ts">
	import '../app.pcss';
	import { AppShell, AppBar, popup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import { Toaster, toast } from 'svelte-sonner';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data;

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const flash = getFlash(page);
	$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				toast.success($flash.message);
				break;
			case 'error':
				toast.error($flash.message);
				break;
		}
	}
</script>

<Toaster richColors />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">Sveltekit App Template</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>
					{#if data.user}
						<button class="variant-filled btn" use:popup={{ event: 'click', target: 'settings' }}>
							<span class="hidden md:inline-block">Settings</span>
						</button>
						<div class="card w-60 p-4 shadow-xl" data-popup="settings">
							<div class="space-y-4">
								<nav class="list-nav">
									<ul>
										<li>
											<a href="/">
												<span>Profiles</span>
											</a>
										</li>
									</ul>
								</nav>
								<hr />
								<div>
									<button class="variant-filled btn w-full">
										<span>Logout</span>
									</button>
								</div>
							</div>
						</div>
					{:else}
						<button on:click={() => goto('/sign-in')} class="variant-filled btn">
							<span class="hidden md:inline-block">SignIn</span>
						</button>
						<button on:click={() => goto('/sign-up')} class="variant-filled btn">
							<span class="hidden md:inline-block">SignUp</span>
						</button>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="mt-12">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>
