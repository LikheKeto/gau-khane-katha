import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get language from cookie or default to 'en'
	const lang = event.cookies.get('language') || 'en';
	
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.lang%', lang);
		}
	});
};
