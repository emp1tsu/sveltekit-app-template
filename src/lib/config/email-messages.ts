import sendEmail from '$lib/server/email-send';
import { APP_NAME, BASE_URL } from './constants';

export const sendVerificationEmail = async (email: string, token: string) => {
	const subject = `${APP_NAME}`;
	const message = `${BASE_URL}/verify/email-${token}`;
	const resultSend = sendEmail(email, subject, message, message);
	return resultSend;
};

export const sendWelcomeEmail = async (email: string) => {
	const subject = `Welcome to ${APP_NAME}`;
	const message = `Welcome to ${APP_NAME}`;
	const resultSend = sendEmail(email, subject, message, message);
	return resultSend;
};
