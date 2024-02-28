<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<button type="button" class="variant-filled btn" on:click={() => goto('/sign-in')}>ログイン</button>

<button type="button" class="variant-filled-secondary btn" on:click={() => goto('/sign-up')}
	>新規登録</button
>
