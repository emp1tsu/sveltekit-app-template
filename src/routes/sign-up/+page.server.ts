import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { userSchema } from '$lib/config/zod-schemas';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { auth } from '$lib/server/lucia';
import { sendVerificationEmail } from '$lib/config/email-messages';

const signUpSchema = userSchema.pick({
	email: true,
	password: true,
	terms: true
});

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) redirect(302, '/dashboard');

	const form = await superValidate(zod(signUpSchema));
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(signUpSchema));
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			console.log('creating user');
			const token = crypto.randomUUID();

			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: form.data.email.toLowerCase(),
					password: form.data.password
				},
				attributes: {
					email: form.data.email.toLowerCase(),
					role: 'USER',
					verified: false,
					receiveEmail: true,
					token: token
				}
			});

			await sendVerificationEmail(form.data.email, token);
			const session = await auth.createSession({ userId: user.userId, attributes: {} });
			event.locals.auth.setSession(session);
			setFlash(
				{
					type: 'success',
					message: 'アカウント作成成功しました。 あなたのメールアドレスに確認メールを送信しました。'
				},
				event
			);
		} catch (error) {
			console.error(error);
			setFlash({ type: 'error', message: 'アカウント作成に失敗しました。' }, event);
			return setError(form, 'email', 'A user with that email already exists.');
		}

		return { form };
	}
};
