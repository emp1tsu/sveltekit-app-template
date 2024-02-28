import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if (event.locals?.auth) {
		const session = await event.locals.auth.validate();
		const user = session?.user;
		if (user) {
			event.locals.user = user;
		}
		if (event.route.id?.startsWith('/(protected)')) {
			if (!user) redirect(302, '/sign-in');
			if (!user.verified) redirect(302, '/verify/email');
		}
		if (event.route.id?.startsWith('/(admin)')) {
			if (user?.role !== 'ADMIN') redirect(302, '/sign-in');
		}
	}

	const response = await resolve(event);
	return response;
};
