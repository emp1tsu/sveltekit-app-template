import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth.validate();
	const user = session?.user;
	return {
		user
	};
};
