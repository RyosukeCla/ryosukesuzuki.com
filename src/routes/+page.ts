import { sections, topLevelNotes } from '$lib/content/notes';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ sections: sections(), pages: topLevelNotes() });
