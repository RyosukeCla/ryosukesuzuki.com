import { error } from '@sveltejs/kit';
import { allNotes, getNote } from '$lib/content/notes';
import type { EntryGenerator, PageLoad } from './$types';

// Every note becomes a static page at /<section>/<slug> or /<slug>.
export const entries: EntryGenerator = () => allNotes().map(({ path }) => ({ path }));

export const load: PageLoad = ({ params }) => {
	const found = getNote(params.path);
	if (!found) error(404, 'Not found');
	return { path: params.path, ...found };
};
