import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, LANGS } from '$lib/i18n';

// Set <html lang> per page, including prerendered ones.
export const handle: Handle = ({ event, resolve }) => {
	const { pathname } = event.url;
	const seg = pathname.split('/')[1];
	const lang = LANGS.includes(seg as (typeof LANGS)[number]) && seg !== DEFAULT_LANG ? seg : DEFAULT_LANG;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
