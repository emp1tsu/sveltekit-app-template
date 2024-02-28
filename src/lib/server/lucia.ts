import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: prisma(new PrismaClient(), {
		user: 'authUser',
		key: 'authKey',
		session: 'authSession'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getUserAttributes: (data: any) => {
		return {
			userId: data.id,
			email: data.email,
			role: data.role,
			verified: data.verified,
			receiveEmail: data.receiveEmail,
			token: data.token
		};
	}
});

export type Auth = typeof auth;
