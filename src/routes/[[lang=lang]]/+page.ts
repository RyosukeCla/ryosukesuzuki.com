import { sections, topLevelNotes } from '$lib/content/notes';
import { langFromParam } from '$lib/i18n';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const lang = langFromParam(params.lang);
	return { sections: sections(lang), pages: topLevelNotes(lang) };
};
