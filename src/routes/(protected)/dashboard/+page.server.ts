import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate();
	const user = session?.user;
	return user;
};
