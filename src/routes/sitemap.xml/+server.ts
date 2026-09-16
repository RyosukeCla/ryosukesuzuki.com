import { SITE_URL } from '$lib/config';
import { allNotes, lastUpdated } from '$lib/content/notes';
import { LANGS, localizePath } from '$lib/i18n';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = LANGS.flatMap((lang) => [
		{ loc: `${SITE_URL}${localizePath('/', lang)}`, lastmod: lastUpdated(lang) },
		...allNotes(lang).map((n) => ({ loc: `${SITE_URL}${localizePath(`/${n.path}`, lang)}`, lastmod: n.updated }))
	]);
	const entries = urls
		.map(
			({ loc, lastmod }) =>
				`\t<url>\n\t\t<loc>${loc}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}\n\t</url>`
		)
		.join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
