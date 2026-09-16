import { error } from '@sveltejs/kit';
import { allNotes, getNote, noteLangs } from '$lib/content/notes';
import { DEFAULT_LANG, LANGS, langFromParam } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';

// Every note becomes a static page in every language it is written in.
export const entries: EntryGenerator = () =>
	LANGS.flatMap((lang) =>
		allNotes(lang).map(({ path }) => (lang === DEFAULT_LANG ? { path } : { lang, path }))
	);

export const load: PageLoad = ({ params }) => {
	const lang = langFromParam(params.lang);
	const found = getNote(lang, params.path);
	if (!found) error(404, 'Not found');
	return { path: params.path, availableLangs: noteLangs(params.path), ...found };
};
