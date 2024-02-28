<script lang="ts">
	import type { PageData } from './$types.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, {
		resetForm: false
	});
</script>

<div class="mx-auto flex max-w-2xl items-center justify-center">
	<form method="POST" use:enhance>
		<div class="variant-ringed-hollow card">
			<header class="card-header">
				<h3>新規登録</h3>
			</header>
			<section class="p-4">
				<label class="label">
					<span>メールアドレス</span>
					<input
						class="input"
						type="text"
						name="email"
						bind:value={$form.email}
						aria-invalid={$errors.email ? 'true' : undefined}
						placeholder="Email"
						{...$constraints.email}
					/>
					{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
				</label>
				<label class="label">
					<span>パスワード</span>
					<input
						class="input"
						type="password"
						name="password"
						bind:value={$form.password}
						aria-invalid={$errors.password ? 'true' : undefined}
						placeholder="Password"
						{...$constraints.password}
					/>
					{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
				</label>
				<label class="flex items-center space-x-2">
					<input
						class="checkbox"
						type="checkbox"
						name="terms"
						bind:checked={$form.terms}
						aria-invalid={$errors.terms ? 'true' : undefined}
						{...$constraints.terms}
					/>
					<p>利用規約に同意する</p>
				</label>
				{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
				<button type="submit" class="variant-filled btn">登録</button>
			</section>
			<footer class="card-footer">アカウントをお持ちの方はこちら</footer>
		</div>
	</form>
</div>

<SuperDebug data={$form} />
